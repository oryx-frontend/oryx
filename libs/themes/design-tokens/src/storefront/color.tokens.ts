import { ColorDesignTokens } from '@spryker-oryx/core';
import { colorPalette } from '../color-palette';

export const color: ColorDesignTokens = {
  ink: '#121212',

  canvas: colorPalette.white,
  neutral: colorPalette.gray,

  primary: colorPalette.green,
  secondary: colorPalette.yellow,

  highlight: colorPalette.red,

  success: colorPalette.green,
  warning: colorPalette.orange,
  error: colorPalette.red,
  info: colorPalette.blue,

  focus: colorPalette.green[300],
  placeholder: colorPalette.gray[300],
};
