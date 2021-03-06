<template>
<div class="weekDatepicker">
  <v-icon class="icon--calendar" @click="openCalendarModal()">
    <i class="far fa-calendar"></i>
  </v-icon>
  <div
    class="weekDatepicker__date"
    v-for="{ date, dayAlias, timestamp } in weekArray"
    :key="`${date}${dayAlias}`"
    :class="isSelected(timestamp)"
    @click="select(timestamp)"
  >
    <p>{{ dayAlias }}</p>
    <p>{{ date }}</p>
  </div>
</div>
</template>

<script>
import vIcon from '@/components/v-icon.vue';
import { useStore } from 'vuex';
import { computed, reactive, watch } from 'vue';

export default {
  components: {
    vIcon,
  },
  setup() {
    const store = useStore();
    const currentTimestamp = computed(() => store.state.currentTimestamp);
    const weekArray = reactive(new Array(7));

    const updateWeek = () => {
      const d = new Date(currentTimestamp.value);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // diff of current date and Monday of the week
      const alias = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

      // Render from first day of week (Monday)
      for (let i = 0; i < weekArray.length; i += 1) {
        const tempDate = new Date(
          new Date(currentTimestamp.value).setDate(diff + i),
        );
        weekArray[i] = {
          date: tempDate.getDate(),
          timestamp: tempDate.getTime(),
          dayAlias: alias[i],
        };
      }
    };
    updateWeek();

    watch(() => currentTimestamp.value, () => {
      updateWeek();
    });

    const openCalendarModal = () => {
      store.commit('calendarModal/OPEN');
    };

    const isSelected = (timestamp) => {
      if (timestamp === currentTimestamp.value) return 'selected';
      return '';
    };

    const select = (newTs) => {
      if (!newTs) return;
      store.commit('SET_NEW_TIME', { timestamp: newTs });
    };

    return {
      openCalendarModal,
      currentTimestamp,
      weekArray,
      isSelected,
      select,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weekDatepicker {
  display: grid;
  grid-template-columns: 1.5fr repeat(7, 1fr);
  width: 100%;
  justify-items: center;
  > .icon--calendar {
    align-self: center;
  }
  &__date {
    display: flex;
    width: 2.25rem;
    height: 2.25rem;
    padding: .25rem;
    border-radius: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    p:first-of-type {
      margin-bottom: .25rem;
    }
  }
}

.weekDatepicker__date {
  user-select: none;
  cursor: pointer;
  &.selected {
    color: white;
    background-color: #7F74B4;
  }
}
</style>
