export function deprecated (module, message) {
  let longName = module ? `@xinix/xin/${module}` : '@xinix/xin';
  console.warn(`DEPRECATED: ${longName}, ${message}`);
}
