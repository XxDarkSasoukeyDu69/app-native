import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import WorldScreen from '../screens/world/WorldScreen';
import NewsScreen from '../screens/news/NewsScreen';
import ProfileNavigator from '../screens/profile/ProfileNavigator';
import AddTravelNavigator from '../screens/travel/AddTravelNavigator';

import {Text} from '../components';

const Tabs = createBottomTabNavigator();

const MainNavigator = function NavTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({navigation}) => ({
        tabBarIcon: ({tintColor}) => <Text>T</Text>,
      })}
      tabBarOptions={{
        labelStyle: {fontSize: 13, fontWeight: 'bold'},
        activeTintColor: 'royalblue',
        inactiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          cardStyle: {backgroundColor: 'white'},
          title: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="WorldScreen"
        component={WorldScreen}
        options={{
          cardStyle: {backgroundColor: 'white'},
          title: 'World',
          tabBarIcon: ({color, size}) => (
            <Icon name="globe" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          cardStyle: {backgroundColor: 'white'},
          title: 'News',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreateScreen"
        component={AddTravelNavigator}
        options={{
          cardStyle: {backgroundColor: 'white'},
          title: 'Travel',
          tabBarIcon: ({color, size}) => (
            <Icon name="plus" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainNavigator;
