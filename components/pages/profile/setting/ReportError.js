import React from 'react';
import {Input, Block, Button, Text} from '../../../index';
import {report} from '../../../../services/request';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../../constants';
import {StyleSheet} from 'react-native';

const DEFAULT_STATE = {validButton: false, title: '', description: ''};

export default class ReportError extends React.Component {
  constructor() {
    super();
    this.state = {
      ...DEFAULT_STATE,
    };
  }

  validForm() {
    this.setState(DEFAULT_STATE);

  }

  render() {
    const {validButton, description, title} = this.state;
    return (
      <Block>
        <Text>Rapport d'erreur</Text>
        <Block flex={false} margin={[theme.sizes.base * 1, 0, 0]}>
          <Input
            style={[styles.textInput]}
            label="Titre"
            defaultValue={title}
            onChangeText={text => this.setState({title: text})}
          />
          <Input
            style={[styles.textInput, styles.textArea]}
            label="Description"
            multiline
            numberOfLines={4}
            defaultValue={description}
            onChangeText={text => this.setState({description: text})}
          />
        </Block>
        <Block flex={false}>
          <Button
            disabled={validButton}
            rounded={50}
            gradient
            startColor={'#4164a8'}
            endColor={'#628AD9'}
            medium
            style={{width: 125}}
            onPress={
                this.props.triggerTest
            }>
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
