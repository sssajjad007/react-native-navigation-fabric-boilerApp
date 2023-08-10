import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { startApp } from '@navigation/navigation';
import CustomNavigation from '@navigation/library';

export function Splash({ componentId }) {
  useEffect(() => {
    setTimeout(() => {
      startApp();
      CustomNavigation.dismissOverlay(componentId);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, paddingBottom: 24 }}>Your SplashScreen!</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
