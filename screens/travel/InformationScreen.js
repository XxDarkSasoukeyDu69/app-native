import React, {Component} from 'react';
import {Block, Button, Text, Input} from '../../components';
import {theme} from '../../constants';
import {StyleSheet} from 'react-native';
import travelService from '../../services/travelService';

export default class InformationScreen extends Component {
  constructor() {
    super();
    this.state = {
      validButton: false,
      title: '',
      description: '',
    };
    this.validForm = this.validForm.bind(this);
  }

  validForm() {
    const {title, description} = this.state;
    const {navigation} = this.props;

    travelService
      .setInformation(title, description)
      .then(r => navigation.navigate('CountryPointsScreen'));
  }

  render() {
    return (
      <Block middle margin={[0, theme.sizes.base * 2]}>
        <Block flex={false} style={{width: 300}}>
          <Block flex={false} margin={[theme.sizes.base * 2, 0, 0]}>
            <Text h3 gray>
              Etape 3
            </Text>
          </Block>
          <Block flex={false}>
            <Text body>
              Définisser un titre et une description de votre voyage
            </Text>
            <Block flex={false} margin={[theme.sizes.base * 1, 0, 0]}>
              <Input
                style={[styles.textInput]}
                label="Titre"
                defaultValue={this.state.title}
                onChangeText={text => this.setState({title: text})}
              />
              <Input
                style={[styles.textInput, styles.textArea]}
                label="Description"
                multiline
                numberOfLines={4}
                defaultValue={this.state.description}
                onChangeText={text => this.setState({description: text})}
              />
            </Block>
          </Block>
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
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: theme.colors.gray3,
    color: theme.colors.black,
    fontSize: 16,
    borderRadius: 60,
    borderWidth: 0,
  },
  textArea: {
    borderRadius: 20,
    height: 100,
  },
});
