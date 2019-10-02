import { AttributeAccessor } from './attribute';
import { TextAccessor } from './text';
import { HTMLAccessor } from './html';
import { ValueAccessor } from './value';
import { ClassAccessor } from './class';
import { StyleAccessor } from './style';
import { PropertyAccessor } from './property';
import { CallbackAccessor } from './callback';

const accessors = [
  CallbackAccessor,
  ValueAccessor,
  TextAccessor,
  HTMLAccessor,
  ClassAccessor,
  StyleAccessor,
  AttributeAccessor,
  PropertyAccessor,
];

export function accessorFactory (node, name) {
  const Accessor = accessors.find(accessor => accessor.test(node, name));
  if (Accessor) {
    return new Accessor(node, name);
  }

  throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType} name: ${name}`);
}
