import { QueryEvent } from '@oryx-frontend/core';
import { ProductCategory } from '../../../models';

export const CategoriesLoaded = 'CategoriesLoaded';

export type CategoriesLoaded = QueryEvent<ProductCategory[]>;
