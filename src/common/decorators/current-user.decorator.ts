import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthUser } from '@/common/interfaces/auth-user.interface';

/*
|--------------------------------------------------------------------------
| CurrentUser
|--------------------------------------------------------------------------
|
| Custom parameter decorator used to extract the authenticated
| user object (or a specific field) from the HTTP request.
|
*/
export const CurrentUser = createParamDecorator(
  (field: keyof AuthUser | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<FastifyRequest & { user: AuthUser }>();

    const user = request.user;

    return field ? user?.[field] : user;
  },
);
