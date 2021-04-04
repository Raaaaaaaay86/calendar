<template>
<div class="icon" :style="{ backgroundColor: bgc, color: textColor }">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: String,
      required: false,
      default: '#DEDAF4',
    },
    textColor: {
      type: String,
      required: false,
      default: '#7F74B4',
    },
  },
};
</script>

<style scoped lang="scss">
.icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
</style>
