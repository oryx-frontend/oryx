import { DesignToken } from '@oryx-frontend/experience';
import { Size } from '@oryx-frontend/utilities';
import { color } from '../color.tokens';
import { commonTokens, commonTokensSmall } from '../common-tokens';
import { layoutMdTokens, layoutSmTokens, layoutTokens } from '../layout.tokens';

import { iconTokens } from './icon.token';
import { tokens } from './other.tokens';
import {
  typographyMediumAndLargerTokens,
  typographySmallTokens,
  typographyTokens,
} from './typography.tokens';

export const storefrontTokens: DesignToken[] = [
  {
    color,
    ...commonTokens,
    ...tokens,
    ...typographyTokens,
    ...iconTokens,
    ...layoutTokens,
  },
  {
    media: {
      screen: Size.Sm,
    },
    ...layoutSmTokens,
    ...typographySmallTokens,
    ...commonTokensSmall,
  },
  {
    media: {
      screen: Size.Md,
    },
    ...layoutMdTokens,
    ...typographyMediumAndLargerTokens,
  },
  {
    media: {
      screen: Size.Lg,
    },
    ...typographyMediumAndLargerTokens,
  },
];
