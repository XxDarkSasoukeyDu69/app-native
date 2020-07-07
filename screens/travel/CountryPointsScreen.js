import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Block, Button, Text} from '../../components';
import {theme} from '../../constants';
import travel from '../../services/request/travel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class InformationScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <Block middle margin={[0, theme.sizes.base * 2]}>
          <Block flex={false} style={{width: 300}}>
            <Text h3 gray>
              Etape 4
            </Text>
            <Block flex={false} margin={[theme.sizes.base * 2, 0, 0]}>
              <Text body>
                Définisser une ville dans lequel vous allez pouvoir définir des
                addresses.
              </Text>
            </Block>
          </Block>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.warn(details);
              console.warn(data);
            }}
            enablePoweredByContainer={false}
            styles={styles}
            currentLocation={true}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyA2Cy8futk7U_4N70GQPEsqm5UVGWOWhEM',
              language: 'en', // language of the results
              types: '(cities)', // default: 'geocode'
            }}
          />
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    backgroundColor: theme.colors.gray3,
    color: theme.colors.black,
    fontSize: 16,
    borderRadius: 60,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
});
