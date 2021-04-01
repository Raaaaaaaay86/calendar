<template>
  <div class="dayCalendar week">
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
  components: {
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
  &.oneDay {
    grid-column: 2 / span 7;
  }
  &.week {
    grid-column: auto;
  }
}
</style>
