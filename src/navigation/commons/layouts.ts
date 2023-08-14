import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { Options, Layout } from 'react-native-navigation';

type CompIdOrLayout = string | Layout;

export const stack = (rawChildren: CompIdOrLayout | CompIdOrLayout[], id?: string): Layout => {
  const childrenArray = isArray(rawChildren) ? rawChildren : [rawChildren];
  const children = childrenArray.map((child) => component(child));
  return { stack: { children, id } };
};

export const component = <P = {}>(compIdOrLayout: CompIdOrLayout, options?: Options, passProps?: P): Layout<P> => {
  return isString(compIdOrLayout)
    ? { component: { name: compIdOrLayout, options, passProps } }
    : (compIdOrLayout as Layout<P>);
};
