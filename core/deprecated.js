export function deprecated (module, message) {
  console.warn(`DEPRECATED: ${module ? `@xinix/xin/${module}` : '@xinix/xin'}, ${message}`);
}
