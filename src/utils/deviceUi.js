import { Platform, PixelRatio, Dimensions, StatusBar, Appearance } from 'react-native';

export const { width, height } = Dimensions.get('window');
console.log('width: ', width, 'height: ', height);

export const isSmallScreen = width <= 320;

export const pixelRatio = PixelRatio.get();

export const platform = Platform.OS;

export const isIphoneX =
  platform === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 780 ||
    width === 780 ||
    height === 812 ||
    width === 812 ||
    height === 844 ||
    width === 844 ||
    height === 896 ||
    width === 896 ||
    height === 926 ||
    width === 926 ||
    width === 430 ||
    height === 932); //TODO: add another devices

export const safeAreaBottomHeight = isIphoneX ? 35 - 20 : 0;

export const screenSizeWithPixelRatio = {
  width: width * pixelRatio,
  height: height * pixelRatio,
};

const standardLength = width > height ? width : height;

export const offset = width > height ? 0 : platform === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

export const deviceHeight = isIphoneX || platform === 'android' ? standardLength - offset : standardLength;

export const defaultDeviceTheme =
  Appearance.getColorScheme() === 'no-preference' ? 'light' : Appearance.getColorScheme();
export const geSidebarWidth = () => {
  const w = width * 0.7;
  return w > 300 ? 300 : w;
};

const _deviceConstants = {
  statusBarHeight: 0,
  bottomTabsHeight: 0,
};
export const deviceConstants = _deviceConstants;

export const setDeviceconstants = (constants) => {
  console.log(`The app constants ${platform}: ${JSON.stringify(constants)}`);
  const { statusBarHeight, bottomTabsHeight } = constants;
  _deviceConstants.statusBarHeight = statusBarHeight;
  _deviceConstants.bottomTabsHeight = bottomTabsHeight;
};

const _deviceInfo = {
  platform,
  isEmulator: true,
  appVersion: 0,
  buildNumber: 0,
  model: '',
  brand: '',
  ios: {
    version: 0,
    model: '',
  },
  android: {
    apiLevel: 0,
    model: '',
  },
};
export const deviceInfo = _deviceInfo;
export const setDeviceInfo = (info) => {
  const { isEmulator, appVersion, buildNumber, api_level, device_model, device_brand } = info;
  _deviceInfo.isEmulator = isEmulator;
  _deviceInfo.appVersion = appVersion;
  _deviceInfo.buildNumber = buildNumber;
  _deviceInfo.model = device_model;
  _deviceInfo.brand = device_brand;

  if (platform === 'ios') {
    _deviceInfo.ios.version = parseInt(Platform.Version, 10);
    _deviceInfo.ios.model = device_model;
  } else if (platform === 'android') {
    _deviceInfo.android.apiLevel = api_level;
    _deviceInfo.android.model = device_brand;
  }

  // setRequestHeaderPlatform({
  //   os: platform,
  //   version: appVersion,
  //   simulator: isEmulator,
  // });

  // console.log(`The app DeviceInfo ${JSON.stringify(_deviceInfo)}`);
};
