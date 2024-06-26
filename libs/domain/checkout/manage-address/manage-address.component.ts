import { ButtonType } from '@oryx-frontend/ui/button';
import {
  Address,
  AddressEventDetail,
  AddressMixin,
  CrudState,
} from '@oryx-frontend/user';
import { Target } from '@oryx-frontend/user/address-add-button';
import {
  SaveOption,
  UserAddressEditComponent,
} from '@oryx-frontend/user/address-edit';
import { EditTarget } from '@oryx-frontend/user/address-list-item';
import {
  I18nMixin,
  Size,
  hydrate,
  signalProperty,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { DirectiveResult } from 'lit/async-directive';
import { query, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { CheckoutMixin } from '../src/mixins';
import { checkoutManageAddressStyles } from './manage-address.styles';

@hydrate({ event: ['mouseover', 'focusin'] })
export class CheckoutManageAddressComponent extends I18nMixin(
  AddressMixin(CheckoutMixin(LitElement))
) {
  static styles = checkoutManageAddressStyles;

  @signalProperty() selected?: Address | null;

  @state() protected open?: boolean;
  @state() protected loading?: boolean;
  @state() protected preselected: Address | null = null;

  @query('oryx-user-address-edit') editComponent?: UserAddressEditComponent;

  protected override render(): TemplateResult | void {
    return html`
      <oryx-button
        .type=${ButtonType.Text}
        .size=${Size.Sm}
        @click=${this.onOpen}
      >
        ${this.i18n('checkout.address.change')}
      </oryx-button>

      ${when(
        this.open,
        () => html`
          <oryx-modal
            open
            @oryx.back=${this.onBack}
            @oryx.modal.back=${this.onBack}
            @oryx.close=${this.onClose}
            @oryx.modal.closed=${this.onClose}
            .heading=${this.getHeading()}
            enableCloseButtonInHeader
            ?enableNavigateBack=${this.$addressState().action !==
            CrudState.Read}
            enableFooter
          >
            ${[this.renderList(), this.renderEditor(), this.renderFooter()]}
          </oryx-modal>
        `
      )}
    `;
  }

  protected renderList(): TemplateResult | void {
    const action = this.$addressState().action;
    if (action !== CrudState.Read && action !== CrudState.Delete) return;

    return html`<oryx-user-address-add-button
        .options=${{ target: Target.Inline }}
      ></oryx-user-address-add-button>

      <oryx-user-address-list
        .addressId=${this.preselected?.id ?? this.selected?.id}
        .options=${{
          selectable: true,
          editable: true,
          removable: true,
          editTarget: EditTarget.Inline,
        }}
        @change=${this.onChange}
      ></oryx-user-address-list> `;
  }

  protected renderEditor(): TemplateResult | void {
    const action = this.$addressState().action;
    if (action !== CrudState.Create && action !== CrudState.Update) return;

    return html`
      <oryx-user-address-edit
        .options=${{ save: SaveOption.None }}
        @change=${this.onEdit}
      ></oryx-user-address-edit>
    `;
  }

  protected renderFooter(): TemplateResult | void {
    const action = this.$addressState().action;
    if (action === CrudState.Read) {
      return html`<oryx-button
        slot="footer-more"
        .size=${Size.Md}
        .text=${this.i18n('checkout.address.select')}
        @click=${this.onSelect}
      ></oryx-button>`;
    }

    if (action === CrudState.Create || action === CrudState.Update) {
      return html`<oryx-button
        slot="footer-more"
        .size=${Size.Md}
        .loading=${this.loading}
        .text=${this.i18n(['save', 'user.address.save'])}
        @click=${this.onSave}
      ></oryx-button>`;
    }
  }

  protected onEdit(e: Event): void {
    e.stopPropagation();
  }

  protected onSave(): void {
    this.loading = true;
    this.editComponent?.submit().subscribe(() => (this.loading = false));
  }

  protected getHeading(): DirectiveResult {
    const action = this.$addressState().action;
    if (action === CrudState.Create)
      return this.i18n('checkout.address.add-address');
    if (action === CrudState.Update)
      return this.i18n('checkout.address.edit-address');

    return this.i18n('checkout.address.addresses');
  }

  protected onOpen(): void {
    this.addressStateService.clear();
    this.open = true;
  }

  protected onClose(): void {
    this.addressStateService.clear();
    this.preselected = null;
    this.open = false;
  }

  protected onBack(): void {
    this.addressStateService.clear();
  }

  protected onChange(e: CustomEvent<AddressEventDetail>): void {
    e.stopPropagation();
    this.preselected = e.detail.address ?? null;
  }

  protected onSelect(): void {
    if (this.preselected) {
      this.dispatchEvent(
        new CustomEvent<AddressEventDetail>('change', {
          detail: { address: this.preselected },
          bubbles: true,
          composed: true,
        })
      );
    }
    this.onClose();
  }
}
