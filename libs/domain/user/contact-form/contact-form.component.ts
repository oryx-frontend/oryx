import { resolve } from '@oryx-frontend/di';
import { ContentMixin } from '@oryx-frontend/experience';
import { FormMixin, FormRenderer, formStyles } from '@oryx-frontend/form';
import { hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { fields } from './contact-form.model';
import { styles } from './contact-form.styles';

@hydrate({ event: ['mouseover', 'focusin'] })
export class UserContactFormComponent extends FormMixin(
  ContentMixin(LitElement)
) {
  static styles = [formStyles, styles];

  protected fieldRenderer = resolve(FormRenderer);

  protected override render(): TemplateResult {
    return html`<form>
      <oryx-layout
        layout="grid"
        style="--oryx-column-count:2;--column-gap: 20px;"
      >
        ${this.fieldRenderer.buildForm(fields)}
      </oryx-layout>
    </form>`;
  }
}
