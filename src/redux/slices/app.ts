import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type toast = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  show: boolean;
};

type State = {
  isConnected: boolean;
  internetAvailable: boolean;
  vpn: boolean;
  toastConfig: toast;
  englishVersion: boolean;
};

const initialState: State = {
  isConnected: true,
  internetAvailable: true,
  vpn: false,
  toastConfig: {
    message: '',
    type: 'success',
    show: false,
  },
  englishVersion: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setConnection(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
    setInternet(state, action: PayloadAction<boolean>) {
      state.internetAvailable = action.payload;
    },
    setVpn(state, action: PayloadAction<boolean>) {
      state.vpn = action.payload;
    },
    setShowToast(state, action: PayloadAction<toast>) {
      state.toastConfig = action.payload;
    },
    setEnglishVersion(state, action: PayloadAction<boolean>) {
      state.englishVersion = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setConnection, setInternet, setShowToast, setEnglishVersion } = appSlice.actions;
