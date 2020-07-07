import axios from 'axios';
import {USER_TOKEN} from '../../constants/config';

export default {
  getContries: id_world => {
    return USER_TOKEN()
      .then(token => {
        return axios.get('http://localhost:8000/api/world/travel/' + id_world, {
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
  getTravels: (id_world, country_code) => {
    return USER_TOKEN().then(token => {
      return axios
        .get(
          'http://localhost:8000/api/world/country/travel/' +
            id_world +
            '/' +
            country_code,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .catch(e => {
          return e;
        });
    });
  },
  getHotpointCountries: travel_id => {
    return USER_TOKEN()
      .then(token => {
        return axios.get(
          'http://localhost:8000/api/world/travel/hotpointCountry/' + travel_id,
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
  getHotpointsCities: hotpointCountryId => {
    return USER_TOKEN().then(token => {
      return axios.get(
        'http://localhost:8000/api/world/travel/countries/' + hotpointCountryId,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
    });
  },
};
