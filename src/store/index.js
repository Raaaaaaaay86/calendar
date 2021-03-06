import { createStore } from 'vuex';
import calendarModal from '@/store/calendarModal';
import addRvModal from '@/store/addRvModal';

export default createStore({
  state: {
    currentTimestamp: new Date().getTime(),
    userData: {},
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
          dayAlias = '(???)';
          break;
        case 1:
          dayAlias = '(???)';
          break;
        case 2:
          dayAlias = '(???)';
          break;
        case 3:
          dayAlias = '(???)';
          break;
        case 4:
          dayAlias = '(???)';
          break;
        case 5:
          dayAlias = '(???)';
          break;
        case 6:
          dayAlias = '(???)';
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
