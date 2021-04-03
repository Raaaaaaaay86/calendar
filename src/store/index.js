import { createStore } from 'vuex';
import calendarModal from '@/store/calendarModal';

export default createStore({
  state: {
    currentTimestamp: new Date().getTime(),
    userData: {
      reservations: {
        1617465600000: {
          reservations: [
            {
              topic: '美甲保養',
              customer: 'Ash',
              memberLevel: 1,
              startAt: new Date(2021, 3, 4, 12).getTime(),
              endAt: new Date(2021, 3, 4, 14).getTime(),
            },
            {
              topic: '持久霧眉',
              customer: 'Sammy',
              memberLevel: 3,
              startAt: new Date(2021, 3, 4, 12).getTime(),
              endAt: new Date(2021, 3, 4, 14).getTime(),
            },
          ],
        },
      },
      workTimes: {
        1617465600000: {
          startAt: new Date(2021, 3, 4, 9).getTime(),
          endAt: new Date(2021, 3, 4, 19).getTime(),
        },
      },
    },
  },
  actions: {
  },
  mutations: {
    SET_NEW_TIME_BY_TEMP(state) {
      state.currentTimestamp = state.calendarModal.tempSelectedDate;
      console.log('new currentTimestamp: ', state.currentTimestamp, new Date(state.currentTimestamp));
    },
    SET_NEW_TIME(state, { timestamp }) {
      state.currentTimestamp = timestamp;
      console.log('new currentTimestamp: ', state.currentTimestamp, new Date(state.currentTimestamp));
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
  },
  modules: {
    namespaced: true,
    calendarModal,
  },
});
