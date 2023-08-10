import { Navigation } from 'react-native-navigation';
import get from 'lodash/get';
import isString from 'lodash/isString';
import { stack, component } from './commons/layouts';

const push = (selfOrCompId, screen, options, passProps) =>
  Navigation.push(compId(selfOrCompId), isString(screen) ? component(screen, options, passProps) : screen);

const pushExternalComponent = (self, name, passProps, options) =>
  Navigation.push(self.props.componentId, {
    externalComponent: {
      name,
      passProps,
    },
    options,
  });

const pop = (selfOrCompId, mergeOptions) => {
  try {
    Navigation.pop(compId(selfOrCompId), mergeOptions);
  } catch (e) {
    console.log(e);
  }
};
const showModal = (screen, options, passProps) =>
  Navigation.showModal(isString(screen) ? stack(component(screen, options, passProps)) : screen);

const dismissModal = (selfOrCompId, mergeOptions) => Navigation.dismissModal(compId(selfOrCompId), mergeOptions);

const dismissAllModals = () => Navigation.dismissAllModals();
const dismissAllOverlays = () => Navigation.dismissAllOverlays();

const showOverlay = (name, options) => Navigation.showOverlay(component(name, options));

const dismissOverlay = (compId) => Navigation.dismissOverlay(compId);

const popToRoot = (self) => Navigation.popToRoot(self.props.componentId);

const mergeOptions = (selfOrCompId, options) => Navigation.mergeOptions(compId(selfOrCompId), options);

const setStackRoot = (selfOrCompId, root) => Navigation.setStackRoot(compId(selfOrCompId), root);

const setRoot = (root) => {
  // If provided root is not a string and contain `root` property, it's a LayoutRoot.
  if (!isString(root) && !!get(root, 'root')) {
    return Navigation.setRoot(root);
  }

  return Navigation.setRoot({ root: component(root) });
};

const compId = (selfOrCompId) => {
  return get(selfOrCompId, 'props.componentId', selfOrCompId);
};

const constants = async () => await Navigation.constants();
const CustomNavigation = {
  mergeOptions,
  updateProps: Navigation.updateProps.bind(Navigation),
  push,
  pushExternalComponent,
  pop,
  popToRoot,
  showModal,
  dismissModal,
  dismissAllModals,
  dismissAllOverlays,
  showOverlay,
  dismissOverlay,
  events: Navigation.events.bind(Navigation),
  popTo: Navigation.popTo.bind(Navigation),
  setDefaultOptions: Navigation.setDefaultOptions.bind(Navigation),
  setRoot,
  TouchablePreview: Navigation.TouchablePreview,
  setStackRoot,
  constants,
};

export default CustomNavigation;
