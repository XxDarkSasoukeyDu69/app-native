import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Starter from '../screens/starter/StarterScreen';
import Login from '../screens/auth/LoginScreen';
import Register from '../screens/auth/SubscribeScreen';
import MainNavigator from './MainNavigator';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const AuthNavigator = function NavStack() {
  return (
    <Stack.Navigator initialRouteName="Starter" headerMode="none">
      <Stack.Screen
        name="Starter"
        component={Starter}
        options={{cardStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{cardStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{cardStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          cardStyle: {backgroundColor: 'white'},
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
