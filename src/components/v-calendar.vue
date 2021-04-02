<template>
    <div class="calendar__monthTopic" v-if="showMonth">
      {{ dateInfo.year }} / {{ dateInfo.month}}
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
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import convertTimeStamp from '@/hooks/convertTimeStamp';

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
    const dateArray = reactive(new Array(35).fill(null));
    const currentTimestamp = ref(props.currentTimestamp);
    const dateInfo = reactive(convertTimeStamp(currentTimestamp.value));
    const lastDateOfMonth = new Date(dateInfo.year, dateInfo.month, 0);
    const weekDayOfFirstDate = new Date(dateInfo.year, dateInfo.month - 1, 1).getDay();
    const lastDateOfLastMonth = new Date(dateInfo.year, dateInfo.month - 1, 0).getDate();

    for (let i = 0, dateCounter = 1; i < 35; i += 1) {
      if (i > weekDayOfFirstDate - 2 && dateCounter <= lastDateOfMonth.getDate()) {
        dateArray[i] = {
          date: dateCounter,
          timestamp: new Date(dateInfo.year, lastDateOfMonth.getMonth(), dateCounter).getTime(),
        };
        dateCounter += 1;
      }
    }

    (function prevAndNextDates() {
      const tempAry = [];

      for (let i = 0, dateCounter = lastDateOfLastMonth; i < dateArray.length; i += 1) {
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
    }());

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

    return {
      dateArray,
      dateInfo,
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
  font-size: .5rem;
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
