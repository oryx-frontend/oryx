import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { RouteType, RouterService } from '@oryx-frontend/router';
import { LinkService } from '@oryx-frontend/site';
import { ButtonType } from '@oryx-frontend/ui/button';
import {
  Address,
  AddressEventDetail,
  AddressMixin,
  CrudState,
} from '@oryx-frontend/user';
import { UserAddressFormComponent } from '@oryx-frontend/user/address-form';
import { hydrate, signal } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { query, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { Observable, of, take, tap } from 'rxjs';
import {
  SaveOption,
  UserAddressEditComponentOptions,
} from './address-edit.model';
import { styles } from './address-edit.styles';

@defaultOptions({ save: SaveOption.Save, inline: false })
@hydrate({ event: ['mouseover', 'focusin'] })
export class UserAddressEditComponent extends AddressMixin(
  ContentMixin<UserAddressEditComponentOptions>(LitElement)
) {
  static styles = styles;

  protected routerService = resolve(RouterService);
  protected semanticLinkService = resolve(LinkService);

  protected $listPageRoute = signal(
    this.semanticLinkService.get({ type: RouteType.AddressList })
  );

  // TODO: move to central place
  @state() loading = false;

  @query('oryx-user-address-form')
  protected addressForm?: UserAddressFormComponent;

  submit(): Observable<unknown> {
    this.loading = true;
    if (!this.preselected?.address || !this.preselected?.valid) {
      this.addressForm?.getForm()?.checkValidity();
      return of({});
    }

    const address = this.populateAddressData();
    return this.addressService[address.id ? 'update' : 'add'](address).pipe(
      take(1),
      tap(() => {
        this.loading = false;
        if (!this.$options().inline) this.addressStateService.clear();
      })
    );
  }

  protected override render(): TemplateResult | void {
    if (
      this.$options().inline &&
      this.$addressState().action !== CrudState.Create &&
      this.$addressState().action !== CrudState.Update
    ) {
      return;
    }

    return html`
      <oryx-user-address-form
        .values=${this.$address()}
        enableDefaultShipping
        enableDefaultBilling
        @change=${this.onChange}
      ></oryx-user-address-form>

      ${when(
        this.$options().save === SaveOption.Save,
        () => html`
          <oryx-button
            .type=${ButtonType.Outline}
            .text=${this.i18n('user.address.cancel')}
            @click=${this.onClose}
          ></oryx-button>
          <oryx-button
            .text=${this.i18n('user.address.save')}
            ?loading=${this.loading}
            @click=${this.onSave}
          ></oryx-button>
        `
      )}
    `;
  }

  protected preselected?: AddressEventDetail;

  protected onChange(e: CustomEvent<AddressEventDetail>): void {
    this.preselected = e.detail;
    if (this.$options().save === SaveOption.Instant) {
      this.submit().subscribe();
    }
  }

  protected onClose(): void {
    this.addressStateService.clear();

    const route = this.$listPageRoute();
    if (route) this.routerService.navigate(route);
  }

  protected onSave(): void {
    this.submit()
      .pipe(
        tap(() => {
          if (!this.$options().inline) this.onClose();
        })
      )
      .subscribe();
  }

  protected populateAddressData(): Address {
    const id = this.$addressId();
    return {
      ...this.preselected?.address,
      ...(id ? { id } : {}),
      isDefaultShipping: !!this.preselected?.address?.isDefaultShipping,
      isDefaultBilling: !!this.preselected?.address?.isDefaultBilling,
    };
  }
}
