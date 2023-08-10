import { View, Text } from 'react-native';
import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';

interface Props {
  name: string;
}
export const HomeScreen: NavigationFunctionComponent<Props> = ({ componentId, name }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{componentId}</Text>
    </View>
  );
};
