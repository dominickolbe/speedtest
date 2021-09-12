export const APP_NAME = process.env.APP_NAME ?? "unknown";
export const APP_VERSION =
  (process.env.APP_VERSION || process.env.npm_package_version) ?? "unknown";
