<template>
<div class="datepicker--small">
  <div class="btn--prev">
    <i class="fas fa-angle-left"></i>
  </div>
  <span class="date">
    {{ fullDate }}
  </span>
  <div class="btn--next">
    <i class="fas fa-angle-right"></i>
  </div>
</div>
</template>

<script>
export default {
  props: {
    currentDate: {
      required: true,
      default: new Date(),
    },
  },
  setup(props) {
    const fullDate = `${props.currentDate.getFullYear()}/${parseInt(props.currentDate.getMonth(), 10) + 1}/${props.currentDate.getDate()}`;

    return {
      fullDate,
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
}
</style>
