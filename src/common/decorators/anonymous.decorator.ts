import { UseGuards } from '@nestjs/common';
import { AnonymousGuard } from '../guards/anonymous.guard';

/*
|--------------------------------------------------------------------------
| AnonymousOnly Decorator
|--------------------------------------------------------------------------
|
| Marks a route as accessible only to unauthenticated (anonymous) users.
| Internally applies the AnonymousGuard to the decorated route.
|
| Use cases:
| - Login endpoint
| - Registration endpoint
| - Public access flows that must reject authenticated users
|
*/
export const AnonymousOnly = () => UseGuards(AnonymousGuard);
