import { SetMetadata } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| IS_PUBLIC_READ_KEY
|--------------------------------------------------------------------------
|
| Metadata key used to mark routes as publicly readable.
| This key is checked by authentication/authorization guards
| to allow unauthenticated access for GET requests.
|
*/
export const IS_PUBLIC_READ_KEY = 'isPublicRead';

/*
|--------------------------------------------------------------------------
| PublicRead Decorator
|--------------------------------------------------------------------------
|
| Marks read-only (GET) endpoints as publicly accessible.
| Allows unauthenticated access for GET requests only.
|
*/
export const PublicRead = () => SetMetadata(IS_PUBLIC_READ_KEY, true);
