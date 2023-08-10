import Screens from '@screens/screen';
import { setDefaultOptions } from './commons/options';
import CustomNavigation from './library';
import { geSidebarWidth } from '@utils/deviceUi';
import RNBootSplash from 'react-native-bootsplash';

export const startSplash = () =>
  new Promise<void>((resolve) => {
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
      [drawerDirection]: {
        component: {
          id: 'SideMenu',
          name: Screens.SideMenu,
        },
      },
      options: {
        sideMenu: {
          [drawerDirection]: {
            width: geSidebarWidth(),
          },
        },
      },
      center: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: Screens.LoginModal,
                      id: 'Tab1',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    text: 'Tab1',
                    icon: require('../../assets/images/logowhite.png'),
                    fontSize: 12,
                    fontFamily: 'IRANSansX-Regular',
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: Screens.Home,
                      id: 'Tab2',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    text: 'Tab2',
                    icon: require('../../assets/images/logowhite.png'),
                    fontSize: 12,
                    fontFamily: 'IRANSansX-Regular',
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: Screens.Home,
                      id: 'Tab3',
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    text: 'Tab3',
                    icon: require('../../assets/images/logowhite.png'),
                    fontSize: 12,
                    fontFamily: 'IRANSansX-Regular',
                  },
                },
              },
            },
          ],
          options: {
            topBar: {
              visible: false,
            },
            bottomTabs: {
              backgroundColor: 'white',
              titleDisplayMode: 'alwaysShow',
            },
          },
        },
      },
    },
  });

  // some linking logic
};
