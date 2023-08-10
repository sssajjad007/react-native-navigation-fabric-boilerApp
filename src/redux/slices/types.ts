import { profileType } from '@domains/Authentication/api/types';

export interface IUserSlice {
  isInitialized: boolean;
  isAuthenticated: boolean;
  refreshTokenFailed: boolean;
  profile: profileType;
}

export interface IPdfSlice {
  isError: boolean;
}
