<template>
  <div class="userInfo">
    <span class="userInfo__title">
      {{ user.name }}
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
      type: Array,
      required: false,
      default: () => ['使用者資訊'],
    },
    user: {
      type: Object,
      required: false,
      default: () => ({
        name: '莉',
      }),
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
.userInfo {
  margin-right: 0.5rem;
  background-color: #DEDAF4;
  color: #7F74B4;
  padding: 1rem 1.25rem;
  border-radius: 1.5rem;
  display: flex;
  &__title {
    margin-right: .5rem;
  }
}
</style>
