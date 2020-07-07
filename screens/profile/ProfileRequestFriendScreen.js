import React, {Component} from 'react';
import {Block, Card, Text, Button} from '../../components';
import {theme} from '../../constants';
import {TouchableOpacity, Image, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {friend} from '../../services/request';
import HeaderRightSearch from '../../components/pages/profile/HeaderRightSearch';
import {array} from '../../utils';

export default class ProfileRequestFriendScreen extends Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      modalVisible: false,
    };
  }

  componentDidMount() {
    friend.getMyRequest().then(r => this.setState({requests: r.data.data}));
  }

  deleteRequest(request_id) {
    const {requests} = this.state;
    friend.deleteRequest(request_id).then(r =>
      this.setState({
        requests: array.deleteElementOfArray(requests, request_id),
      }),
    );
  }

  acceptRequest(request_id) {
    const {requests} = this.state;
    friend.acceptRequest(request_id).then(r =>
      this.setState({
        requests: array.deleteElementOfArray(requests, request_id),
      }),
    );
  }

  render() {
    const {requests} = this.state;
    const {navigation} = this.props;

    navigation.setOptions({
      headerRight: () => <HeaderRightSearch navigation={navigation} />,
    });

    return (
      <Block margin={[theme.sizes.base, theme.sizes.base * 2]}>
        <Text h1 bold>
          Demande reçue
        </Text>
        {requests.length > 0 ? (
          <ScrollView>
            <Block flex={false} space="between">
              {requests.map(req => (
                <Card shadow row>
                  <Block flex={false} margin={[0, 10]}>
                    <Image
                      source={require('../../assets/images/user.jpg')}
                      style={styles.image}
                    />
                  </Block>
                  <Block middle style={{width: 100}} margin={[0, 0, 0, 20]}>
                    <Text medium>
                      {req.firstname} {req.name}
                    </Text>
                  </Block>
                  <Block middle>
                    <Block flex={false} row right>
                      <TouchableOpacity
                        onPress={() => this.deleteRequest(req.id)}>
                        <Icon
                          name="remove"
                          color={theme.colors.accent}
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{marginLeft: 20}}
                        onPress={() => this.acceptRequest(req.id)}>
                        <Icon
                          name="check"
                          color={theme.colors.secondary}
                          size={20}
                        />
                      </TouchableOpacity>
                    </Block>
                  </Block>
                </Card>
              ))}
            </Block>
          </ScrollView>
        ) : (
          <Block middle center>
            <Block flex={false} center style={{width: 250}}>
              <Text center gray2 bold h1>
                Aucune demande d'amie
              </Text>
            </Block>
          </Block>
        )}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: theme.sizes.base * 3,
  },
});
