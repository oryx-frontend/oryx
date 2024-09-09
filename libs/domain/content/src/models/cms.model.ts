// TODO: create dynamic types and dependable dynamic pages.
export const cmsTypes = ['article', 'faq', 'about'];

declare global {
  interface ContentFields {
    article: undefined;
    faq: undefined;
    about: undefined;
  }
}

export interface CmsContent {
  heading: string;
  description: string;
  content: string;
  type: string;
  [key: string]: unknown;
}
