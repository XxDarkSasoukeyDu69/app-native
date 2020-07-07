import React from 'react';
import {
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Image,
  AsyncStorage,
} from 'react-native';
import {Block, Text, Card} from '../../components';
import {theme, data} from '../../constants';
import {friend, user} from '../../services/request';
import ButtonRequestManager from '../../components/pages/ButtonRequestManager';

const {width} = Dimensions.get('window');

class ProfileScreen extends React.Component {
  state = {
    menuItems: [],
    user: [],
    visitor: false,
    relationState: 'none',
    loading: false,
  };

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.visitor === true) {
      this.setState({menuItems: data.menuOtherProfiles, visitor: true});

      user.getUserDetail(this.props.route.params.user_id).then(r => {
        this.setState({user: r.data.data});
        friend
          .getStateRelation(this.state.user.id)
          .then(s =>
            this.setState({relationState: s.data.status, loading: true}),
          );
      });
    } else {
      this.setState({menuItems: data.menuProfils});
      AsyncStorage.getItem('user').then(resp => {
        this.setState({user: JSON.parse(resp).data, loading: true});
      });
    }
  }

  renderVisitorBar() {
    const {user, relationState} = this.state;
    console.log('relation state', relationState);
    return (
      <Block flex={false} center>
        <ButtonRequestManager
          is_accept={relationState === null ? 'none' : relationState}
          user_id={user.id}
          size={30}
        />
      </Block>
    );
  }

  render() {
    const {navigation} = this.props;
    const {menuItems, visitor, loading, user} = this.state;
    if (loading) {
      return (
        <Block>
          <Block
            flex={false}
            row
            center
            margin={[theme.sizes.base * 2, theme.sizes.base * 2]}>
            <Image
              style={styles.image}
              source={require('../../assets/images/user.jpg')}
            />
            <Text h0 bold>
              {this.state.user.firstname} {this.state.user.name}
            </Text>
          </Block>
          {visitor === true ? this.renderVisitorBar() : null}
          <Block style={{paddingVertical: theme.sizes.base * 2}}>
            <Block flex={false} row space="between" style={styles.menuItems}>
              {menuItems.map(item => (
                <TouchableWithoutFeedback
                  key={item.id}
                  onPress={() => navigation.navigate(item.screen, {user: user})}>
                  <Card center middle shadow style={styles.menuItem}>
                    <Block center>
                      <Image style={styles.menuImage} source={item.image} />
                      <Text medium body height={20} style={{color: 'black'}}>
                        {item.title}
                      </Text>
                    </Block>
                  </Card>
                </TouchableWithoutFeedback>
              ))}
            </Block>
          </Block>
        </Block>
      );
    } else {
      return (
        <Block>
          <Text>t</Text>
        </Block>
      );
    }
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  menuItems: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  menuItem: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  menuImage: {
    height: 45,
    width: 45,
  },
});
