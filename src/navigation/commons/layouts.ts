import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

const stack = (rawChildren, id) => {
  const childrenArray = isArray(rawChildren) ? rawChildren : [rawChildren];
  const children = childrenArray.map((child) => component(child));
  return { stack: { children, id } };
};

const component = (compIdOrLayout, options, passProps) => {
  return isString(compIdOrLayout) ? { component: { name: compIdOrLayout, options, passProps } } : compIdOrLayout;
};

export { stack, component };
