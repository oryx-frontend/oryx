import { ExperienceComponent } from '@oryx-frontend/experience';
import { ButtonSize, ButtonType } from '@oryx-frontend/ui/button';
import { Size, featureVersion } from '@oryx-frontend/utilities';

export const registrationPage: ExperienceComponent = {
  id: 'registration-page',
  type: 'Page',
  meta: {
    title: 'Registration Page',
    route: '/registration',
    description: 'Registration Page Description',
  },

  components: [
    featureVersion >= '1.2'
      ? {
          ref: 'header',
        }
      : {},
    {
      type: 'oryx-composition',
      options: {
        rules: [
          {
            layout: 'grid',
            padding: '20px 0',
            gap: '30px',
            style: `box-sizing: border-box;`,
          },
          {
            query: {
              breakpoint: Size.Lg,
            },
            padding: '50px 0',
          },
          {
            query: {
              breakpoint: Size.Md,
            },
            padding: '30px 0',
          },
        ],
      },
      components: [
        {
          type: 'oryx-composition',
          options: {
            rules: [
              { layout: 'list', colSpan: 2 },
              {
                query: { breakpoint: Size.Md },
                width: '80%',
                colSpan: 3,
              },
              {
                query: { breakpoint: Size.Lg },
                gridColumn: 2,
                colSpan: 2,
              },
            ],
          },
          components: [
            {
              type: 'oryx-composition',
              options: {
                rules: [
                  {
                    layout: 'grid',
                    gap: '20px',
                    style: `grid-template-columns: 1fr 1fr`,
                  },
                ],
              },
              components: [
                {
                  type: 'oryx-content-text',
                  options: {
                    rules: [{ colSpan: 2 }],
                  },
                  content: { data: { text: `<h5>Have an account?</h5>` } },
                },
                {
                  type: 'oryx-content-text',
                  options: {
                    rules: [{ width: '100%' }],
                  },
                  content: {
                    data: {
                      text: `
                                <oryx-button
                                  href="/login"
                                  type=${ButtonType.Outline}
                                  size=${ButtonSize.Md}
                                  style="width: 100%"
                                >
                                  Login
                                </oryx-button>
                              `,
                    },
                  },
                },
                {
                  type: 'oryx-content-text',
                  options: {
                    rules: [
                      {
                        colSpan: 2,
                        margin: '10px 0 0',
                      },
                    ],
                  },
                  content: {
                    data: {
                      text: `<h1>New customer</h1>`,
                    },
                  },
                },
              ],
            },
            {
              type: 'oryx-user-registration',
              options: {
                minLength: 8,
                minUppercaseChars: 1,
                minNumbers: 1,
                minSpecialChars: 1,
              },
            },
          ],
        },
      ],
    },
    featureVersion >= '1.2'
      ? {
          ref: 'footer',
        }
      : {},
  ],
};
