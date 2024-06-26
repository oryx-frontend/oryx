import { Icons } from '@oryx-frontend/ui/icon';
import { Size } from '@oryx-frontend/utilities';

/**
 * Represents the attributes of a button component.
 */
export interface ButtonComponentAttributes {
  /**
   * The  text displayed in the button.
   */
  text?: string;

  /**
   * The label text used by screen readers.
   */
  label?: string;

  /**
   * The icon displayed on the button. It can be an `Icons` enum value
   * or a string representing the icon.
   */
  icon?: Icons | string;

  /**
   * The URL to link to when the button is clicked. If provided, the button will appear as a link.
   * If `href` is used, a link is created that looks like a button.
   */
  href?: string;

  /**
   *The visual type of the button, such as solid, outline, text, or icon.
   *
   * @default ButtonType.Solid
   */
  type?: ButtonType;

  /**
   * The color of the button, which can be on one of the `ButtonColor` enum value
   *
   * @default ButtonColor.Primary
   */
  color?: ButtonColor;

  /**
   * The size of the button, which can be on one of the `ButtonSize` enum value
   *
   * @default ButtonSize.Lg
   */
  size?: ButtonSize;

  /**
   * Indicates whether the button is active, which is similar to the `:active` CSS pseudo-class.
   * This is typically used for toggle buttons, where the button is active when the toggle is on.
   *
   * @default false
   */
  active?: boolean;

  /**
   * Indicates whether the button is in the disabled state.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Indicates whether the button is in the loading state.
   * When `loading` is set to `true`, a loading (spinner) effect can be rendered on the button.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Indicates whether the button is in the confirmed state.
   * When `confirmed` is set to `true`, an effect can be rendered on the button temporarily,
   * typically after a user clicked on the button, for example, when an item is added to the cart.
   *
   * @default false
   */
  confirmed?: boolean;
}

export const enum ButtonSize {
  Sm = Size.Sm,
  Md = Size.Md,
  Lg = Size.Lg,
}

export const enum ButtonColor {
  Primary = 'primary',
  Neutral = 'neutral',
  Error = 'error',
}

/**
 * Represents the types of buttons.
 */
export const enum ButtonType {
  None = 'none',

  /**
   * A button which is rendered as text without any background or border.
   */
  Text = 'text',

  /**
   * A solid-colored button.
   */
  Solid = 'solid',

  /**
   * A button with an outlined border.
   */
  Outline = 'outline',

  /**
   * A button which is rendered as icon.
   */
  Icon = 'icon',
}
