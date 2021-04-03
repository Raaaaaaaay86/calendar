<template>
  <div class="dayCalendar" :class="viewDay ? 'day' : 'week'">
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
  </div>
</template>

<script>

export default {
  props: {
    viewDay: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dayCalendar {
  grid-auto-rows: 5rem;
  display: grid;
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
</style>
