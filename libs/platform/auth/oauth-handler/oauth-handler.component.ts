import { OauthService } from '@oryx-frontend/auth';
import { resolve } from '@oryx-frontend/di';
import { RouterService } from '@oryx-frontend/router';
import { HeadingTag } from '@oryx-frontend/ui/heading';
import { featureVersion, I18nMixin } from '@oryx-frontend/utilities';
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './oauth-handler.styles';

export class OauthHandlerComponent extends I18nMixin(LitElement) {
  @property() providerId?: string;

  static styles = styles;

  constructor(
    protected oauthService = resolve(OauthService),
    protected routerService = resolve(RouterService)
  ) {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();

    if (!this.providerId) {
      throw new Error(`OauthHandlerComponent: Unknown Oauth provider ID!`);
    }

    this.oauthService.handleCallback(this.providerId);
  }

  protected render(): unknown {
    return html`
      <oryx-image resource="logo"></oryx-image>
      ${this.__renderHeading()}
      <oryx-spinner></oryx-spinner>
    `;
  }

  // temporary implementation for backwards compatibility
  private __renderHeading(): unknown {
    const text = this.i18n('oauth.logging-you-in');
    if (featureVersion >= '1.4') {
      return html`<oryx-heading .tag=${HeadingTag.H3}> ${text} </oryx-heading>`;
    } else {
      return html`<oryx-heading>
        <h3>${text}</h3>
      </oryx-heading>`;
    }
  }
}

export default OauthHandlerComponent;
