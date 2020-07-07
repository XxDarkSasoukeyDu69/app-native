import React, {Component} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {Button, Block, Input, Text} from '../../components';
import {AsyncStorage} from 'react-native';
import {theme} from '../../constants';
import {user} from '../../services/request';

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  };

  async handleLogin() {
    const {navigation} = this.props;
    const {email, password} = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({loading: true});

    // check with backend API or with some static data and make fetch request
    if (!email) {
      errors.push('email');
    }
    if (!password) {
      errors.push('password');
    }

    this.setState({errors, loading: false});

    if (!errors.length) {
      var login = await user.login(email, password);
      if (login.status === 200) {
        try {
          await AsyncStorage.setItem('access_token', login.data.access_token);
          user.infoUser().then(resp => {
            AsyncStorage.setItem('user', JSON.stringify(resp)).then(() => {
              navigation.navigate('MainNavigator', {
                screen: 'ProfileNavigator',
              });
            });
          });
        } catch (e) {
          alert('une erreur est survenue');
        }
      }
    }
  }

  render() {
    const {navigation} = this.props;
    const {loading, errors} = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block flex={false} padding={[0, theme.sizes.base * 2]}>
          <Block flex={false} margin={[0, 0, 20, 0]}>
            <Text h0 bold>
              Login
            </Text>
          </Block>
          <Block flex={false} middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({password: text})}
            />
            <Button
              gradient
              rounded={50}
              height={50}
              onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>
            <Button
              style={{paddingTop: 20}}
              onPress={() => navigation.navigate('Register')}>
              <Text
                gray
                caption
                center
                style={{textDecorationLine: 'underline'}}>
                Pas encore de compte ?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
