<template>
<div class="btn" :class="dynamicClass()">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    sm: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const dynamicClass = () => {
      const classList = [];
      if (props.sm) classList.push('sm');
      if (props.outlined) classList.push('outlined');
      return classList.join(' ');
    };

    return {
      dynamicClass,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';

.btn {
  background-color: $primary;
  color: #fff;
  padding: 1rem 3rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outlined {
  background-color: #fff;
  color: $primary;
  border: 1px solid $primary;
}

.sm {
  padding: .5rem 1rem;
}
</style>
