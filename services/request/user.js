import axios from 'axios';
import {USER_TOKEN} from '../../constants/config';

const user = {
  login: function(email, password) {
    return axios
      .post(
        'http://127.0.0.1:8000/api/login/',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        return response;
      });
  },
  register: function(name, firstname, email, password) {
    return axios
      .post(
        'http://127.0.0.1:8000/api/register/',
        {
          name: name,
          firstname: firstname,
          email: email,
          password: password,
          password_confirmation: password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        return response;
      });
  },
  infoUser: function() {
    return Promise.all([USER_TOKEN()]).then(([token]) => {
      return axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    });
  },
  searchUser: function(text) {
    return Promise.all([USER_TOKEN()]).then(([token]) => {
      return axios.get('http://127.0.0.1:8000/api/users/searchByTxt/' + text, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    });
  },
  getUserDetail: user_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.get('http://localhost:8000/api/users/details/' + user_id, {
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
export default user;
