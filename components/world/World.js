import React, {Component} from 'react';
import {Block} from '../index';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, StatusBar} from 'react-native';
//import MapView from 'react-native-maps';

export default class World extends Component {
  render() {
    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'relative',
    flex: 1,
  },
});
