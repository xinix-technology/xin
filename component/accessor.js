// import { BaseAccessor } from './accessors/base';
import { AttributeAccessor } from './accessors/attribute';
import { TextAccessor } from './accessors/text';
import { HTMLAccessor } from './accessors/html';
import { ValueAccessor } from './accessors/value';
import { ClassAccessor } from './accessors/class';
import { StyleAccessor } from './accessors/style';
import { PropertyAccessor } from './accessors/property';

const accessors = [
  ValueAccessor,
  TextAccessor,
  HTMLAccessor,
  ClassAccessor,
  StyleAccessor,
  AttributeAccessor,
  PropertyAccessor,
  // BaseAccessor, // TODO: unused?
];
export const Accessor = {
  get (node, name) {
    let Accessor = accessors.find(accessor => accessor.test(node, name));
    if (Accessor) {
      return new Accessor(node, name);
    }

    throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType} name: ${name}`);
  },
};
