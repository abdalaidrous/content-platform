/*
|--------------------------------------------------------------------------
| PublicRead Decorator
|--------------------------------------------------------------------------
|
| Marks read-only (GET) endpoints as publicly accessible.
| Allows unauthenticated access for GET requests only.
|
*/
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_READ_KEY = 'isPublicRead';

export const PublicRead = () => SetMetadata(IS_PUBLIC_READ_KEY, true);
