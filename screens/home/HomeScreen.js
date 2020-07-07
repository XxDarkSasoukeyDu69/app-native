import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>je suis un home</Text>
        <Icon name="md-menu" size={30} />
      </View>
    );
  }
}
