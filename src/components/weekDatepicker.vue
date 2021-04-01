<template>
<div class="weekDatepicker">
  <v-icon class="icon--calendar"></v-icon>
  <div class="weekDatepicker__date">
    <p>M</p>
    <p>01</p>
  </div>
  <div class="weekDatepicker__date">
    <p>T</p>
    <p>02</p>
  </div>
  <div class="weekDatepicker__date selected">
    <p>W</p>
    <p>03</p>
  </div>
  <div class="weekDatepicker__date">
    <p>T</p>
    <p>04</p>

  </div>
  <div class="weekDatepicker__date">
    <p>F</p>
    <p>05</p>
  </div>
  <div class="weekDatepicker__date">
    <p>S</p>
    <p>05</p>
  </div>
  <div class="weekDatepicker__date">
    <p>S</p>
    <p>07</p>
  </div>
</div>
</template>

<script>
import vIcon from '@/components/v-icon.vue';

export default {
  components: {
    vIcon,
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
  &.selected {
    color: white;
    background-color: #7F74B4;
  }
}
</style>
