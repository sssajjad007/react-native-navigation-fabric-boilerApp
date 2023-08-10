import { Dimensions, Platform } from 'react-native';
import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation';
import { store } from '../../redux/store';

let defaultOptions = {
  statusBarStyle: 'dark',
  appBackgrounColor: '#f8f8f8',
};
// defaultOptions.statusBarStyle = theme === 'dark' ? 'light' : 'dark';
// defaultOptions.appBackgrounColor = theme === 'dark' ? '#20232c' : '#f8f8f8';
const setDefaultOptions = () => {
  const state = store.getState();
  const darkMode = false;
  console.log('darkMode in option: ', darkMode);
  Navigation.setDefaultOptions({
    window: {
      backgroundColor: darkMode ? '#20232c' : '#f8f8f8', //'black',
    },
    layout: {
      componentBackgroundColor: darkMode ? '#20232c' : '#f8f8f8', //'black',
      // orientation: ['portrait'],
      // direction: 'rtl',
    },
    statusBar: {
      style: darkMode ? 'light' : 'dark',
      // #### (Android specific)
      backgroundColor: 'transparent',
      drawBehind: true,
      translucent: true, // make a little darker
    },

    bottomTab: {
      visible: false,
    },
    topBar: {
      visible: false,
    },

    ...(Platform.OS === 'ios'
      ? {
          //     animations: {
          //       push: {
          //         // enabled: Platform.OS === 'ios' ? true : false,
          //         content: {
          //           // waitForRender: true,
          //           x: {
          //             from: -Dimensions.get('window').width,
          //             to: 0,
          //             duration: 200,
          //           },
          //         },
          //       },
          //       //TODO:not working on ios
          //       // pop: {
          //       //   // enabled: Platform.OS === 'ios' ? true : false,
          //       //   content: {
          //       //     // waitForRender: true,
          //       //     x: {
          //       //       from: 0,
          //       //       to: -Dimensions.get('window').width,
          //       //       duration: 200,
          //       //     },
          //       //   },
          //       // },
          //     },
        }
      : {
          animations: {
            push: {
              enabled: Platform.OS === 'android' ? true : false,
              waitForRender: true,
              content: {
                x: {
                  from: Dimensions.get('window').width,
                  to: 0,
                  duration: 200,
                },
              },
            },
            pop: {
              enabled: Platform.OS === 'android' ? true : false,
              content: {
                waitForRender: true,
                x: {
                  from: 0,
                  to: Dimensions.get('window').width,
                  duration: 200,
                },
              },
            },
            dismissModal: {
              exit: {
                enabled: Platform.OS === 'android' ? true : false,
                alpha: {
                  from: 1,
                  to: 0,
                  duration: 200,
                },
                y: {
                  duration: 200,
                  from: 0,
                  to: Dimensions.get('window').height,
                },
              },
            },
          },
        }),
    modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
  });
};

const modalOptions = {
  pageSheet: {
    modalPresentationStyle: OptionsModalPresentationStyle.pageSheet,
    modal: {
      swipeToDismiss: true,
    },
  },
  animationEffects:
    Platform.OS === 'ios'
      ? {}
      : {
          animations: {
            showModal: {
              enter: {
                enabled: Platform.OS === 'android' ? true : false,
                // waitForRender: true,

                alpha: {
                  from: 0,
                  to: 1,
                  duration: 200,
                },
                y: {
                  // from: -100, // up to down
                  // to: 0,
                  duration: 200,
                  from: Dimensions.get('window').height,
                  to: 0,
                },
              },
            },
          },
        },
};

export { setDefaultOptions, modalOptions };
