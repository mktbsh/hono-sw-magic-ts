import { NotFoundHandler } from "hono";
import { HEADER_NAMES, MIME_TYPES } from "../const";
import { StatusCode } from "hono/utils/http-status";

/**
 * This implementation is based on the following GitHub repository:
 * {@link https://github.com/steelydylan/monaco-browser-bundler/blob/f6f703a219874312db3ba8ba99122c8b763ca40d/public/sw.js#L58-L80}
 */
export const notFoundHandler: NotFoundHandler = async (c) => {
  const response = await fetch(c.req.url);

  const contentType = response.headers.get(HEADER_NAMES.contentType);
  if (contentType?.includes(MIME_TYPES.html)) {
    return c.html(await response.text());
  }

  if (contentType?.includes(MIME_TYPES.js)) {
    return c.text(await response.text(), 200, {
      [HEADER_NAMES.contentType]: MIME_TYPES.js,
    });
  }

  const buffer = await response.arrayBuffer();
  const headers = Object.fromEntries(response.headers.entries());
  return c.body(buffer, response.status as StatusCode, headers);
};
