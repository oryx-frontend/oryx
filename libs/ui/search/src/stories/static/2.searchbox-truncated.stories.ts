import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.storybook/constant';
import '../../index';

export default {
  title: `${storybookPrefix}/Search/Searchbox/Static`,
} as Meta;

const variations = [
  {
    name: 'Default',
    state: '',
    lightDomState: '',
  },
  {
    name: 'Hovered',
    state: 'pseudo-hover',
    lightDomState: 'pseudo-hover',
  },
  {
    name: 'Focused',
    state: 'pseudo-focus-within',
    lightDomState: 'pseudo-focus-within',
  },
  {
    name: 'Disabled',
    state: '',
    lightDomState: '',
  },
];

const Template: Story = (): TemplateResult => {
  return html`
    <h1>Truncated content</h1>
    <div class="searchbox-component">
      ${variations.map((variant) => {
        const isDisabled = variant.name === 'Disabled';
        return html`
          <div class="variation-searchbox">
            <p>${variant.name}</p>
            <oryx-search searchIcon="search">
              <input
                placeholder="Search..."
                value="Long text searchbox"
                ?disabled=${isDisabled}
                class="${variant.lightDomState}"
              />
            </oryx-search>
          </div>
        `;
      })}
    </div>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const search = document.querySelector('oryx-search');
        const observer = new MutationObserver((mutation) => {
          mutation.forEach((mutation) => {
            if (mutation) {
              document.querySelectorAll('oryx-search').forEach((element) => {
                const searchDom =
                  element.shadowRoot.children[0]?.querySelector('.control');
                const search = element.querySelector('input').className;
                if (search) {
                  searchDom?.classList.add(search);
                }
              });
            }
          });
        });

        observer.observe(search, {
          childList: true,
          attributes: true,
          subtree: true,
        });
      });
    </script>

    <style>
      .variation-searchbox {
        display: flex;
        margin-bottom: 20px;
        gap: 20px;
        align-items: center;
      }

      .variation-searchbox oryx-search {
        width: 200px;
      }

      .variation-searchbox p {
        width: 100px;
      }

      oryx-search input {
        text-overflow: ellipsis;
      }
    </style>
  `;
};

export const SearchboxTruncated = Template.bind({});
