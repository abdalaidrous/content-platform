/*
|--------------------------------------------------------------------------
| PaginatedResponse
|--------------------------------------------------------------------------
|
| Represents a generic paginated API response structure.
| Used to wrap list data along with pagination metadata.
|
*/
export interface PaginatedResponse<T> {
  data: T[];
  meta?: unknown;
}