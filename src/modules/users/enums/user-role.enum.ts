/*
|---------------------------------------------------------------------------
| UserRole
|---------------------------------------------------------------------------
|
| The UserRole enum defines the high-level roles assigned to users within
| the system. These roles are used to control access, permissions, and
| authorization logic across the application.
|
| Roles represent coarse-grained access levels and should not contain
| fine-grained business permissions. More detailed authorization rules
| (such as specific actions or resource-level access) should be handled
| through guards, policies, or a dedicated permission system.
|
| Roles included:
| - ADMIN  : Full system access and management capabilities.
| - EDITOR : Can create and manage content but has limited administrative access.
| - VIEWER : Read-only access with no content modification privileges.
|
| This enum is part of the Users (Identity / IAM) domain and should not be
| placed in shared modules, as it represents domain-specific authorization
| rules.
|
*/
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}
