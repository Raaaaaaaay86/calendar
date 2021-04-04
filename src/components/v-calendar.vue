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
  watch,
  ref,
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

    const renderCalendar = () => {
      const date = new Date(props.currentTimestamp);
      date.setDate(1);

      const lastDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      ).getDate();

      const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0,
      ).getDate();

      const firstDayIndex = date.getDay() - 1;

      const nextFirstDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1,
      ).getDate();

      // Render previous month dates
      for (let i = firstDayIndex, j = prevLastDay; i >= 0; i -= 1, j -= 1) {
        if (i - 1 >= 0) {
          dateArray[i - 1] = {
            date: j,
          };
        }
      }

      // Render current month dates
      for (let i = firstDayIndex, j = date.getDate(); i < lastDate + firstDayIndex; i += 1, j += 1) {
        const d = new Date(props.currentTimestamp);
        dateArray[i] = {
          date: j,
          timestamp: new Date(d.setDate(j)).getTime(),
        };
      }

      // Render rest of dates of next month
      for (let i = 0, j = nextFirstDate; i < dateArray.length; i += 1) {
        if (dateArray[i] === null) {
          dateArray[i] = {
            date: j,
          };
          j += 1;
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

    watch(() => props.currentTimestamp, () => {
      dateArray.fill(null);
      renderCalendar();
    });

    return {
      dateArray,
      prevOrNext,
      isSelected,
      tempSelectedDate,
      select,
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
    user-select: none;
    cursor: pointer;
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
    user-select: none;
  }
}
</style>
