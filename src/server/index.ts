import { AppType } from './app'
import { hc } from 'hono/client'

type Options = Parameters<typeof hc>[1];

export function createClient(baseURL: string = '', options?: Options) {
  return hc<AppType>(baseURL, options);
}
