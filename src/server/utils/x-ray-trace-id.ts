const TRACE_ID_VERSION: string = "1";
const DELIMITER: string = "-";

export function xRayTraceId(type: "root" | "self" = "root"): string {
  const prefix = `${type[0].toUpperCase()}${type.slice(1)}=`;
  const hexTime = Math.floor(new Date().getTime() / 1000.0).toString(16);
  const id = crypto.randomUUID().split(DELIMITER).join("").slice(0, 24);

  return [prefix + TRACE_ID_VERSION, hexTime, id].join(DELIMITER);
}
