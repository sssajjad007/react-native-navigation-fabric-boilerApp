import { View, Text } from 'react-native';
import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';

interface Props {
  name: string;
}
export const SideMenu: NavigationFunctionComponent<Props> = ({ componentId, name }) => {
  return (
    <View>
      <Text>SideMenu</Text>
    </View>
  );
};
