import React from 'react';
//import { LinearGradient } from 'react-native-linear-gradient';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {theme} from '../../../constants';
import {Block, Text} from '../../index';
import {travels} from '../../../constants/data';

//const {width} = Dimensions.get('window');

interface WorldControllerMax {
  onPress: () => void;
}

export default ({onPress}: WorldControllerMax) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.absolute}>
        <View style={styles.container}>
          <View style={styles.header}>
            <RectButton
              style={styles.button}
              {...{ onPress }}>
              <Icon name="chevron-down" color="black" size={24} />
            </RectButton>
            <Text style={styles.title}>The Bay</Text>
            <TouchableOpacity style={styles.button}>
              <Icon name="home" color="black" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Block margin={[0, theme.sizes.base * 2]} style={{padding: 0}}>
          <Image
            source={require('../../../assets/images/voyage.jpeg')}
            resizeMode={'cover'}
            style={{width: '100%', height: 200}}
          />
          <Block flex={false} padding={[30, 10, 10, 10]}>
            <Text h0 bold>
              Voyage en france
            </Text>
            <Block row margin={[theme.sizes.base, 0]}>
              <Text gray>12/12/2019 - 12/12/2019</Text>
            </Block>
            <Text h3 darkGray semibold>
              Ceci est une description de mon voyage trop cool, vraiment , une
              description d'enfer, mieux que le lorem ipsum cette merde, une
              description d'enfer, mieux que le lorem ipsum cette merde
            </Text>
          </Block>
        </Block>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 16,
  },
  container: {
    margin: 16,
  },
  title: {
    padding: 16,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
});
