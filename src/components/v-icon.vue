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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  // background-color: #DEDAF4;
  // color: #7F74B4;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
