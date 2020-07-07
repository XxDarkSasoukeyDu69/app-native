import axios from 'axios';
import {USER_TOKEN} from '../../constants/config';

export default {
  postImage: image => {
    return USER_TOKEN()
      .then(token => {
        return axios.post(
          'http://localhost:8000/api/image',
          {
            featured_image: image,
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
};
