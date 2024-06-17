import {
  PasswordValidationOptions,
  PasswordVisibilityStrategy,
} from '@oryx-frontend/ui/password';

export interface RegistrationOptions extends PasswordValidationOptions {
  /**
   * Shows the password by the configured strategy.
   */
  passwordVisibility?: PasswordVisibilityStrategy;

  /**
   * The link to the terms and conditions.
   */
  termsAndConditionsLink?: string;
}
