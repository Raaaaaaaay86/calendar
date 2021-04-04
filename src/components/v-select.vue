<template>
  <div ref="el" class="select" @click.stop="toggleMenu()" @focusout="closeMenu()" tabindex="0">
    <span class="select__title">
      {{ selectedItem }}
    </span>
    <i class="fas fa-caret-down"></i>
    <ul class="select__menu" v-if="showMenu">
      <li v-for="(item, index) in items" :key="index" @click.stop="select(item)">
        <slot name="default" :selected="selectedItem">
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    items: {
      required: false,
    },
  },
  setup(props, { emit }) {
    const showMenu = ref(false);
    const selectedItem = ref(props.items[0]);
    const el = ref();

    const openMenu = () => {
      showMenu.value = true;
    };

    const closeMenu = () => {
      showMenu.value = false;
    };

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    const select = (newItem) => {
      toggleMenu();
      emit('select', newItem);
      selectedItem.value = newItem;
    };

    return {
      showMenu,
      selectedItem,
      openMenu,
      closeMenu,
      select,
      el,
      toggleMenu,
    };
  },
};
</script>

<style scoped lang="scss">
.select {
  background-color: #DEDAF4;
  color: #7F74B4;
  padding: 1rem 1.25rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  margin-right: .5rem;
  position: relative;
  user-select: none;
  cursor: pointer;
  &__title {
    margin-right: .5rem;
  }
  &__menu {
    background-color: #fff;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    padding: .5rem 0;
    > li {
      padding: .5rem 1rem;
      &:hover {
        background-color: #F6F6F6;
      }
    }
  }
}
</style>
