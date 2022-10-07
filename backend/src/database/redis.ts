import { createClient } from "redis";

export default async function connectRedis() {
  const client = createClient({
    url: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });
  await client.connect();
  return client;
}
