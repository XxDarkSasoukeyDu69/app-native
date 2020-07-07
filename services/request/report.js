import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {USER_TOKEN} from '../../constants/config';

export default {
  report_user: (user_id, array_item_report, poster_id) => {
    return USER_TOKEN()
      .then(token => {
        return axios.post(
          'http://localhost:8000/api/report/user',
          {
            user_id: user_id,
            array_item: array_item_report,
            poster_id: poster_id,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
      })
      .catch(e => {
        return e;
      });
  },
  report_errors: (title, description, poster_id) => {
    return USER_TOKEN()
      .then(token => {
        return axios.post(
          'http://localhost:8000/api/report/error',
          {
            title: title,
            description: description,
            poster_id: poster_id,
          },
          {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        );
      })
      .catch(e => {
        return e;
      });
  },
};
