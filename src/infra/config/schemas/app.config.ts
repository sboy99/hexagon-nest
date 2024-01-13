import { z } from 'zod';

export const str = z.string();
export const num = z.coerce.number();
export const port = z.coerce.number();
export const bool = z.coerce.boolean();

export const AppConfigSchema = z.object({
  NODE_ENV: z.enum(['production', 'development']),
  HTTP_PORT: port,
});

export const MongoConfigSchema = z.object({
  MONGO_URI: str,
});

// export const RedisConfigSchema = z.object({
//   REDIS_URI: str,
//   CACHE_TTL: num.default(5000),
// });

export const ApiConfigSchema = AppConfigSchema.and(MongoConfigSchema);

export type TApiConfig = z.infer<typeof ApiConfigSchema>;
