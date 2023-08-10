import React, { useEffect } from 'react';
import Screens from './screen';
import { Navigation } from 'react-native-navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { dispatch, store } from '@redux/store';
import { Appearance } from 'react-native';
import { retrieve } from '@utils/mmkv';
import { setDefaultOptions } from '@navigation/commons/options';
import { LoginModal } from './Auth/Login';
import { HomeScreen } from './Home';
import { Splash } from './Splash';
import { Empty } from './Empty';

// function ThemeChangerHandler({ children }) {
//   const darkMode = useSelector((state) => state.app.darkMode);
//   useEffect(() => {
//     shareData.theme.themeHandler(darkMode ? 'dark' : 'light');
//   }, [darkMode]);
//   return <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
// }

export function registerScreens() {
  prepareTheme();

  const S = new Map();

  S.set(Screens.LoginModal, LoginModal);
  S.set(Screens.Splash, Splash);
  S.set(Screens.Home, HomeScreen);
  S.set(Screens.Empty, Empty);

  S.forEach((Component, screenName) => {
    return Navigation.registerComponent(
      screenName,
      () => (props) =>
        (
          <ReduxProvider store={store}>
            {/* <ThemeChangerHandler> */}
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Component {...props} />
            </GestureHandlerRootView>
            {/* </ThemeChangerHandler> */}
          </ReduxProvider>
        ),
      () => Component // for navigation options
    );
  });
}

async function prepareTheme() {
  let defaultDeviceTheme = Appearance.getColorScheme();
  console.log('defaultDeviceTheme', defaultDeviceTheme);

  const theme = retrieve('theme', 'string');
  // if (theme) {
  //   defaultDeviceTheme = theme;
  //   dispatch(onDarkModePress(theme === 'dark' ? true : false));
  // } else {
  //   if (defaultDeviceTheme === 'dark') {
  //     dispatch(onDarkModePress(true));
  //   }
  // }
  // console.log('defaultDeviceTheme is ', defaultDeviceTheme);
  // if (defaultDeviceTheme === 'dark') {
  setDefaultOptions();
  // Navigation.setDefaultOptions({
  //   window: {
  //     backgroundColor: '#20232c',
  //   },
  //   layout: {
  //     componentBackgroundColor: '#20232c',
  //     // orientation: ['portrait'],
  //     // direction: 'rtl',
  //   },
  //   statusBar: {
  //     style: 'light',
  //     // #### (Android specific)
  //     backgroundColor: 'transparent',
  //     drawBehind: true,
  //     translucent: true, // make a little darker
  //   },
  // });
  // }
}

// export const useTheme = () => useContext(ThemeContext);
