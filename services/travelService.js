import {AsyncStorage} from 'react-native';

export default {
  async setCountry(address_components) {
    address_components = JSON.parse(address_components);

    const item = {
      country: null,
      country_code: null,
    };

    if (
      address_components[address_components.length - 1].types[0] ===
      'postal_code'
    ) {
      (item.country =
        address_components[address_components.length - 2].long_name),
        (item.country_code =
          address_components[address_components.length - 2].short_name);
    } else {
      (item.country =
        address_components[address_components.length - 1].long_name),
        (item.country_code =
          address_components[address_components.length - 1].short_name);
    }

    try {
      await AsyncStorage.setItem('TRAVEL_EDIT', JSON.stringify(item));
    } catch (e) {
      alert('une erreur est survenue');
    }
  },
  async setDate(dateRange) {
    const date = {
      date_start: null,
      date_end: null,
    };

    date.date_start = Object.keys(dateRange)[0];
    date.date_end = Object.keys(dateRange)[Object.keys(dateRange).length - 1];
    try {
      const travel = JSON.parse(await AsyncStorage.getItem('TRAVEL_EDIT'));
      await AsyncStorage.setItem(
        'TRAVEL_EDIT',
        JSON.stringify(Object.assign(travel, date)),
      );
    } catch (e) {
      alert('une erreur est survenue');
    }
  },
  async setInformation(title, description) {
    try {
      const travel = JSON.parse(await AsyncStorage.getItem('TRAVEL_EDIT'));
      await AsyncStorage.setItem(
        'TRAVEL_EDIT',
        JSON.stringify(Object.assign(travel, {title, description})),
      );
    } catch (e) {
      alert('une erreur est survenue');
    }
  },
};
