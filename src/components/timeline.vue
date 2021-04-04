<template>
<div class="timeline">
  <div v-for="hour in 24" :key="hour + 'time'">
    <span>
      {{ hour }}:00
    </span>
    <span v-if="hour < 12">am</span>
    <span v-else>pm</span>
  </div>
</div>
</template>

<script>
export default {
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timeline {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 5rem;
  align-items: flex-end;
  justify-content: center;
  > div {
    height: 100%;
    border-right: 1px solid #C0C0C0;;
    border-bottom: 1px solid #C0C0C0;;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-left: .25rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 576px) {
  .timeline {
    > div {
      font-size: 1rem;
    }
  }
}

</style>
