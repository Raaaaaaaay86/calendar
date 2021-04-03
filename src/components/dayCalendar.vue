<template>
  <div ref="el" class="dayCalendar" :class="viewDay ? 'day' : 'week'">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div
      v-for="rv in reservations"
      class="reservation"
      :key="rv.timestamp + 'rv'"
      :style="decidePositon(rv)"
    >
      <span>
        {{ rv.topic }}
      </span>
    </div>
    <div
      v-for="time in workTime"
      :key="time+'work'"
      class="workTime"
      :style="decidePositon(time)"
    ></div>
  </div>
</template>

<script>
import {
  computed, ref,
} from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    viewDay: {
      type: Boolean,
      default: true,
    },
    timestamp: {
      type: Number,
      required: true,
      default: new Date(),
    },
    workTime: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    reservations: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const store = useStore();
    const currentWeek = computed(() => store.getters.currentWeek);
    const el = ref();
    // oneday 1440mins 86400sec
    // offsetHieght = 1920
    // oneMinHeight = 1920 / 1440mins = 1.33333

    const decidePositon = (range) => {
      const minutesOfDay = 1440;
      const oneMinHeight = +(1920 / minutesOfDay).toFixed(3);
      const millisecondsPerMin = 60000;
      const totalTimeByMinutes = (range.endAt - range.startAt) / millisecondsPerMin;
      const timeOffset = (range.startAt - props.timestamp) / millisecondsPerMin;

      return {
        height: `${totalTimeByMinutes * oneMinHeight}px`,
        top: `${timeOffset * oneMinHeight}px`,
      };
    };

    return {
      currentWeek,
      el,
      decidePositon,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.dayCalendar {
  grid-auto-rows: 5rem;
  display: grid;
  position: relative;
  > div {
    border-right: 1px solid #C0C0C0;;
    border-bottom: 1px solid #C0C0C0;;
  }
  &.day {
    grid-column: 2 / span 7;
  }
  &.week {
    grid-column: auto;
  }
}

.reservation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: .5rem;
  justify-content: center;
  align-items: flex-start;
  background-color: $secondary;
  border-radius: 9px;
  text-align: center;
  z-index: 20;
  box-sizing: border-box;
}

.workTime {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: rgba(229, 229, 229, .6);
  z-index: 10;
  box-sizing: border-box;
}
</style>
