import React, {Component} from 'react';
import {Block, Text} from '../../../components';
import {theme} from '../../../constants';
import {Image, Button, StyleSheet, AsyncStorage} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import image from '../../../services/request/image';


export default class ProfileSettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
      item: '',
      user: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then(resp => {
      this.setState({user: JSON.parse(resp).data});
    });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({photo: response});
        console.log(response)
       // image.postImage(response).then(r => r);
      }
    });
  };

  renderPhoto() {
    const {photo} = this.state;
    return (
      <Block
        margin={[theme.sizes.base, theme.sizes.base * 2]}
        flex={false}
        row
        center
        space="between">
        {photo ? (
          <Image source={{uri: photo.uri}} style={styles.imageWrapper} />
        ) : (
          <Block
            flex={false}
            center
            middle
            style={{...styles.imageWrapper, ...styles.imageWrapperBack}}>
            <Text
              small
              royalblue
              center
              style={{width: 50, color: theme.colors.royalblue}}>
              Aucune Photo
            </Text>
          </Block>
        )}
        <Button onPress={this.handleChoosePhoto} title="Choisir" />
      </Block>
    );
  }

  async handleDisconnected() {
    const {navigation} = this.props;
    try {
      await AsyncStorage.clear().then(resp => navigation.navigate('Starter'));
    } catch (e) {
      alert('Une erreur est survenue');
    }
  }

  triggered() {
    this.setState({test: 'le test du click'});
  }

  render() {
    const {navigation} = this.props;
    return (
      <Block margin={[theme.sizes.base, theme.sizes.base * 2]}>
        {this.renderPhoto()}
        <Block flex={false} row>
          <Block>
            <Text>Reporter une erreur</Text>
          </Block>
          <Button onPress={() => navigation.navigate('SettingReportErrorScreen')} title="Editer" />
        </Block>
        <Block flex={false} margin={[theme.sizes.base, 0]}>
          <Button
            title="Déconnexion"
            color={theme.colors.accent}
            onPress={this.handleDisconnected.bind(this)}
          />
          <Text>{this.state.item}</Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  imageWrapperBack: {
    backgroundColor: theme.colors.gray2,
  },
});
