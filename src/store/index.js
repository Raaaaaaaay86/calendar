import { createStore } from 'vuex';
import calendarModal from '@/store/calendarModal';
import addRvModal from '@/store/addRvModal';

export default createStore({
  state: {
    currentTimestamp: new Date().getTime(),
    userData: {},
    // userData: {
    //   reservations: {
    //     1617465600000: {
    //       rv: [
    //         {
    //           topic: '美甲保養',
    //           startAt: new Date(2021, 3, 4, 12, 30).getTime(),
    //           endAt: new Date(2021, 3, 4, 14).getTime(),
    //         },
    //         {
    //           topic: '持久霧眉',
    //           startAt: new Date(2021, 3, 4, 15).getTime(),
    //           endAt: new Date(2021, 3, 4, 16).getTime(),
    //         },
    //       ],
    //     },
    //     1617292800000: {
    //       rv: [
    //         {
    //           topic: '美甲保養',
    //           customer: 'Ash',
    //           memberLevel: 1,
    //           startAt: new Date(2021, 3, 2, 3, 20).getTime(),
    //           endAt: new Date(2021, 3, 2, 5).getTime(),
    //         },
    //         {
    //           topic: '持久霧眉',
    //           customer: 'Sammy',
    //           memberLevel: 3,
    //           startAt: new Date(2021, 3, 2, 10).getTime(),
    //           endAt: new Date(2021, 3, 2, 12).getTime(),
    //         },
    //       ],
    //     },
    //   },
    //   workTimes: {
    //     1617465600000: {
    //       times: [
    //         {
    //           startAt: new Date(2021, 3, 4, 9).getTime(),
    //           endAt: new Date(2021, 3, 4, 19).getTime(),
    //         },
    //       ],
    //     },
    //   },
    // },
  },
  actions: {
  },
  mutations: {
    SET_NEW_TIME_BY_TEMP(state) {
      state.currentTimestamp = state.calendarModal.tempSelectedDate;
      // console.log('new currentTimestamp: ', state.currentTimestamp, new Date(state.currentTimestamp));
    },
    SET_NEW_TIME(state, { timestamp }) {
      state.currentTimestamp = timestamp;
      // console.log('new currentTimestamp: ', state.currentTimestamp, new Date(state.currentTimestamp));
    },
    INITIALIZE_DATA(state, localStorageData) {
      state.userData = localStorageData;
    },
    ADD_RV(state, { rvData, rvType }) {
      console.log('vuex', rvType);

      switch (rvType) {
        case 'workTimes':
          if (!state.userData.workTimes[rvData.timestamp]?.times) {
            state.userData.workTimes[rvData.timestamp] = {
              times: [],
            };
          }

          state.userData.workTimes[rvData.timestamp].times.push({
            startAt: rvData.startAt,
            endAt: rvData.endAt,
          });
          break;
        case 'reservations':
          if (!state.userData.reservations[rvData.timestamp]?.rv) {
            state.userData.reservations[rvData.timestamp] = {
              rv: [],
            };
          }

          state.userData.reservations[rvData.timestamp].rv.push(rvData);
          break;
        default:
          break;
      }

      localStorage.setItem('calendarData', JSON.stringify(state.userData));
    },
  },
  getters: {
    currentWeek(state) {
      const d = new Date(state.currentTimestamp);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);

      const weekArray = new Array(7);

      for (let i = 0; i < weekArray.length; i += 1) {
        const tempDate = new Date(
          new Date(state.currentTimestamp).setDate(diff + i),
        );

        tempDate.setHours(0);
        tempDate.setMinutes(0);
        tempDate.setSeconds(0);
        tempDate.setMilliseconds(0);

        weekArray[i] = {
          date: tempDate.getDate(),
          timestamp: tempDate.getTime(),
        };
      }

      return weekArray;
    },
    fullDate(state) {
      const year = new Date(state.currentTimestamp).getFullYear();
      const month = new Date(state.currentTimestamp).getMonth() + 1;
      const date = new Date(state.currentTimestamp).getDate();
      const day = new Date(state.currentTimestamp).getDay();

      let dayAlias;
      switch (day) {
        case 0:
          dayAlias = '(日)';
          break;
        case 1:
          dayAlias = '(一)';
          break;
        case 2:
          dayAlias = '(二)';
          break;
        case 3:
          dayAlias = '(三)';
          break;
        case 4:
          dayAlias = '(四)';
          break;
        case 5:
          dayAlias = '(五)';
          break;
        case 6:
          dayAlias = '(六)';
          break;
        default:
          break;
      }

      return `${year}-${month}-${date} ${dayAlias}`;
    },
  },
  modules: {
    namespaced: true,
    calendarModal,
    addRvModal,
  },
});
