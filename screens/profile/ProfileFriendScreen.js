import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Block, Text, Input, Card} from '../../components';
import {theme} from '../../constants';
import {friend} from '../../services/request';

const {width} = Dimensions.get('window');

export default class ProfileFriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFocus: new Animated.Value(0.6),
      searchString: null,
      friends: [],
      data: [],
    };
  }

  componentDidMount() {
    friend
      .getMyFriend()
      .then(r => this.setState({friends: r.data.data, data: r.data.data}));
  }

  handleSearchFocus(status) {
    Animated.timing(this.state.searchFocus, {
      toValue: status ? 0.8 : 0.6, // status === true, increase flex size
      duration: 150, // ms
    }).start();
  }

  filterFriend(text) {
    const formatQuery = text.toLowerCase();
    const friends = this.state.data.filter(user => {
      return (
        user.name.toLowerCase().includes(formatQuery) ||
        user.firstname.toLowerCase().includes(formatQuery)
      );
    });
    this.setState({searchString: text, friends});
  }

  renderExplorer() {
    const {navigation} = this.props;
    return (
      <Block flex={false} row style={styles.profileItems}>
        {this.state.friends.map(item => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfileScreen', {
                visitor: true,
                user_id: item.user_id,
              })
            }>
            <Card
              shadow
              flex={false}
              center
              key={item.id}
              style={styles.profileItem}>
              <Image
                source={require('../../assets/images/user.jpg')}
                style={styles.profileImage}
              />
              <Text center h3 semibold>
                {item.firstname} {item.name}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </Block>
    );
  }

  renderSearch() {
    const {searchString, searchFocus} = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={text => this.filterFriend(text)}
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
    );
  }

  render() {
    return (
      <Block>
        <Block
          margin={[theme.sizes.base, 0, 0]}
          flex={false}
          row
          center
          space="between"
          style={styles.header}>
          <Text h1 bold>
            Mes amis
          </Text>
          {this.renderSearch()}
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderExplorer()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: theme.sizes.caption,
    height: theme.sizes.base * 2,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingLeft: theme.sizes.base / 1.333,
    paddingRight: theme.sizes.base * 1.5,
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
  profileItems: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  profileItem: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base * 2) / 2,
    height: (width - theme.sizes.padding * 2.4 - theme.sizes.base * 2) / 2,
    minHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base * 2) / 2,
    marginBottom: 10,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 60,
    marginBottom: 10,
  },
});
