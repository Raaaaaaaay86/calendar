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
      :class="viewByDay ? 'view--day' : '' "
      :key="rv.timestamp + 'rv'"
      :style="decidePositon(rv)"
    >
      <p class="reservation__topic">
        {{ rv.topic }}
      </p>
      <p class="reservation__customer" v-if="viewByDay">
        {{ rv.customer }}
      </p>
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
    viewByDay: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const currentWeek = computed(() => store.getters.currentWeek);
    const el = ref();

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
  padding: .5rem;
  box-sizing: border-box;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  background-color: rgba(214, 214, 214, .7);
  border-radius: 9px;
  z-index: 20;
  line-height: 1rem;
  letter-spacing: .5px;

  &__customer {
    color: rgba(0, 0, 0, .5);
  }
}

.view {
  &--day {
    justify-content: flex-start;
    flex-direction: column;
    line-height: 1.5rem;
  }
}

@media (min-width: 576px) {
  .reservation, .view--day {
    line-height: 2rem;

    &__topic, &__customer {
      font-size: 1.5rem;
    }
  }
}

.workTime {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: rgba(232, 232, 232, .7);
  z-index: 10;
  box-sizing: border-box;
}
</style>
