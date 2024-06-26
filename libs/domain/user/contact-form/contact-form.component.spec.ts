import { fixture } from '@open-wc/testing-helpers';
import { createInjector, destroyInjector } from '@oryx-frontend/di';
import { FormRenderer } from '@oryx-frontend/form';
import { useComponent } from '@oryx-frontend/utilities';
import { html } from 'lit';
import { userContactFormComponent } from './contact-form.def';
import { fields } from './contact-form.model';

class MockFormRenderer implements Partial<FormRenderer> {
  buildForm = vi.fn().mockReturnValue(html``);
}

describe('UserContactFormComponent', () => {
  let renderer: MockFormRenderer;

  beforeAll(async () => {
    await useComponent(userContactFormComponent);
  });

  beforeEach(async () => {
    const testInjector = createInjector({
      providers: [
        {
          provide: FormRenderer,
          useClass: MockFormRenderer,
        },
      ],
    });
    renderer = testInjector.inject(FormRenderer) as unknown as MockFormRenderer;

    await fixture(html`<user-contact-form></user-contact-form>`);
  });

  afterEach(() => {
    destroyInjector();
    vi.clearAllMocks();
  });

  it('should build a form', () => {
    expect(renderer.buildForm).toHaveBeenCalledWith(fields);
  });
});
