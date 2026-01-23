import {
  AcceptLanguageResolver,
  I18nJsonLoader,
  I18nOptions,
} from 'nestjs-i18n';
import * as path from 'path';

/*
|--------------------------------------------------------------------------
| i18n Configuration
|--------------------------------------------------------------------------
|
| Defines the application's internationalization (i18n) settings.
| Enables multi-language support (Arabic and English) using JSON-based
| translation files, with a fallback language applied when none is
| specified in the request.
|
| This configuration is loaded globally by the AppModule, following
| the same pattern as other application configuration modules.
|
*/
export default (): I18nOptions => ({
  fallbackLanguage: 'en',
  loader: I18nJsonLoader,
  loaderOptions: {
    path: path.join(process.cwd(), 'src/i18n'),
    watch: true,
  },
  resolvers: [new AcceptLanguageResolver()],
});
