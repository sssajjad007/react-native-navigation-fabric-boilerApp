import React, { SetStateAction, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, EmitterSubscription, Keyboard, Platform } from 'react-native';

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

type TypesBase = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';

export const onCheckType = (source: any, type: TypesBase): source is TypesBase => {
  return typeof source === type;
};

type NetInfoTuple = [boolean, boolean];
function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(false);

  const [canAccess, setCanAccess] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected ?? false);

      setCanAccess(state.isInternetReachable ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [status, canAccess];
}

function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}

function usePrevious<T = any>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

type UseSetArrayStateAction<T extends object> = React.Dispatch<SetStateAction<Partial<T>>>;
type UseSetStateArray<T extends object> = [T, UseSetArrayStateAction<T>, () => void];
function useSetStateArray<T extends object>(initialValue: T): UseSetStateArray<T> {
  const [value, setValue] = useState<T>(initialValue);

  const setState = useCallback(
    (v: SetStateAction<Partial<T>>) => {
      return setValue((oldValue) => ({
        ...oldValue,
        ...(typeof v === 'function' ? v(oldValue) : v),
      }));
    },
    [setValue]
  );

  const resetState = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setState, resetState];
}

type UseSetStateAction<T extends object> = React.Dispatch<SetStateAction<Partial<T>>>;
type UseSetState<T extends object> = {
  setState: UseSetStateAction<T>;
  state: T;
  resetState: () => void;
};
function useSetState<T extends object>(initialValue: T): UseSetState<T> {
  const [state, setState, resetState] = useSetStateArray(initialValue);

  return useMemo(
    () => ({
      setState,
      resetState,
      state,
    }),
    [setState, resetState, state]
  );
}

function useAsyncState<T>(
  initialValue: T
): [T, (newValue: SetStateAction<T>, callback?: (newState: T) => void) => void] {
  const [state, setState] = useState(initialValue);

  const _callback = useRef<(newState: T) => void>();

  const _setState = (newValue: SetStateAction<T>, callback?: (newState: T) => void) => {
    if (callback) {
      _callback.current = callback;
    }

    setState(newValue);
  };

  useEffect(() => {
    if (typeof _callback.current === 'function') {
      _callback.current(state);

      _callback.current = undefined;
    }
  }, [state]);

  return [state, _setState];
}

function useUnMount(callback: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(() => () => callback(), []);
}

function useDidMount(callback: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, []);
}

function useForceUpdate() {
  const unloadingRef = useRef(false);

  const [forcedRenderCount, setForcedRenderCount] = useState(0);

  useUnMount(() => (unloadingRef.current = true));

  return useCallback(() => {
    !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
}

function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);

  React.useEffect(() => {
    const handleKeyboardShow = () => setIsKeyboardShown(true);

    const handleKeyboardHide = () => setIsKeyboardShown(false);

    let keyboardWillShow: EmitterSubscription;
    let keyboardWillHide: EmitterSubscription;
    let keyboardDidShow: EmitterSubscription;
    let keyboardDidHide: EmitterSubscription;
    if (Platform.OS === 'ios') {
      keyboardWillShow = Keyboard.addListener('keyboardWillShow', handleKeyboardShow);

      keyboardWillHide = Keyboard.addListener('keyboardWillHide', handleKeyboardHide);
    } else {
      keyboardDidShow = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);

      keyboardDidHide = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    }

    return () => {
      if (Platform.OS === 'ios') {
        keyboardWillShow.remove();

        keyboardWillHide.remove();
      } else {
        keyboardDidShow.remove();

        keyboardDidHide.remove();
      }
    };
  }, []);

  return isKeyboardShown;
}

function useDisableBackHandler(disabled: boolean, callback?: () => void) {
  // function
  const onBackPress = useCallback(() => {
    if (onCheckType(callback, 'function')) {
      callback();
    }

    return true;
  }, [callback]);

  useEffect(() => {
    if (disabled) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [disabled, onBackPress]);
}

function useDismissKeyboard(isHide: boolean) {
  useEffect(() => {
    if (isHide) {
      Keyboard.dismiss();
    }
  }, [isHide]);
}

function useMounted(callback: () => void, deps: any[] = []) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}

const useEventCallback = <Fn extends (...args: any[]) => ReturnType<Fn>>(func: Fn) => {
  const callbackRef = useRef<(...args: Parameters<Fn>) => ReturnType<Fn>>();

  const callbackMemoized = useCallback((...args: Parameters<Fn>) => {
    return callbackRef.current?.(...args);
  }, []);

  useLayoutEffect(() => {
    callbackRef.current = (...args) => func(...args);
  });

  return callbackMemoized;
};

export {
  useDisableBackHandler,
  useDismissKeyboard,
  useInterval,
  useNetWorkStatus,
  usePrevious,
  useSetState,
  useAsyncState,
  useUnMount,
  useForceUpdate,
  useMounted,
  useIsKeyboardShown,
  useDidMount,
  useEventCallback,
};
