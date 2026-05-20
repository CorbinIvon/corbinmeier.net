/// <reference types="@cloudflare/workers-types" />
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const getDb = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  binding: any
) => {
  return drizzle(binding as D1Database, { schema });
};
