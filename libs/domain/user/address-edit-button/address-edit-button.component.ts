import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { RouteType } from '@oryx-frontend/router';
import { LinkService } from '@oryx-frontend/site';
import { ButtonType } from '@oryx-frontend/ui/button';
import { IconTypes } from '@oryx-frontend/ui/icon';
import { computed, hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { AddressMixin } from '../src/mixins';
import { CrudState } from '../src/models';
import { AddressEditButtonOptions, Target } from './address-edit-button.model';

@defaultOptions({ target: Target.Link })
@hydrate({ event: ['mouseover', 'focusin'] })
export class UserAddressEditButtonComponent extends AddressMixin(
  ContentMixin<AddressEditButtonOptions>(LitElement)
) {
  protected semanticLinkService = resolve(LinkService);

  protected editLink = computed(() => {
    const id = this.$addressId();
    if (!id) return;
    return this.semanticLinkService.get({
      type: RouteType.AddressBookEdit,
      id,
    });
  });

  protected render(): TemplateResult | void {
    const href =
      this.$options().target === Target.Link ? this.editLink() : undefined;
    return html`
      <oryx-button
        .type=${ButtonType.Outline}
        .icon=${IconTypes.Edit}
        .text=${this.i18n(['edit', 'user.address.edit-address'])}
        .href=${href}
        ?disabled=${!this.$addressId()}
        @click=${this.onEdit}
      ></oryx-button>
    `;
  }

  protected onEdit(): void {
    this.addressStateService.set(CrudState.Update);
  }
}
