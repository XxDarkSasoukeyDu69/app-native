import moment from 'moment';

export default {
  getRange: (stateValue, date) => {
    console.log('TEST :', Object.keys(stateValue)[0]);
    if (typeof stateValue === 'object' && !(stateValue instanceof Date)) {
      //if (Object.keys(stateValue).length > 0) {
      if (
        moment(moment(Object.keys(stateValue)[0]).format('YYYY-MM-DD')).isAfter(
          moment(moment(new Date(date.dateString)).format('YYYY-MM-DD')),
        )
      ) {
        return {
          [moment(date.dateString).format('YYYY-MM-DD')]: {
            disabled: true,
            startingDay: true,
            color: 'royalblue',
            endingDay: true,
          },
        };
      } else {
        var startDate = moment(Object.keys(stateValue)[0]).startOf('day');
        let dateRange = {
          [startDate.format('YYYY-MM-DD')]: {
            startingDay: true,
            color: 'royalblue',
          },
        };
        var lastDate = moment(date.dateString).startOf('day');

        while (startDate.add(1, 'days').diff(lastDate) < 0) {
          Object.assign(dateRange, {
            [startDate.format('YYYY-MM-DD')]: {
              disabled: true,
              color: 'royalblue',
            },
          });
        }

        Object.assign(dateRange, {
          [startDate.format('YYYY-MM-DD')]: {
            disabled: true,
            color: 'royalblue',
            endingDay: true,
          },
        });

        return dateRange;
      }
      // }
    } else {
      return {
        [moment(date.dateString).format('YYYY-MM-DD')]: {
          disabled: true,
          startingDay: true,
          color: 'royalblue',
          endingDay: true,
        },
      };
    }
  },
};
