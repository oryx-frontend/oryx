import { AuthService } from '@oryx-frontend/auth';
import {
  CheckoutMixin,
  ContactDetails,
  isValid,
} from '@oryx-frontend/checkout';
import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { FormFieldType, FormRenderer } from '@oryx-frontend/form';
import { RouteType, RouterService } from '@oryx-frontend/router';
import { LinkService } from '@oryx-frontend/site';
import { ButtonType } from '@oryx-frontend/ui/button';
import { UserService } from '@oryx-frontend/user';
import { elementEffect, hydrate, signal } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { query, state } from 'lit/decorators.js';
import { CheckoutAccountComponentOptions } from './account.model';
import { checkoutAccountStyles } from './account.styles';

@defaultOptions({ enableGuestCheckout: true })
@hydrate({ event: 'window:load' })
export class CheckoutAccountComponent
  extends CheckoutMixin(
    ContentMixin<CheckoutAccountComponentOptions>(LitElement)
  )
  implements isValid
{
  static styles = checkoutAccountStyles;

  protected fieldRenderer = resolve(FormRenderer);
  protected userService = resolve(UserService);
  protected authService = resolve(AuthService);
  protected linkService = resolve(LinkService);
  protected routerService = resolve(RouterService);

  protected isAuthenticated = signal(this.authService.isAuthenticated());
  protected customer = signal(this.userService.getUser());
  protected loginRoute = signal(
    this.linkService.get({ type: RouteType.Login })
  );
  protected selected = signal(this.checkoutStateService.get('customer'));

  @state() protected hasCustomerData = false;
  @query('form') protected form?: HTMLFormElement;

  @elementEffect()
  protected redirectEffect = (): void => {
    if (!this.$options().enableGuestCheckout && !this.isAuthenticated()) {
      const route = this.loginRoute();
      if (route) this.routerService.navigate(route);
    }
  };

  @elementEffect()
  protected storeCustomer = (): void => {
    const customer = this.customer();
    if (customer) {
      const { email, salutation, firstName, lastName } =
        customer as ContactDetails;
      this.hasCustomerData = true;
      this.checkoutStateService.set('customer', {
        valid: this.hasCustomerData,
        value: { email, salutation, firstName, lastName },
      });
    }
  };

  protected override render(): TemplateResult | void {
    const { email, firstName, lastName } = this.customer() ?? {};
    if (this.isAuthenticated()) {
      return html`
        <oryx-checkout-header>
          <h1>${this.i18n('checkout.account')}</h1>
        </oryx-checkout-header>
        <p>${firstName} ${lastName}<br />${email}</p>
      `;
    } else if (this.$options().enableGuestCheckout) {
      return this.renderGuest();
    }
  }

  protected renderGuest(): TemplateResult {
    return html`
      <oryx-checkout-header>
        <h1>${this.i18n('checkout.guest-checkout')}</h1>
        <p class="have-an-account">
          ${this.i18n('checkout.guest.have-an-account')}
        </p>
        <oryx-button .type=${ButtonType.Text} .href=${this.loginRoute()}>
          ${this.i18n('checkout.guest.login')}
        </oryx-button>
      </oryx-checkout-header>
      <form @change=${this.onChange}>
        <oryx-layout layout="grid" style="--column-gap: 20px">
          ${this.fieldRenderer.buildForm([
            { id: 'email', type: FormFieldType.Email, required: true },
          ])}
        </oryx-layout>
      </form>
    `;
  }

  protected onChange(): void {
    this.checkoutStateService.set('customer', {
      value: { email: this.form?.querySelector('input')?.value },
      valid: !!this.form?.checkValidity(),
    });
  }

  isValid(report?: boolean): boolean {
    if (this.hasCustomerData) return true;

    if (report) {
      this.form?.reportValidity();
    }
    return !!this.form?.checkValidity();
  }
}
