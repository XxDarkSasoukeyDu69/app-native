import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {USER_TOKEN} from '../../constants/config';

export default {
  saveTravel: () => {
    Promise.all([AsyncStorage.getItem('TRAVEL_EDIT'), USER_TOKEN()])
      .then(([response, token]) => {
        console.log(response, token);
        axios
          .post('http://127.0.0.1:8000/api/travel', response, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .catch(e => console.log(e));
      })
      .catch(e => alert('Une erreur est survenue'));
  },
  getMyTravel: world_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.get('http://127.0.0.1:8000/api/travel/' + world_id, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .catch(e => {
        return e;
      });
  },
  deleteTravel: travelId => {
    return USER_TOKEN()
      .then(token => {
        return axios.delete('http://localhost:8000/api/travel/' + travelId, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .catch(e => {
        return e;
      });
  },
};
