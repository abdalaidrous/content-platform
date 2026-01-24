/*
|---------------------------------------------------------------------------
| Role
|---------------------------------------------------------------------------
|
| Defines the system-level roles used for authentication and authorization.
| Roles represent coarse-grained access levels and are evaluated by guards
| and authorization mechanisms across the application.
|
| Fine-grained permissions should be handled separately via policies
| or a dedicated permission system.
|
*/
export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}
