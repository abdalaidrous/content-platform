import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { FastifyReply, FastifyRequest } from 'fastify';

/*
|--------------------------------------------------------------------------
| I18nValidationFilter
|--------------------------------------------------------------------------
|
| Global exception filter that intercepts validation-related
| BadRequestException instances and transforms them into
| localized, client-facing error responses.
|
*/
@Catch(BadRequestException)
export class I18nValidationFilter implements ExceptionFilter {
  /*
  |--------------------------------------------------------------------------
  | Constructor
  |--------------------------------------------------------------------------
  |
  | Injects the I18nService which is responsible for resolving
  | translation keys into localized messages based on the
  | current request language.
  |
  */
  constructor(private readonly i18n: I18nService) {}

  /*
  |--------------------------------------------------------------------------
  | catch
  |--------------------------------------------------------------------------
  |
  | Core exception handling method invoked automatically by NestJS
  | whenever a BadRequestException is thrown within the HTTP layer.
  |
  | This method extracts validation error keys from the exception,
  | resolves their localized messages using i18n, and returns a
  | standardized validation error response.
  |
  */
  catch(exception: BadRequestException, host: ArgumentsHost) {
    /*
    |----------------------------------------------------------------------
    | HTTP Context Extraction
    |----------------------------------------------------------------------
    |
    | Switches the execution context to HTTP in order to gain
    | access to the underlying Fastify request and response objects.
    |
    */
    const ctx = host.switchToHttp();

    /*
    |----------------------------------------------------------------------
    | Response Object
    |----------------------------------------------------------------------
    |
    | Fastify reply instance used to send the final HTTP response
    | back to the client.
    |
    */
    const response = ctx.getResponse<FastifyReply>();

    /*
    |----------------------------------------------------------------------
    | Request Object
    |----------------------------------------------------------------------
    |
    | Fastify request instance used to read request-specific
    | metadata such as headers and localization preferences.
    |
    */
    const request = ctx.getRequest<FastifyRequest>();

    /*
    |----------------------------------------------------------------------
    | Exception Payload
    |----------------------------------------------------------------------
    |
    | Normalized exception response object containing:
    | - message: validation error translation key(s)
    | - errorCode: optional application-level error identifier
    |
    */
    const exceptionResponse = exception.getResponse() as {
      message: string | string[];
      errorCode?: string;
    };

    /*
    |----------------------------------------------------------------------
    | Language Resolution
    |----------------------------------------------------------------------
    |
    | Determines the target language for translation using the
    | `Accept-Language` request header, with a fallback to Arabic.
    |
    */
    const lang = request.headers['accept-language']?.toString() || 'en';

    /*
    |----------------------------------------------------------------------
    | Message Normalization
    |----------------------------------------------------------------------
    |
    | Ensures that validation messages are always treated as an array
    | to safely support mapping and translation.
    |
    */
    const messages = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message
      : [exceptionResponse.message];

    /*
    |----------------------------------------------------------------------
    | Message Translation
    |----------------------------------------------------------------------
    |
    | Maps validation error keys into localized, human-readable
    | messages using the i18n service.
    |
    */
    const translatedMessages = messages.map((key) =>
      this.i18n.t(key, { lang }),
    );

    /*
    |----------------------------------------------------------------------
    | Response Dispatch
    |----------------------------------------------------------------------
    |
    | Sends a standardized validation error response containing:
    | - HTTP status code
    | - Localized validation messages
    | - Stable application error code
    |
    */
    response.status(400).send({
      ...exceptionResponse,
      message: translatedMessages,
    });
  }
}
