<template>
  <div>
    <div class="toolbar">
      <div>
        <small-datepicker :current-timestamp="currentTimestamp" />
        <v-select :items="['週檢視', '日檢視']" @select="changeView"></v-select>
        <v-select :items="['莉', '登出']"></v-select>
      </div>
      <div>
        <week-datepicker />
      </div>
    </div>
    <div class="calendarArea">
      <timeline />
      <day-calendar
        v-for="dateObject in dateObjects"
        :key="dateObject.timestamp"
        :view-day="viewByDay"
        :timestamp="dateObject.timestamp"
        :id="new Date(dateObject.timestamp).getTime() + 'calendar'"
        :work-time="workTimeMatch(dateObject.timestamp)"
        :reservations="reservationMatch(dateObject.timestamp)"
        :view-by-day="viewByDay"
      />
    </div>
    <div class="btnArea" v-if="!RvModalIsShow">
      <v-btn @click="openRvModal()">
        + 新增預約
      </v-btn>
    </div>
    <addRvModal v-if="RvModalIsShow"/>
  </div>
  <teleport to='#app'>
    <months-datepicker v-if="showCalendarModal"/>
  </teleport>
</template>

<script>
import {
  computed, watch, ref,
} from 'vue';
import { useStore } from 'vuex';
import timeline from '@/components/timeline.vue';
import vSelect from '@/components/v-select.vue';
import dayCalendar from '@/components/dayCalendar.vue';
import smallDatepicker from '@/components/smallDatepicker.vue';
import weekDatepicker from '@/components/weekDatepicker.vue';
import monthsDatepicker from '@/components/monthsDatepicker.vue';
import VBtn from '@/components/v-btn.vue';
import addRvModal from '@/components/addRvModal.vue';

export default {
  name: 'App',
  components: {
    vSelect,
    dayCalendar,
    smallDatepicker,
    weekDatepicker,
    timeline,
    monthsDatepicker,
    VBtn,
    addRvModal,
  },
  setup() {
    const store = useStore();
    const showCalendarModal = computed(() => store.state.calendarModal.showModal);
    const currentTimestamp = computed(() => store.state.currentTimestamp);
    const currentWeek = computed(() => store.getters.currentWeek);
    const userData = computed(() => store.state.userData);
    const viewByDay = ref(false);
    const dateObjects = ref(JSON.parse(JSON.stringify(currentWeek.value)));

    // Get Localstorage to initialize data. Set items to Localstorage if it's first time opened.
    const localStorageData = JSON.parse(localStorage.getItem('calendarData'));

    if (localStorageData === null) {
      const structure = {
        reservations: {},
        workTimes: {},
      };
      localStorage.setItem('calendarData', JSON.stringify(structure));
      store.commit('INITIALIZE_DATA', JSON.parse(localStorage.getItem('calendarData')));
    } else {
      store.commit('INITIALIZE_DATA', localStorageData);
    }
    //

    // Switch inpecting mode
    const changeView = (newView) => {
      const date = new Date(currentTimestamp.value);

      switch (newView) {
        case '日檢視':
          viewByDay.value = true;
          dateObjects.value.length = 1;

          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);

          dateObjects.value[0] = currentWeek.value[
            currentWeek.value.findIndex((dateInfo) => dateInfo.timestamp === date.getTime())
          ];
          break;
        case '週檢視':
          viewByDay.value = false;
          dateObjects.value = JSON.parse(JSON.stringify(currentWeek.value));
          break;
        default:
          break;
      }
    };
    //

    // Re-render calendar if currentTimestamp or userDate has changed.
    watch([currentTimestamp, userData], ([newTimestamp]) => {
      const date = new Date(newTimestamp);

      switch (viewByDay.value) {
        case true:
          viewByDay.value = true;
          dateObjects.value.length = 1;

          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);

          dateObjects.value[0] = currentWeek.value[
            currentWeek.value.findIndex((dateInfo) => dateInfo.timestamp === date.getTime())
          ];
          break;
        case false:
          viewByDay.value = false;
          dateObjects.value = JSON.parse(JSON.stringify(currentWeek.value));
          break;
        default:
          break;
      }
    }, { deep: true });
    //

    // Pass data to component's prop if timestamp is matched.
    const workTimeMatch = (dateTimestamp) => {
      const hasRecord = Object.prototype.hasOwnProperty.call(userData.value.workTimes, dateTimestamp);
      if (hasRecord) return userData.value.workTimes[dateTimestamp].times;
      return {};
    };

    const reservationMatch = (dateTimestamp) => {
      const hasRecord = Object.prototype.hasOwnProperty.call(userData.value.reservations, dateTimestamp);
      if (hasRecord) return userData.value.reservations[dateTimestamp].rv;
      return {};
    };
    //

    const RvModalIsShow = computed(() => store.state.addRvModal.showModal);
    const openRvModal = () => {
      store.commit('addRvModal/OPEN');
    };

    return {
      showCalendarModal,
      currentTimestamp,
      changeView,
      dateObjects,
      viewByDay,
      currentWeek,
      userData,
      workTimeMatch,
      reservationMatch,
      openRvModal,
      RvModalIsShow,
    };
  },
};

</script>

<style lang="scss">
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: .5rem 0rem 1rem 0rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  background-color: #fff;
  z-index: 900;
  > div:first-of-type {
    display: flex;
  }
  > div:nth-of-type(2) {
    margin-top: 1.5em;
    display: flex;
  }
}

@media (min-width: 576px) {
  // .toolbar {
  //   > div:first-of-type {
  //     margin: 0 7%;
  //   }
  // }
  .datepicker--small {
    margin-left: 8% !important;
  }
  .select:last-of-type {
    margin-right: 8%;
  }
}

.calendarArea {
  z-index: -1;
  padding-top: 140px;
  height: calc(100vh - 140px);
  overflow: scroll;
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
  &::-webkit-scrollbar {
    display: none;
  }
}

.btnArea {
  position: fixed;
  height: 5rem;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: linear-gradient(0deg, #fff, transparent);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
