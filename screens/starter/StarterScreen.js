import React, {Component} from 'react';
import {theme} from '../../constants';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Block, Text, Divider, Button} from '../../components';

const {width, height} = Dimensions.get('window');

export default class StarterScreen extends Component {
  render() {
    return (
      <Block style={{height: 500}} margin={[0, theme.sizes.base * 2]}>
        <Block
          flex={false}
          center
          row
          margin={[theme.sizes.base * 2, 0, theme.sizes.base * 4, 0]}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text bold h3>
            ToDoWorld
          </Text>
        </Block>
        <Block>
          <Block flex={false}>
            <Text h0 bold>
              Voyager
            </Text>
            <Text h0 bold>
              Pour partager
            </Text>
          </Block>
          <Divider
            margin={[theme.sizes.base * 2, 0]}
            color={theme.colors.royalblue}
            width={100}
            height={2}
          />
          <Text header medium gray>
            Avec Todoworld, découvrez comment faire et organiser le voyage de
            vos rêves en demandant l'avis d'autres voyageurs
          </Text>
          <Image
            source={require('../../assets/images/world.png')}
            style={styles.image}
          />
          <Block flex={false} margin={[theme.sizes.base, 0]}>
            <Button
              rounded={50}
              gradient
              startColor={'#4164a8'}
              endColor={'#628AD9'}
              medium
              style={{width: 125}}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text center white semibold>
                Get Started
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 25,
    width: 25,
    marginRight: 20,
  },
  image: {
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
    height: 250,
    borderRadius: 25,
  },
});
