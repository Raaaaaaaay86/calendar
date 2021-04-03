<template>
  <div>
    <div class="toolbar">
      <div>
        <small-datepicker :current-timestamp="currentTimestamp" />
        <v-select :items="['週檢視', '日檢視']" @select="changeView"></v-select>
        <v-select :items="['莉', '登出']"></v-select>
        <!-- <v-user-info /> -->
      </div>
      <div>
        <week-datepicker />
      </div>
    </div>
    <div class="calendarArea">
      <timeline />
      <day-calendar v-for="i in calendarNum" :key="i" :view-day="viewByDay"/>
    </div>
  </div>
  <teleport to='#app'>
    <months-datepicker v-if="showCalendarModal"/>
  </teleport>
</template>

<script>
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import timeline from '@/components/timeline.vue';
import vSelect from '@/components/v-select.vue';
import dayCalendar from '@/components/dayCalendar.vue';
import smallDatepicker from '@/components/smallDatepicker.vue';
import weekDatepicker from '@/components/weekDatepicker.vue';
import monthsDatepicker from '@/components/monthsDatepicker.vue';

export default {
  name: 'App',
  components: {
    vSelect,
    dayCalendar,
    smallDatepicker,
    weekDatepicker,
    timeline,
    monthsDatepicker,
  },
  setup() {
    const store = useStore();
    const showCalendarModal = computed(() => store.state.calendarModal.showModal);
    const currentTimestamp = computed(() => store.state.currentTimestamp);
    const calendarNum = ref(7);
    const viewByDay = ref(false);

    watch(showCalendarModal, (newValue) => {
      const body = document.querySelector('body');

      if (newValue) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'auto';
      }
    });

    const changeView = (newView) => {
      switch (newView) {
        case '日檢視':
          calendarNum.value = 1;
          viewByDay.value = true;
          break;
        case '週檢視':
          calendarNum.value = 7;
          viewByDay.value = false;
          break;
        default:
          break;
      }
    };

    return {
      showCalendarModal,
      currentTimestamp,
      changeView,
      calendarNum,
      viewByDay,
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

.calendarArea {
  z-index: -1;
  padding-top: 128px;
  // overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
}

</style>
