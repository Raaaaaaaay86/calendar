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
    <div class="reservation" v-if="workTime.startAt"></div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
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
    onMounted(() => {
      if (props.workTime.startAt) {
        console.log(el.value.offsetHeight);
      }
    });

    return {
      currentWeek,
      el,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  height: 3rem;
  background-color: red;
}
</style>
