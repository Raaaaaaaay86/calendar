<template>
  <div class="select">
    <span class="select__title">
      {{ selectedItem }}
    </span>
    <i class="fas fa-caret-down"></i>
    <div class="menu" v-if="showMenu">
      <div v-for="(item, index) in items" :key="index" @click="selectedItem = item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    items: {
      required: false,
      // default: [
      //   '週檢視',
      //   '日檢視',
      // ],
    },
  },
  setup(props) {
    const showMenu = ref(false);
    const selectedItem = ref(props.items[0]);

    return {
      showMenu,
      selectedItem,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.select {
  background-color: #DEDAF4;
  color: #7F74B4;
  padding: 1rem 1.25rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  margin-right: .5rem;
  &__title {
    margin-right: .5rem;
  }
}
</style>
