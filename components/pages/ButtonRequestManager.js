import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../../constants';
import {friend} from '../../services/request';

export default class ButtonRequestManager extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  sendRequestFriend() {
    friend
      .postRequest(this.props.user_id)
      .then(r => this.setState({is_accept: false}));
  }

  componentDidMount() {
    this.setState({is_accept: this.props.is_accept});
  }

  removeFriend() {
    Alert.alert(
      'Attention',
      'Voulez vous vraiment supprimer cette utilisateur de vos amis ?',
      [
        {
          text: 'non',
        },
        {
          text: 'Oui',
          onPress: () => {
            friend
              .deleteFriend(this.props.user_id)
              .then(r => this.setState({is_accept: 'none'}));
          },
        },
      ],
      {cancelable: true},
    );
  }

  removeRequest() {
    friend
      .deleteFriend(this.props.user_id)
      .then(r => this.setState({is_accept: 'none'}));
  }

  render() {
    const {is_accept} = this.state;
    //const {is_accept2} = this.state;
    const {size} = this.props;

    if (is_accept === true) {
      return (
        <TouchableOpacity onPress={() => this.removeFriend()}>
          <Icon name="user-check" size={size} color={theme.colors.royalblue} />
        </TouchableOpacity>
      );
    } else if (is_accept === false) {
      return (
        <TouchableOpacity onPress={() => this.removeRequest()}>
          <Icon name="user-minus" size={size} color={theme.colors.orange} />
        </TouchableOpacity>
      );
    } else if (is_accept === 'none') {
      return (
        <TouchableOpacity onPress={() => this.sendRequestFriend()}>
          <Icon name="user-plus" size={size} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}
