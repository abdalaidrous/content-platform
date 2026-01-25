/*
|--------------------------------------------------------------------------
| SerializeByRole
|--------------------------------------------------------------------------
|
| Applies role-based response serialization using the given DTO.
| Automatically determines visible attributes based on user roles.
|
*/
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import type { Type } from '@nestjs/common';
import { RoleSerializerInterceptor } from '@/common/interceptors/role-serializer.interceptor';

export function SerializeByRole<T>(dto: Type<T>) {
  return applyDecorators(UseInterceptors(new RoleSerializerInterceptor(dto)));
}
