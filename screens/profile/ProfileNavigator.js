import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen';
import SettingNavigator from './SettingScreen/SettingNavigator';
import ProfileRequestFriendScreen from './ProfileRequestFriendScreen';
import ProfileFriendScreen from './ProfileFriendScreen';
import ProfileTravelScreen from './ProfileTravelScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const ProfileNavigator = function StackNav() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="UserProfileScreen"
        component={ProfileScreen}
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
      <Stack.Screen
        name="ProfileFriendScreen"
        component={ProfileFriendScreen}
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
      <Stack.Screen
        name="ProfileRequestFriendScreen"
        component={ProfileRequestFriendScreen}
        options={{
          cardStyle: {backgroundColor: 'white'},
          headerTitle: 'Ajouter amies',
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
      <Stack.Screen
        name="ProfileSettingScreen"
        component={SettingNavigator}
        options={{
          cardStyle: {backgroundColor: 'white'},
          headerTitle: 'Parmètres',
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
      <Stack.Screen
        name="ProfileTravelScreen"
        component={ProfileTravelScreen}
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

export default ProfileNavigator;
