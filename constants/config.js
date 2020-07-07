import {AsyncStorage} from 'react-native';

/*const PUSHER_CONFIG = {
  appId: 'SOME_APP_ID',
  key: 'SOME_APP_KEY',
  secret: 'SOME_APP_SECRET',
  cluster: 'SOME_CLUSTER',
  encrypted: true,
  restServer: 'http://192.168.0.15:4000',
};*/

const BASE_URL = 'https://localhost:8000/';

const USER_TOKEN = async () => {
  return await AsyncStorage.getItem('access_token');
};

export {/*PUSHER_CONFIG,*/ BASE_URL, USER_TOKEN};
