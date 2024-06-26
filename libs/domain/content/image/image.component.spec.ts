import { fixture } from '@open-wc/testing-helpers';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { ExperienceService } from '@oryx-frontend/experience';
import { OBJECT_POSITION } from '@oryx-frontend/ui';
import { useComponent } from '@oryx-frontend/utilities';
import { html } from 'lit';
import { of } from 'rxjs';
import { ContentImageComponent } from './image.component';
import { contentImageComponent } from './image.def';
import { ContentImageContent, ContentImageOptions } from './image.model';

class MockService implements Partial<ExperienceService> {
  getOptions = vi.fn();
  getContent = vi.fn().mockReturnValue(of());
}

const image = 'image.jpg';
const graphic = 'logo';
const link = 'https://image.com';
const alt = 'alternative text';
const label = 'link label';

describe('ContentImageComponent', () => {
  let element: ContentImageComponent;

  const getImage = (): HTMLElement =>
    element.renderRoot.querySelector('oryx-image') as HTMLElement;

  beforeAll(async () => {
    await useComponent(contentImageComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: [
        {
          provide: ExperienceService,
          useClass: MockService,
        },
      ],
    });
  });

  afterEach(() => {
    destroyInjector();
  });

  describe('when the component is created', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ graphic: 'logo' } as ContentImageContent}
        ></oryx-content-image>`
      );
    });

    it('should defined', () => {
      expect(element).toBeInstanceOf(ContentImageComponent);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe('when no content is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image uid="1"></oryx-content-image>`
      );
    });

    it('should not create an oryx-image component', () => {
      expect(element).not.toContainElement('oryx-image');
    });
  });

  describe('when an image is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ image } as ContentImageContent}
        ></oryx-content-image>`
      );
    });

    it('should have an oryx-image element', () => {
      expect(element).toContainElement('oryx-image');
    });

    it('should not have an anchor element', () => {
      expect(element).not.toContainElement('a');
    });

    describe('when an alt text is also provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-content-image
            .content=${{ image, alt } as ContentImageContent}
          ></oryx-content-image>`
        );
      });

      it('should have provide the alt text to the oryx-image element', () => {
        expect(element).toContainElement(`oryx-image[alt="${alt}"]`);
      });
    });
  });

  describe('when a graphic is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ graphic } as ContentImageContent}
        ></oryx-content-image>`
      );
    });

    it('should provide the graphic to the oryx-image element', () => {
      expect(element).toContainElement(`oryx-image[resource="${graphic}"]`);
    });

    it('should not have an anchor element', () => {
      expect(element).not.toContainElement('a');
    });
  });

  describe('when a link is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ image, link } as ContentImageContent}
        ></oryx-content-image>`
      );
    });

    it('should have an link with an oryx-image element', () => {
      expect(element).toContainElement('a oryx-image');
    });

    describe('when an alt text is also provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-content-image
            .content=${{ image, link, alt } as ContentImageContent}
          ></oryx-content-image>`
        );
      });

      it('should have an aria label with the alt text to the oryx-image element', () => {
        expect(element).toContainElement(`a[aria-label='${alt}']`);
      });
    });

    describe('when an label is also provided', () => {
      beforeEach(async () => {
        element = await fixture(
          html`<oryx-content-image
            .content=${{ image, link, label } as ContentImageContent}
          ></oryx-content-image>`
        );
      });

      it('should have an aria label with the alt text to the oryx-image element', () => {
        expect(element).toContainElement(`a[aria-label='${label}']`);
      });
    });
  });

  describe('when no options are provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ image } as ContentImageContent}
        ></oryx-content-image>`
      );
    });

    it('should have default styles', () => {
      expect(getImage().style.getPropertyValue('--image-fit')).toBe('cover');
    });
  });

  describe('when all options are replaced', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ image } as ContentImageContent}
          .options=${{ fit: undefined } as ContentImageOptions}
        ></oryx-content-image>`
      );
    });

    it('should not specify the style attribute', () => {
      expect(element).toContainElement(`oryx-image:not([style])`);
    });
  });

  describe('when an fit option is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ image } as ContentImageContent}
          .options=${{ fit: 'contain' } as ContentImageOptions}
        ></oryx-content-image>`
      );
    });

    it(`should have the image-fit 'contain'`, () => {
      expect(getImage().style.getPropertyValue('--image-fit')).toBe('contain');
    });
  });

  describe('when an image-position option is provided', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<oryx-content-image
          .content=${{ image } as ContentImageContent}
          .options=${{ position: 'center 30%' } as ContentImageOptions}
        ></oryx-content-image>`
      );
    });

    it(`should position to the styles'`, () => {
      expect(getImage().style.getPropertyValue(OBJECT_POSITION)).toBe(
        'center 30%'
      );
    });
  });
});
