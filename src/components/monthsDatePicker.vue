<template>
<div class="monthsDatepicker">
  <div class="topbar">
    <div class="topbar__title">
      <v-icon :bgc="'#7F74B4'" :text-color="'#fff'">
        <i class="far fa-calendar"></i>
      </v-icon>
      <h1>選擇日期</h1>
    </div>
    <i class="fas fa-times" @click="closeCalendarModal()"></i>
    <div class="topbar__current">
      <i class="fas fa-chevron-left" @click="setMonth(-1)"></i>
        <span>
          {{ `${new Date(currentTimestamp).getFullYear()} / ${new Date(currentTimestamp).getMonth() + 1}` }}
        </span>
      <i class="fas fa-chevron-right" @click="setMonth(1)"></i>
    </div>
    <div class="topbar__week">
      <span>
        M
      </span>
      <span>
        T
      </span>
      <span>
        W
      </span>
      <span>
        T
      </span>
      <span>
        F
      </span>
      <span>
        S
      </span>
      <span>
        S
      </span>
    </div>
  </div>
  <div class="calendarsArea">
    <v-calendar :show-month="false" :current-timestamp="currentTimestamp"/>
    <v-calendar :current-timestamp="nextMonthTimestamp"/>
    <v-btn class="addBtn" @click="setNewTimestamp()">
      選擇
    </v-btn>
  </div>
</div>
</template>

<script>
import vIcon from '@/components/v-icon.vue';
import vCalendar from '@/components/v-calendar.vue';
import vBtn from '@/components/v-btn.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    vIcon,
    vCalendar,
    vBtn,
  },
  setup() {
    const store = useStore();
    const currentTimestamp = computed(() => store.state.currentTimestamp);

    // const nextMonthTimestamp = computed(() => new Date(
    //   new Date(currentTimestamp.value).getFullYear(),
    //   new Date(currentTimestamp.value).getMonth() + 2,
    //   1,
    // ).getTime());

    const nextMonthTimestamp = computed(() => new Date(new Date(currentTimestamp.value).setMonth(new Date(currentTimestamp.value).getMonth() + 1)).getTime());
    const closeCalendarModal = () => {
      store.commit('calendarModal/CLOSE');
    };

    const setNewTimestamp = () => {
      store.commit('SET_NEW_TIME_BY_TEMP');
      closeCalendarModal();
    };

    const setMonth = (num) => {
      const newTs = new Date(
        new Date(currentTimestamp.value).getFullYear(),
        new Date(currentTimestamp.value).getMonth() + num,
        new Date(currentTimestamp.value).getDate(),
      );

      store.commit('SET_NEW_TIME', { timestamp: newTs.getTime() });
    };

    return {
      closeCalendarModal,
      currentTimestamp,
      nextMonthTimestamp,
      setNewTimestamp,
      setMonth,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.monthsDatepicker {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1rem;
  user-select: none;
}

.topbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: -1rem;
  margin-bottom: 0;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  > i {
    cursor: pointer;
  }
  &__title {
    display: flex;
    align-items: center;
    h1 {
      margin-left: .5rem;
    }
  }
  &__current {
    width: 100%;
    margin-top: 1.25rem;
    text-align: center;
    > i {
      cursor: pointer;
    }
    span {
      margin-right: 1rem;
      margin-left: 1rem;
    }
  }
  &__week {
    width: 100%;
    display: grid;
    margin-top: 1.5rem;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
  }
}

.calendarsArea {
  height: calc(100vh - 140px);
  &__monthTopic {
    text-align: center;
    margin: 1rem 0;
  }
  > .addBtn {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
  }
}

</style>
