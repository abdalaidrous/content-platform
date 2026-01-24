import { Role } from '@/common/enums/role.enum';

/*
|---------------------------------------------------------------------------
| UserRole
|---------------------------------------------------------------------------
|
| Domain-level user roles used for authorization and access control.
| These roles represent coarse-grained permissions only.
|
| Fine-grained permissions should be handled via guards, policies,
| or a dedicated permission system.
|
| Source of truth: common Role enum.
|
*/

export enum UserRole {
  ADMIN = Role.ADMIN,
  EDITOR = Role.EDITOR,
  VIEWER = Role.VIEWER,
}
