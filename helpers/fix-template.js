
export function fixTemplate (template) {
  /* istanbul ignore if */
  if (!template.content && HTMLTemplateElement && HTMLTemplateElement.decorate) {
    HTMLTemplateElement.decorate(template);
  }
  return template;
}

function needFixImportNode () {
  /* istanbul ignore if */
  if (document.__importNode) {
    // document import node already fixed
    return false;
  }
  const template = document.createElement('template');
  template.innerHTML = '<template>i</template>';
  const imported = document.importNode(template.content, true);
  return !imported.firstChild.content.firstChild || imported.firstChild.content.firstChild.textContent !== 'i';
}

/* istanbul ignore if */
if (needFixImportNode()) {
  document.__importNode = document.importNode;
  document.importNode = function (node, deep) {
    if (!deep) {
      return document.__importNode(node, deep);
    }

    const sourceTpls = [].slice.call(node.querySelectorAll('template'));
    const imported = document.__importNode(node, deep);
    imported.querySelectorAll('template').forEach((child, i) => {
      child.innerHTML = sourceTpls[i].innerHTML;
    });

    return imported;
  };
}
