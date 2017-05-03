import { BaseAccessor } from './accessors/base';
import { AttributeAccessor } from './accessors/attribute';
import { TextAccessor } from './accessors/text';
import { HTMLAccessor } from './accessors/html';
import { ValueAccessor } from './accessors/value';
import { ClassAccessor } from './accessors/class';
import { StyleAccessor } from './accessors/style';
import { PropertyAccessor } from './accessors/property';

export const Accessor = {
  get (node, name) {
    if (node && 'nodeType' in node) {
      switch (node.nodeType) {
        case window.Node.ELEMENT_NODE:
          if (name.endsWith('$')) {
            return new AttributeAccessor(node, name);
          } else if (name === 'text') {
            return new TextAccessor(node);
          } else if (name === 'html') {
            return new HTMLAccessor(node, name);
          } else if (name === 'value' && node.nodeName === 'INPUT') {
            return new ValueAccessor(node);
          }

          if (name.startsWith('class.')) {
            return new ClassAccessor(node, name.split('.').splice(1).join('.'));
          } else if (name.startsWith('style.')) {
            return new StyleAccessor(node, name.split('.').splice(1).join('.'));
          }

          return new PropertyAccessor(node, name);
        case window.Node.TEXT_NODE:
          if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
            return new ValueAccessor(node.parentElement);
          }

          return new TextAccessor(node);
        default:
          throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType}`);
      }
    } else {
      return new BaseAccessor(node, name);
    }
  },
};
