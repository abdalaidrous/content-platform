import { registerAs } from '@nestjs/config';

/*
|---------------------------------------------------------------------------
| cacheConfig
|---------------------------------------------------------------------------
|
| The cacheConfig module defines cache-related configuration values
| used across the application, primarily for Redis-based caching.
|
| It provides the Redis connection details such as host and port,
| in addition to the default Time-To-Live (TTL) for cached entries.
| These values are sourced from environment variables to allow
| flexible configuration across different environments.
|
| This configuration is loaded via NestJS ConfigModule and is
| consumed by the CacheModule to enable centralized and
| consistent caching behavior throughout the application.
|
*/
export default registerAs('cache', () => ({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
  ttl: Number(process.env.CACHE_TTL) || 60,
}));
