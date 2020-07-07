import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import CountryScreen from './CountryScreen';
import InformationScreen from './InformationScreen';
import DateScreen from './DateScreen';
import CountryPointsScreen from './CountryPointsScreen';

const Stack = createStackNavigator();
const AddTravelNavigator = function StackNav() {
  return (
    <Stack.Navigator initialRouteName="CountryScreen" headerMode="none">
      <Stack.Screen
        name="CountryScreen"
        component={CountryScreen}
        options={{cardStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="InformationScreen"
        component={InformationScreen}
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
        name="DateScreen"
        component={DateScreen}
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
        name="CountryPointsScreen"
        component={CountryPointsScreen}
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

export default AddTravelNavigator;
