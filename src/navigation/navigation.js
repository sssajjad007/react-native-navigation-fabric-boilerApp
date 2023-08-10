import Screens from '@screens/screen';
import { modalOptions, setDefaultOptions } from './commons/options';
import CustomNavigation from './library';
import { geSidebarWidth } from '@utils/deviceUi';
import RNBootSplash from 'react-native-bootsplash';

export const startSplash = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 100);
    // setTimeout(() => {
    setDefaultOptions();
    // }, 1000);
    CustomNavigation.events().registerAppLaunchedListener(async () => {
      CustomNavigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  id: 'Empty',
                  name: Screens.Empty,
                },
              },
            ],
          },
        },
      });

      CustomNavigation.dismissAllOverlays();
      CustomNavigation.dismissAllModals();

      CustomNavigation.showOverlay({
        component: {
          id: 'Splash',
          name: Screens.Splash,
        },
      });
      resolve();
    });
  });

export const startApp = () => {
  const drawerDirection = 'right';
  CustomNavigation.setRoot({
    sideMenu: {
      center: {
        stack: {
          children: [
            {
              component: {
                id: 'Home',
                name: Screens.Home,
                waitForRender: true,
              },
            },
          ],
        },
      },
      // [drawerDirection]: {
      //   component: {
      //     id: 'SideMenu',
      //     name: Screens.SideMenu,
      //   },
      // },
      // options: {
      //   sideMenu: {
      //     [drawerDirection]: {
      //       width: geSidebarWidth(),
      //     },
      //   },
      // },
    },
  });

  // some linking logic
};

export const showLoginModal = (passProps) => {
  closeSideMenu(passProps.componentId);
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'LoginModal',
            name: Screens.LoginModal,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {
            // ...modalOptions.waitForRender,
          },
    },
  });
};
export const showEditProfileModal = (passProps) => {
  closeSideMenu(passProps.componentId);
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'EditProfile',
            name: Screens.EditProfile,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {
            // ...modalOptions.waitForRender,
          },
    },
  });
};
export const showMapModal = (passProps) => {
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'MapModal',
            name: Screens.MapModal,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {},
    },
  });
};
export const showAddressesModal = (passProps) => {
  closeSideMenu(passProps.componentId);

  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'Addresses',
            name: Screens.Addresses,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {},
    },
  });
};

export const showWebViewModal = (passProps) => {
  closeSideMenu(passProps.componentId);
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'WebView',
            name: Screens.WebView,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {
            // ...modalOptions.waitForRender,
          },
    },
  });
};

export const showEditAddress = (passProps) => {
  closeSideMenu(passProps.componentId);
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'EditAddress',
            name: Screens.EditAddress,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {
            // ...modalOptions.waitForRender,
          },
    },
  });
};
export const showCartModal = (passProps) => {
  closeSideMenu(passProps.componentId);
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'Cart',
            name: Screens.Cart,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {
            // ...modalOptions.waitForRender,
          },
    },
  });
};
export const closeAlertModal = (passProps) =>
  CustomNavigation.updateProps('AlertModal', {
    ...passProps,
    makeClose: true,
  });
export const showAlertModal = (passProps) => {
  CustomNavigation.showOverlay({
    component: {
      id: 'AlertModal',
      name: Screens.AlertModal,
      componentId: passProps.componentId,
      passProps,
    },
    options: passProps.overlay
      ? {
          ...modalOptions.overlay,
          // ...modalOptions.animationEffects,
        }
      : {
          // ...modalOptions.waitForRender,
        },
  });
};
export const showFoodModal = (passProps) => {
  CustomNavigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: 'FoodModal',
            name: Screens.FoodModal,
            componentId: passProps.componentId,
            passProps,
          },
        },
      ],
      options: passProps.pageSheet
        ? {
            ...modalOptions.pageSheet,
            ...modalOptions.animationEffects,
          }
        : {
            // ...modalOptions.waitForRender,
          },
    },
  });
};

export const closeSideMenu = (componentId) => {
  CustomNavigation.mergeOptions(componentId, {
    sideMenu: {
      right: {
        visible: false,
      },
    },
  });
};

export const pushAddressList = (componentId, checkout) => {
  CustomNavigation.push(componentId, Screens.Addresses, {}, { parentComponentId: componentId, checkout });
};
export const pushPayment = (componentId) => {
  CustomNavigation.push(componentId, Screens.Payment, {}, { parentComponentId: componentId });
};
export const pushDelivery = (componentId) => {
  CustomNavigation.push(componentId, Screens.Delivery, {}, { parentComponentId: componentId });
};
export const pushDescription = (componentId) => {
  CustomNavigation.push(componentId, Screens.Description, {}, { parentComponentId: componentId });
};
export const pushVerify = (componentId, mobile, parentComponentId) => {
  CustomNavigation.push(componentId, Screens.VerifyCode, {}, { mobile, parentComponentId });
};
export const pushRegister = (componentId, mobile, parentComponentId) => {
  CustomNavigation.push(componentId, Screens.Register, {}, { mobile, parentComponentId });
};

export const pushResetPassword = (componentId, mobile, parentComponentId) => {
  CustomNavigation.push(componentId, Screens.ResetPassword, {}, { mobile, parentComponentId });
};
export const pushSearchAddress = (componentId, movePosition) => {
  CustomNavigation.push(componentId, Screens.SearchAddress, {}, { parentComponentId: componentId, movePosition });
};
export const pushAddAddress = ({ componentId, pageSheet, address, lat, lng, editMode }) => {
  CustomNavigation.push(
    componentId,
    Screens.EditAddress,
    {},
    {
      pageSheet,
      parentComponentId: componentId,
      address,
      lat,
      lng,
      editMode,
    }
  );
};
export const pushMapModal = ({ componentId, pageSheet, parentComponentId, lat, lng, editMode }) => {
  CustomNavigation.push(
    componentId,
    Screens.MapModal,
    {},
    { componentId, pageSheet, parentComponentId, lat, lng, editMode }
  );
};
