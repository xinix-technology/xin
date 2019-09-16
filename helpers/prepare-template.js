import { fixTemplate } from './fix-template';

export function prepareTemplate (template) {
  if (typeof template === 'string') {
    const t = template;
    // create new template based on template property
    template = document.createElement('template');
    template.innerHTML = t;
  }

  return fixTemplate(template);
}
