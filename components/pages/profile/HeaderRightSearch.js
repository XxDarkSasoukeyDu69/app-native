import React from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Block, Text, Input, Button} from '../../index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../constants';
import {user} from '../../../services/request';
import {Card} from '../../index';
import ButtonRequestManager from '../ButtonRequestManager';

export default class HeaderRightSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      searchString: null,
      searchFocus: true,
      results: [],
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  searchUser(text) {
    this.setState({searchString: text});
    text === ''
      ? this.setState({results: []})
      : user
          .searchUser(text)
          .then(r => this.setState({results: r.data.result}));
  }

  render() {
    const {modalVisible, searchString, searchFocus, results} = this.state;
    const {navigation} = this.props;
    const isEditing = searchFocus && searchString;
    return (
      <Block flex={false}>
        <Button
          onPress={() => this.setModalVisible(true)}
          style={{marginRight: 25}}>
          <Icon name="search" size={20} />
        </Button>
        <Modal animationType="fade" transparent={false} visible={modalVisible}>
          <Block
            flex={false}
            row
            middle
            style={{
              height: 75,
              marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
            }}>
            <Button
              onPress={() => this.setModalVisible(!modalVisible)}
              style={{marginLeft: 25}}>
              <Icon name="angle-down" size={25} />
            </Button>
            <Block margin={[0, theme.sizes.base * 2]}>
              <Input
                placeholder="Rechercher"
                style={styles.searchInput}
                onFocus={() => this.setState({searchFocus: true})}
                onBlur={() => this.setState({searchFocus: false})}
                onChangeText={text => this.searchUser(text)}
                value={searchString}
                onRightPress={() =>
                  isEditing ? this.setState({searchString: null}) : null
                }
                rightStyle={styles.searchRight}
                rightLabel={
                  <Icon
                    name={isEditing ? 'close' : 'search'}
                    size={theme.sizes.base / 1.6}
                    color={theme.colors.gray2}
                    style={styles.searchIcon}
                  />
                }
              />
            </Block>
          </Block>
          {results.length > 0 ? (
            <ScrollView>
              {results.map(item => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UserProfileScreen', {
                      visitor: true,
                      user_id: item.id,
                    });
                    this.setModalVisible(!modalVisible);
                  }}>
                  <Card shadow row margin={[10, 10]}>
                    <Block center row left>
                      <Image
                        source={require('../../../assets/images/user.jpg')}
                        style={styles.image}
                      />
                      <Text h2 semibold>
                        {item.firstname} {item.name}
                      </Text>
                    </Block>
                    <Block row right center>
                      <ButtonRequestManager
                        size={25}
                        is_accept={
                          item.is_accept === null ? 'none' : item.is_accept
                        }
                        user_id={item.id}
                      />
                    </Block>
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Block middle center>
              <Text h2 semibold>
                Chercher un utilisateur
              </Text>
            </Block>
          )}
        </Modal>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    backgroundColor: theme.colors.gray3,
    color: theme.colors.black,
    fontSize: 16,
    borderRadius: 60,
    borderWidth: 0,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: theme.sizes.base / 1.333,
    top: theme.sizes.base / 1.6,
  },
  image: {
    height: 70,
    width: 70,
    marginRight: 20,
    borderRadius: theme.sizes.base * 3,
  },
});
