export function html (strings, ...args) {
  const result = [];
  strings.forEach((s, index) => result.push(s, args[index]));
  const template = document.createElement('template');
  template.innerHTML = result.join('');
  return template;
}
