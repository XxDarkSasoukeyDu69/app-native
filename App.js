import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, Text, Platform} from 'react-native';
import AuthNavigator from './navigation/AuthNavigator';
import MainNavigator from './navigation/MainNavigator';
import {setJSExceptionHandler} from 'react-native-exception-handler';
//import Echo from 'laravel-echo';
//import socketio from 'socket.io-client';
import {AsyncStorage} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

const PERSISTENCE_KEY = 'access_token';

/*const Echo = new Echo({
  host: 'http://127.0.0.1:6001',
  broadcaster: 'pusher',
  cluster: 'mt1',
  key: 'somekey',
  client: socketio,
  disableStats: true,
});*/

const App: () => React$Node = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingComplete, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleError = (error, isFatal) => {};

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255,255,255)',
    },
  };

  setJSExceptionHandler((error, isFatal) => {
    handleError(error, isFatal);
  }, true);

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        setUserData(await AsyncStorage.getItem(PERSISTENCE_KEY));
      } finally {
        if (userData) {
          setIsLoggedIn(true);
        }
        setIsLoading(true);
      }
    };
    restoreState();
  }, [userData]);

  if (isLoadingComplete === false) {
    return (
      <>
        <View>
          <Text>Hola je charge</Text>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <NavigationContainer theme={MyTheme}>
            {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
});

export default App;
