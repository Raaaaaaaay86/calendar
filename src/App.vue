<template>
  <div>
    <div class="toolbar">
      <div>
        <small-datepicker />
        <v-select :items="['週檢視', '日檢視']"></v-select>
        <v-user-info />
      </div>
      <div>
        <week-datepicker />
      </div>
    </div>
    <div class="calendarArea inspect--day">
      <timeline />
      <day-calendar />
      <day-calendar />
      <day-calendar />
      <day-calendar />
      <day-calendar />
      <day-calendar />
      <day-calendar />
    </div>
  </div>
</template>

<script>
import timeline from '@/components/timeline.vue';
import vSelect from '@/components/v-select.vue';
import vUserInfo from '@/components/v-userInfo.vue';
import dayCalendar from '@/components/dayCalendar.vue';
import smallDatepicker from '@/components/smallDatepicker.vue';
import weekDatepicker from '@/components/weekDatepicker.vue';

export default {
  name: 'App',
  components: {
    vSelect,
    vUserInfo,
    dayCalendar,
    smallDatepicker,
    weekDatepicker,
    timeline,
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
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
}

</style>
