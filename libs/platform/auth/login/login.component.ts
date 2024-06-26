import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import {
  FormFieldDefinition,
  FormFieldType,
  FormRenderer,
} from '@oryx-frontend/form';
import { RouterService } from '@oryx-frontend/router';
import { ButtonSize } from '@oryx-frontend/ui/button';
import { ColorType } from '@oryx-frontend/ui/link';
import { PasswordVisibilityStrategy } from '@oryx-frontend/ui/password';
import { hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { EmptyError, firstValueFrom } from 'rxjs';
import { DefaultAuthLoginStrategy } from './default-login.strategy';
import { LoginOptions, LoginRequest } from './login.model';
import { AuthLoginStrategy } from './login.strategy';
import { styles } from './login.styles';

@defaultOptions({
  enableRememberMe: true,
  enableRedirect: true,
  passwordVisibility: PasswordVisibilityStrategy.Click,
})
@hydrate({ event: ['mouseover', 'focus'] })
export class AuthLoginComponent extends ContentMixin<LoginOptions>(LitElement) {
  static styles = styles;

  @property() isLoading?: boolean;
  @property() hasError?: boolean;

  @query('input[name=email]') email?: HTMLInputElement;
  @query('input[name=password]') password?: HTMLInputElement;
  @query('input[name=rememberme]') rememberme?: HTMLInputElement;

  protected fieldRenderer = resolve(FormRenderer);

  protected routerService = resolve(RouterService);
  protected authLoginStrategy = resolve(
    AuthLoginStrategy,
    new DefaultAuthLoginStrategy()
  );

  protected async doLogin(loginState: LoginRequest): Promise<void> {
    this.isLoading = true;
    this.hasError = false;

    try {
      await firstValueFrom(this.authLoginStrategy.login(loginState));
    } catch (e) {
      if (e instanceof EmptyError === false) {
        this.isLoading = false;
        this.hasError = true;
      }

      return;
    }

    this.isLoading = false;

    if (this.$options()?.enableRedirect) {
      const redirectUrl = this.$options().redirectUrl;

      if (redirectUrl) {
        this.routerService.navigate(redirectUrl);
        return;
      }

      const previousRoute = await firstValueFrom(
        this.routerService.previousRoute()
      );
      const redirectRoute = previousRoute ? previousRoute : '/';
      this.routerService.navigate(redirectRoute);
    }
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    this.doLogin(this.getState());
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        this.hasError,
        () => html`
          <oryx-notification type="error" scheme="dark">
            ${this.i18n(
              'user.login.the-username-or-password-you-entered-is-invalid'
            )}
          </oryx-notification>
        `
      )}

      <form @submit=${this.onSubmit}>
        ${this.fieldRenderer.buildForm(this.getFields())}

        <oryx-button .size=${ButtonSize.Md} ?loading=${this.isLoading}>
          <button slot="custom" ?disabled=${this.isLoading}>
            ${this.i18n('user.log-in')}
          </button>
        </oryx-button>

        ${when(
          this.$options()?.forgotPasswordLink,
          () => html`
            <oryx-link color=${ColorType.Primary}>
              <a href=${this.$options()?.forgotPasswordLink}>
                ${this.i18n('user.login.forgot-password')}
              </a>
            </oryx-link>
          `
        )}
      </form>
    `;
  }

  protected getFields(): FormFieldDefinition[] {
    const rememberMe = this.$options()?.enableRememberMe
      ? [
          {
            id: 'rememberme',
            type: FormFieldType.Boolean,
            label: this.i18n('user.login.remember-me'),
            width: 100,
          } as FormFieldDefinition,
        ]
      : [];

    return [
      {
        id: 'email',
        type: FormFieldType.Email,
        required: true,
        label: this.i18n('user.login.email'),
        placeholder: this.i18n('user.login.email'),
        width: 100,
      },
      {
        id: 'password',
        type: FormFieldType.Password,
        required: true,
        label: this.i18n('user.login.password'),
        placeholder: this.i18n('user.login.password'),
        width: 100,
        attributes: {
          hasError: !!this.hasError,
          strategy: this.$options()?.passwordVisibility as string,
        },
      },
      ...rememberMe,
    ];
  }

  protected getState(): LoginRequest {
    const email = this.email?.value ?? '';
    const password = this.password?.value ?? '';
    const rememberMe = this.rememberme?.checked ?? false;

    return { email, password, rememberMe };
  }
}

export default AuthLoginComponent;
