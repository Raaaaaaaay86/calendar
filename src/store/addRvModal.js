const calendarModal = {
  namespaced: true,
  state: () => ({
    showModal: false,
    tempData: {},
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
  },
  getters: {
  },
};

export default calendarModal;
