import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Type } from '@nestjs/common';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

import { ROLE_GROUPS } from '@/common/constants/role-groups.map';
import { resolveHighestRole } from '@/common/utils/resolve-highest-role';
import { Role } from '@/common/enums/role.enum';
import type { AuthUser } from '@/common/interfaces/auth-user.interface';
import type { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

/*
|--------------------------------------------------------------------------
| RoleSerializerInterceptor
|--------------------------------------------------------------------------
|
| Intercepts outgoing responses and serializes them based on user roles.
| Supports single objects, arrays, and paginated responses.
|
*/
@Injectable()
export class RoleSerializerInterceptor<T> implements NestInterceptor {
  /*
  |--------------------------------------------------------------------------
  | dto
  |--------------------------------------------------------------------------
  |
  | The Data Transfer Object (DTO) class used for response serialization.
  | Defines which attributes are exposed based on role-based groups.
  |
  */
  constructor(private readonly dto: Type<T>) {}

  /*
  |--------------------------------------------------------------------------
  | intercept
  |--------------------------------------------------------------------------
  |
  | Intercepts the execution context and response stream.
  | Determines the user's effective role and applies
  | role-based serialization to the outgoing response.
  |
  */
  intercept(context: ExecutionContext, next: CallHandler) {
    /*
    |--------------------------------------------------------------------------
    | request
    |--------------------------------------------------------------------------
    |
    | The current HTTP request object.
    | Used to access the authenticated user (if any) and request metadata.
    |
    */
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();

    /*
    |--------------------------------------------------------------------------
    | highestRole
    |--------------------------------------------------------------------------
    |
    | The highest-priority role resolved from the user's assigned roles.
    | Determines the effective visibility level for response serialization.
    |
    */
    const highestRole: Role | null = resolveHighestRole(request.user?.role);

    /*
    |--------------------------------------------------------------------------
    | groups
    |--------------------------------------------------------------------------
    |
    | The serialization groups allowed for the resolved role.
    | Falls back to the 'public' group for unauthenticated users.
    |
    */
    const groups = highestRole ? ROLE_GROUPS[highestRole] : ['public'];

    /*
    |--------------------------------------------------------------------------
    | response pipeline
    |--------------------------------------------------------------------------
    |
    | Intercepts the outgoing response stream and applies
    | role-based serialization rules before returning it.
    |
    */
    return next
      .handle()
      .pipe(
        map((response: T | T[] | PaginatedResponse<T>) =>
          this.serializeResponse(response, groups),
        ),
      );
  }

  /*
  |--------------------------------------------------------------------------
  | serializeResponse
  |--------------------------------------------------------------------------
  |
  | Entry point for serializing any supported response shape.
  |
  */
  private serializeResponse(
    response: T | T[] | PaginatedResponse<T>,
    groups: string[],
  ) {
    if (this.isPaginated(response)) {
      return this.serializePaginated(response, groups);
    }

    if (Array.isArray(response)) {
      return this.serializeArray(response, groups);
    }

    return this.serializeObject(response, groups);
  }

  /*
  |--------------------------------------------------------------------------
  | isPaginated
  |--------------------------------------------------------------------------
  |
  | Type guard to detect paginated responses.
  |
  */
  private isPaginated(response: unknown): response is PaginatedResponse<T> {
    return (
      typeof response === 'object' &&
      response !== null &&
      'data' in response &&
      Array.isArray((response as PaginatedResponse<T>).data)
    );
  }

  /*
  |--------------------------------------------------------------------------
  | serializePaginated
  |--------------------------------------------------------------------------
  |
  | Serializes paginated response data while preserving meta and links.
  |
  */
  private serializePaginated(
    response: PaginatedResponse<T>,
    groups: string[],
  ): PaginatedResponse<unknown> {
    return {
      ...response,
      data: this.serializeArray(response.data, groups),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | serializeArray
  |--------------------------------------------------------------------------
  |
  | Serializes an array of entities.
  |
  */
  private serializeArray(items: T[], groups: string[]) {
    return items.map((item) => this.serializeObject(item, groups));
  }

  /*
  |--------------------------------------------------------------------------
  | serializeObject
  |--------------------------------------------------------------------------
  |
  | Serializes a single entity instance.
  |
  */
  private serializeObject(item: T, groups: string[]) {
    return plainToInstance(this.dto, item, {
      groups,
      excludeExtraneousValues: true,
    });
  }
}
