/*
|--------------------------------------------------------------------------
| Messages
|--------------------------------------------------------------------------
|
| Centralized message keys used across the application.
| Keeps all user-facing messages consistent and type-safe.
|
*/
export const MESSAGES = {
  ERRORS: {
    USER_ALREADY_EXISTS: 'errors.USER_ALREADY_EXISTS',
    INVALID_CREDENTIALS: 'errors.INVALID_CREDENTIALS',
    EMAIL_NOT_FOUND: 'errors.EMAIL_NOT_FOUND',
    USER_NOT_FOUND: 'errors.USER_NOT_FOUND',
    INVALID_CURRENT_PASSWORD: 'errors.INVALID_CURRENT_PASSWORD',
    CATEGORY_NOT_FOUND: 'errors.CATEGORY_NOT_FOUND',
  },
  SUCCESS: {
    PASSWORD_RESET_EMAIL_SENT: 'success.PASSWORD_RESET_EMAIL_SENT',
    PASSWORD_RESET_SUCCESS: 'success.PASSWORD_RESET_SUCCESS',
    PASSWORD_CHANGED_SUCCESSFULLY: 'success.PASSWORD_CHANGED_SUCCESSFULLY',
  },
} as const;
