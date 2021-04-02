<template>
<div class="datepicker--small">
  <div class="btn--prev">
    <i class="fas fa-angle-left" @click="setDay(-1)"></i>
  </div>
  <span class="date">
    {{ new Date(currentTimestamp).getFullYear() }}/{{ new Date(currentTimestamp).getMonth() + 1 }}/{{ new Date(currentTimestamp).getDate() }}
  </span>
  <div class="btn--next">
    <i class="fas fa-angle-right" @click="setDay(1)"></i>
  </div>
</div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  props: {
    currentTimestamp: {
      required: true,
      default: new Date().getTime(),
    },
  },
  setup(props) {
    const store = useStore();
    const setDay = (num) => {
      const newTs = new Date(
        new Date(props.currentTimestamp).getFullYear(),
        new Date(props.currentTimestamp).getMonth(),
        new Date(props.currentTimestamp).getDate() + num,
      );

      const timestamp = newTs.getTime();

      store.commit('SET_NEW_TIME', { timestamp });
    };

    return {
      setDay,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.datepicker--small {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  margin-right: auto;
}

.btn--prev, .btn--next {
  background-color: #767676;
  color: white;
  font-size: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.date {
  margin: 0 1rem;
  width: 5.3rem;
}
</style>
