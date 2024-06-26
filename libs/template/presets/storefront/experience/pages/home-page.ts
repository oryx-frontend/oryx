import {
  ExperienceComponent,
  ObjectFit,
  StyleRuleSet,
} from '@oryx-frontend/experience';
import { featureVersion } from '@oryx-frontend/utilities';

const brand = (name: string, rules?: StyleRuleSet[]) => ({
  type: 'oryx-content-image',
  name,
  content: {
    data: { graphic: name, label: name, link: `/search?brand=${name}` },
  },
  options: { rules },
});

export const homePage: ExperienceComponent = {
  id: 'home-page',
  type: 'Page',
  meta: {
    title: 'Home Page',
    route: '/',
    description: 'Home Page Description',
  },
  components: [
    featureVersion >= '1.2' ? { ref: 'header' } : {},
    {
      type: 'oryx-composition',
      id: 'home-hero',
      options: {
        rules: [
          {
            height: '550px',
            layout:
              featureVersion >= '1.2'
                ? {
                    type: 'split',
                    bleed: true,
                  }
                : 'split',
            align: 'end',
            ...(featureVersion >= '1.2' ? {} : { bleed: true }),
          },
        ],
      },
      components: [
        {
          type: 'oryx-content-image',
          name: 'hero',
          content: {
            data: {
              link: `/category/12`,
              alt: 'hero image',
              image:
                'https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
            },
          },
          options: {
            ...(featureVersion >= '1.4' ? {} : { position: 'center 20%' }),
            rules: [
              {
                width: '100%',
                height: 'inherit',
                style: 'position:absolute;left:0',
                ...(featureVersion >= '1.4'
                  ? { objectFit: ObjectFit.Cover, objectPosition: 'center 20%' }
                  : {}),
              },
            ],
          },
        },
        {
          type: 'oryx-content-text',
          content: {
            data: {
              text: `
              <span class="subtitle">CANON EOS R7 System camera</span>
              <h1 style="margin:20px 0;">Discover everything</h1>
              <div class="h3" style="margin-bottom:20px;">EOS R7 wows with its ability to track fast-moving subjects with its Deep-learning Dual Pixel CMOS AF II focus system.</div>
              <oryx-button href="/category/12">Shop now</oryx-button>
            `,
            },
          },
          options: {
            rules: [
              {
                padding: '40px',
                background: 'rgba(35, 35, 35, 0.56);',
                margin: '30px 0',
                radius: 4,
                style: 'color: white;gap:20px;z-index:0',
              },
            ],
          },
        },
      ],
    },
    {
      type: 'oryx-product-list',
      options: {
        rules: [
          {
            layout: 'carousel',
            padding: '30px 0 5px',
            align: 'stretch',
          },
          { query: { breakpoint: 'sm' }, padding: '20px 0' },
        ],
        category: '10',
        sort: 'rating',
      },
    },
    {
      type: 'oryx-composition',
      id: 'brands',
      name: 'brands',
      options: {
        rules: [
          {
            layout: {
              type: 'grid',
              transition: true,
            },
            padding: '60px 0',
            gap: '30px 0px',
            columnCount: 6,
            justify: 'center',
            fill: 'var(--oryx-color-neutral-8)',
          },
          { query: { breakpoint: 'md' }, columnCount: 4 },
          { query: { breakpoint: 'sm' }, columnCount: 3 },
          {
            query: { childs: true },
            height: '50px',
            padding: '0px 40px',
            justify: 'center',
          },
          {
            query: { childs: true, hover: true },
            fill: 'initial',
            scale: 1.1,
          },
        ],
      },
      components: [
        brand('Samsung'),
        brand('Sony'),
        brand('Lenovo'),
        brand('HP'),
        brand('TomTom'),
        brand('DELL'),
        brand('Fujitsu'),
        brand('Asus'),
        brand('Acer'),
        featureVersion >= '1.4' ? brand('Canon') : {},
      ],
    },
    featureVersion >= '1.2' ? { ref: 'footer' } : {},
  ],
};
