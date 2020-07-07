import axios from 'axios';
import {USER_TOKEN} from '../../constants/config';

/**/

export default {
  getMyFriend: () => {
    return USER_TOKEN()
      .then(token => {
        return axios.get('http://localhost:8000/api/getFriend/', {
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
  getMyRequest: () => {
    return USER_TOKEN()
      .then(token => {
        return axios.get('http://localhost:8000/api/myRequestFriend/', {
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
  getStateRelation: contact_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.get('http://localhost:8000/api/friend/' + contact_id, {
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
  postRequest: contact_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.post(
          'http://localhost:8000/api/friend',
          {
            contact_id: contact_id,
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
        console.log(e);
        return e;
      });
  },
  searchFriend: (user_id, search) => {
    return USER_TOKEN()
      .then(token => {
        return axios.get(
          'http://localhost:8000/api/friend/search/' + user_id + '/' + search,
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
  acceptRequest: request_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.put(
          'http://127.0.0.1:8000/api/friend/' + request_id,
          {},
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
        console.log(e);
        return e;
      });
  },
  deleteFriend: user_id => {
    console.log(user_id);
    return USER_TOKEN()
      .then(token => {
        return axios.delete('http://localhost:8000/api/friend/' + user_id, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  },
  deleteRequest: request_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.delete('' + '' + request_id, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  },
};
