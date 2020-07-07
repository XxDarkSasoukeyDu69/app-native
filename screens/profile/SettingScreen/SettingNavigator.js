import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingReportScreen from './SettingReportScreen';
import SettingScreen from './SettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const SettingNavigator = function StackNav() {
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="SettingReportErrorScreen"
        component={SettingReportScreen}
        options={{
          cardStyle: {backgroundColor: 'white'},
          headerTitle: null,
          headerBackImage: () => (
            <Icon
              style={{marginLeft: 30}}
              name="angle-left"
              color="black"
              size={30}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingNavigator;
