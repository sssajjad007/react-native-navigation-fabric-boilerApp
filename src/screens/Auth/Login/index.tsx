import React from 'react';
import { Text, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

interface Props {
  name: string;
}
export const LoginModal: NavigationFunctionComponent<Props> = ({ componentId, name }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{componentId}</Text>
    </View>
  );
};
