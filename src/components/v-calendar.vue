<template>
    <div class="calendar__monthTopic" v-if="showMonth">
      {{ new Date(currentTimestamp).getFullYear() }} / {{ new Date(currentTimestamp).getMonth() + 1 }}
    </div>
    <div class="calendar">
      <div
        v-for="(dateInfo, index) in dateArray"
        :key="new Date(dateInfo)"
        :class="[prevOrNext(dateInfo, index, dateArray), isSelected(dateInfo.timestamp)]"
        @click="select(dateInfo.timestamp)"
      >
        {{ dateInfo.date }}
      </div>
    </div>
</template>

<script>
import {
  reactive,
  computed,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    showMonth: {
      type: Boolean,
      required: false,
      default: true,
    },
    currentTimestamp: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const dateArray = reactive(new Array(36).fill(null));
    const lastDateOfMonth = ref(new Date(new Date(props.currentTimestamp).getFullYear(), new Date(props.currentTimestamp).getMonth(), 0));
    const weekDayOfFirstDate = ref(new Date(new Date(props.currentTimestamp).getFullYear(), new Date(props.currentTimestamp).getMonth(), 1).getDay());
    const lastDateOfLastMonth = ref(new Date(new Date(props.currentTimestamp).getFullYear(), new Date(props.currentTimestamp).getMonth(), 0).getDate());

    const renderCalendar = () => {
      for (let i = 0, dateCounter = 1; i < 36; i += 1) {
        if (i > weekDayOfFirstDate.value - 2 && dateCounter <= lastDateOfMonth.value.getDate()) {
          dateArray[i] = {
            date: dateCounter,
            timestamp: new Date(new Date(props.currentTimestamp).getFullYear(), lastDateOfMonth.value.getMonth() + 1, dateCounter).getTime(),
          };
          dateCounter += 1;
        }
      }

      const tempAry = [];

      for (let i = 0, dateCounter = lastDateOfLastMonth.value; i < dateArray.length; i += 1) {
        if (dateArray[i]) break;
        tempAry.unshift(dateCounter);
        dateCounter -= 1;
      }

      for (let i = 0; i < dateArray.length; i += 1) {
        if (dateArray[i]) break;
        dateArray[i] = {
          date: tempAry[i],
        };
      }

      for (let i = 0, dateCounter = 1; i < dateArray.length; i += 1) {
        if (dateArray[i] === null) {
          dateArray[i] = {
            date: dateCounter,
          };
          dateCounter += 1;
        }
      }
    };

    renderCalendar();

    const prevOrNext = (date, index) => {
      if (!dateArray[index].timestamp) {
        return 'disabled';
      }
      return undefined;
    };

    const tempSelectedDate = computed(() => store.state.calendarModal.tempSelectedDate);

    const select = (newTs) => {
      if (!newTs) return;
      store.commit('calendarModal/SELECT_NEW_DAY', { timestamp: newTs });
    };

    const isSelected = (ts) => {
      if (ts !== tempSelectedDate.value || ts === undefined) {
        return undefined;
      }

      return 'selected';
    };

    watch(() => props.currentTimestamp, (newTs) => {
      lastDateOfMonth.value = new Date(new Date(newTs).getFullYear(), new Date(props.currentTimestamp).getMonth(), 0);
      weekDayOfFirstDate.value = new Date(new Date(newTs).getFullYear(), new Date(newTs).getMonth(), 1).getDay();
      lastDateOfLastMonth.value = new Date(new Date(newTs).getFullYear(), new Date(newTs).getMonth(), 0).getDate();
      dateArray.fill(null);
      renderCalendar();
    });

    return {
      dateArray,
      prevOrNext,
      isSelected,
      tempSelectedDate,
      select,
      lastDateOfMonth,
      weekDayOfFirstDate,
      lastDateOfLastMonth,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.calendar {
  display: grid;
  grid-template-columns: repeat(7 , 1fr);
  grid-auto-rows: 2rem;
  margin-top: 1.5rem;
  justify-items: center;
  align-items: center;
  font-size: 1rem;
  color: #767676;
  &:last-of-type {
    margin-top: 0;
  }
  > div {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected {
      color: white;
      background-color: $primary;
    }
    &.disabled {
      color: #e5e5e5;
    }
  }
  &__monthTopic {
    text-align: center;
    margin: 1rem 0;
  }
}
</style>
