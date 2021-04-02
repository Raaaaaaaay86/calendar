import { createStore } from 'vuex';
import calendarModal from '@/store/calendarModal';

export default createStore({
  state: {
    currentTimestamp: new Date().getTime(),
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
  modules: {
    namespaced: true,
    calendarModal,
  },
});
