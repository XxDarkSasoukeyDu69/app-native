import React from 'react';
import {Block, Text, Button} from '../../components';
import {theme} from '../../constants';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import travelService from '../../services/travelService';

export default class CountryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      validButton: true,
      country: '',
    };
    this.validForm = this.validForm.bind(this);
  }

  validForm() {
    const {navigation} = this.props;
    const {country} = this.state;
    var item = country;
    travelService.setCountry(item).then(r => navigation.navigate('DateScreen'));
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <Block middle margin={[0, theme.sizes.base * 2]}>
          <Block flex={false} style={{width: 300}}>
            <Text h1 bold>
              Nous allons vous aider a pulier votre voyage.
            </Text>
            <Block flex={false} margin={[theme.sizes.base * 2, 0, 0]}>
              <Text h3 gray>
                Etape 1
              </Text>
            </Block>
            <Block flex={false}>
              <Text body>Dans quel pays c'est passé votre voyage ?</Text>
            </Block>
            <Block
              flex={false}
              style={{height: 100}}
              margin={[theme.sizes.base * 2, 0, 0]}>
              <GooglePlacesAutocomplete
                placeholder="Entrez un pays"
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(details);
                  this.setState({
                    validButton: false,
                    country: JSON.stringify(details.address_components),
                  });
                }}
                styles={styles}
                currentLocation={false}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyA2Cy8futk7U_4N70GQPEsqm5UVGWOWhEM',
                  language: 'en', // language of the results
                  types: '(regions)', // default: 'geocode'
                }}
              />
            </Block>
            <Block flex={false}>
              <Button
                disabled={this.state.validButton}
                rounded={50}
                gradient
                startColor={'#4164a8'}
                endColor={'#628AD9'}
                medium
                style={{width: 125}}
                onPress={() => {
                  this.validForm();
                }}>
                <Text h3 center white semibold>
                  Continuer
                </Text>
              </Button>
            </Block>
          </Block>
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
