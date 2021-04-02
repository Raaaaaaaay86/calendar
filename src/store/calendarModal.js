const calendarModal = {
  namespaced: true,
  state: () => ({
    showModal: true,
    tempSelectedDate: 0,
  }),
  actions: {

  },
  mutations: {
    CLOSE(state) {
      state.showModal = false;
    },
    OPEN(state) {
      state.showModal = true;
    },
    SELECT_NEW_DAY(state, { timestamp }) {
      state.tempSelectedDate = timestamp;
    },
  },
  getters: {
  },
};

export default calendarModal;
