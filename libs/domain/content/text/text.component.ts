import { resolve } from '@oryx-frontend/di';
import { ContentMixin, defaultOptions } from '@oryx-frontend/experience';
import { TextMixin } from '@oryx-frontend/ui/text';
import {
  computed,
  elementEffect,
  featureVersion,
} from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { FontService } from '../src/services/';
import { ContentTextContent, ContentTextOptions } from './text.model';
import { contentTextStyles } from './text.styles';

@defaultOptions({ autoInstallFont: true })
export class ContentTextComponent extends TextMixin(
  ContentMixin<ContentTextOptions, ContentTextContent>(LitElement)
) {
  static styles = featureVersion >= '1.4' ? undefined : contentTextStyles;

  protected fontService = resolve(FontService);

  /**
   * Installs font used inside the text if the autoInstallFont option is enabled.
   * Fonts are only installed once.
   */
  @elementEffect()
  protected installFonts = (): void => {
    const text = this.$content()?.text;
    if (text && this.$options().autoInstallFont) {
      this.fontService.install(text);
    }
  };

  protected $text = computed(() => {
    const text = this.$content()?.text;
    if (!text) return;
    return this.convertText(text);
  });

  protected override render(): TemplateResult | void {
    if (featureVersion >= '1.4') {
      return html`${this.$text()}`;
    } else {
      const text = this.$content()?.text;
      if (!text) return;
      return html`<oryx-text .content=${text}></oryx-text>`;
    }
  }
}
