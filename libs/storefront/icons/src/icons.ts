import { Icon } from '@spryker-oryx/ui/icon';
import { svg } from 'lit';
import { StorefrontIconTypes } from './icon.types';

const chevron = svg`<path d="M17.3954 7.47054L12.001 13.133L6.60521 7.46974C6.00932 6.84342 5.04338 6.84342 4.44749 7.46974C3.85084 8.09525 3.85084 9.1084 4.44749 9.73472L10.9214 16.5305C11.5173 17.156 12.4825 17.1568 13.0792 16.5313L19.5531 9.73552C20.149 9.1092 20.149 8.09605 19.5531 7.46974C18.9572 6.84422 17.9912 6.84502 17.3954 7.47054Z" />`;

export const dropdown: Icon = {
  type: StorefrontIconTypes.Dropdown,
  source: svg`<g style="transform-origin: center;transform: rotate(90deg)">${chevron}</g>`,
};

export const cart: Icon = {
  type: StorefrontIconTypes.Cart,
  source: svg`<path d="M17.3333 18.3851C18.0693 18.3851 18.6667 18.971 18.6667 19.6929C18.6667 20.4148 18.0693 21 17.3333 21C16.5973 21 16 20.4148 16 19.6929C16 18.971 16.5973 18.3851 17.3333 18.3851ZM10 18.3851C10.736 18.3851 11.3333 18.971 11.3333 19.6929C11.3333 20.4148 10.736 21 10 21C9.264 21 8.66667 20.4148 8.66667 19.6929C8.66667 18.971 9.264 18.3851 10 18.3851ZM22 6.61559L18.7693 17.091L18.69 17.0707L18.6873 17.0779H8.66667L4.85133 5.30779H2V4H5.68733L9.55533 15.7688H17.836L20.1953 7.92272H8.41667L8 6.61559H21.3333H22Z" />`,
};

export const cart_add: Icon = {
  type: StorefrontIconTypes.Add,
  source: svg`<path d="M17.3333 18.3845C18.0693 18.3845 18.6667 18.9704 18.6667 19.6929C18.6667 20.4148 18.0693 21 17.3333 21C16.5973 21 16 20.4148 16 19.6929C16 18.9704 16.5973 18.3845 17.3333 18.3845ZM10 18.3845C10.736 18.3845 11.3333 18.9704 11.3333 19.6929C11.3333 20.4148 10.736 21 10 21C9.264 21 8.66667 20.4148 8.66667 19.6929C8.66667 18.9704 9.264 18.3845 10 18.3845ZM18.7693 17.0905L18.69 17.0702L18.6873 17.0774H8.66667L4.852 5.30774H2V4H5.68733L9.55533 15.769H17.836L20.1953 7.92388H8.52067L8 6.61614H21.3333H22L18.7693 17.0905ZM13.3333 14.4626V12.501H11.3333V11.1932H13.3333V9.23162H14.6667V11.1932H16.6667V12.501H14.6667V14.4626H13.3333Z" />`,
};

export const add: Icon = {
  type: StorefrontIconTypes.Increase,
  source: svg`<path d="M3 9.82879H9.74556V3H14.2899V9.82879H21V14.1712H14.2899V21H9.74556V14.1712H3V9.82879Z" />`,
};

export const minus: Icon = {
  type: StorefrontIconTypes.Decrease,
  source: svg`<path d="M3 10H9.74556H14.2899H21V14H14.2899H9.74556H3V10Z" />`,
};