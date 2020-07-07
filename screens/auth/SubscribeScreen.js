import React, {Component} from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {Button, Block, Input, Text} from '../../components';
import {theme} from '../../constants';
import {user} from '../../services/request';

export default class SubscribeScreen extends Component {
  state = {
    email: null,
    lastname: null,
    firstname: null,
    password: null,
    errors: [],
    loading: false,
  };

  async handleSignUp() {
    const {navigation} = this.props;
    const {email, firstname, lastname, password} = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({loading: true});

    // check with backend API or with some static data
    if (!email) {
      errors.push('email');
    }
    if (!firstname) {
      errors.push('fistname');
    }
    if (!lastname) {
      errors.push('lastname');
    }
    if (!password) {
      errors.push('password');
    }

    this.setState({errors, loading: false});

    if (!errors.length) {
      var register = await user.register(lastname, firstname, email, password);
      console.log(register)
      if (register.status === 200) {
        Alert.alert(
          'Success!',
          'Your account has been created',
          [
            {
              text: 'Continue',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  }

  render() {
    const {navigation} = this.props;
    const {loading, errors} = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block flex={false} padding={[0, theme.sizes.base * 2]}>
          <Block flex={false} margin={[0, 0, 20, 0]}>
            <Text h0 bold>
              Sign up
            </Text>
          </Block>
          <Block flex={false} middle>
            <Input
              label="Firstname"
              error={hasErrors('firstname')}
              style={[styles.input, hasErrors('firstname')]}
              defaultValue={this.state.firstname}
              onChangeText={text => this.setState({firstname: text})}
            />
            <Input
              label="Lastname"
              error={hasErrors('lastname')}
              style={[styles.input, hasErrors('lastname')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({lastname: text})}
            />
            <Input
              email
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
              onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>

            <Button
              style={{paddingTop: 20}}
              onPress={() => navigation.navigate('Login')}>
              <Text
                gray
                caption
                center
                style={{textDecorationLine: 'underline'}}>
                Retour vers le login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
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
