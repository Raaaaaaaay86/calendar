<template>
  <div class="addRvModal">
    <div class="addRvModal__head">
      <h2>新增預約</h2>
      <i class="fas fa-times" @click="closeRvModal"></i>
    </div>
    <div class="addRvModal__main">
      <p>
        選擇日期： {{ fullDate }}
      </p>
      <p>
        類型：
        <select v-model="rvType">
          <option value="reservations">服務預約</option>
          <option value="workTimes">班表</option>
        </select>
      </p>
      <p v-if="rvType === 'reservations'">
        預約名稱:
        <input type="text" v-model="tempRvData.topic">
      </p>
      <p v-if="rvType === 'reservations'">
        預約姓名:
        <input type="text" v-model="tempRvData.customer">
      </p>
      <p>
        開始時間：
        <input type="time" v-model="tempRvData.startAt">
      </p>
      <p>
        結束時間：
        <input type="time" v-model="tempRvData.endAt">
      </p>
    </div>
    <div class="addRvModal__footer">
      <v-btn outlined sm @click="closeRvModal()">
        取消
      </v-btn>
      <v-btn sm @click="addRv()">
        確定
      </v-btn>
    </div>
  </div>
</template>

<script>
import VBtn from '@/components/v-btn.vue';
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';

export default {
  components: {
    VBtn,
  },
  setup() {
    const store = useStore();
    const fullDate = computed(() => store.getters.fullDate);
    const currentTimestamp = computed(() => store.state.currentTimestamp);
    const rvType = ref('reservations');
    const tempRvData = reactive({
      topic: '',
      startAt: '',
      endAt: '',
      timestamp: '',
    });

    const closeRvModal = () => {
      store.commit('addRvModal/CLOSE');
    };

    const addRv = () => {
      const d = new Date(currentTimestamp.value);

      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      tempRvData.timestamp = d.getTime();

      const startAtTimestamp = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        tempRvData.startAt.split(':')[0],
        tempRvData.startAt.split(':')[1],
      ).getTime();

      const endAtTimestamp = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        tempRvData.endAt.split(':')[0],
        tempRvData.endAt.split(':')[1],
      ).getTime();

      if (endAtTimestamp < startAtTimestamp) return alert('結束時間不可早於開始時間');

      const rvData = {
        timestamp: tempRvData.timestamp,
        topic: tempRvData.topic,
        startAt: startAtTimestamp,
        endAt: endAtTimestamp,
      };

      store.commit('ADD_RV', { rvData, rvType: rvType.value });
      closeRvModal();
      return true;
    };

    return {
      fullDate,
      closeRvModal,
      tempRvData,
      addRv,
      rvType,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.addRvModal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background-color: #fff;
  color: $primary;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  &__head {
    text-align: center;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
    i, h2 {
      margin-left: auto;
    }
  }
  &__main {
    > p {
      line-height: 2rem;
      display: flex;
      align-items: center;
      > input , > select{
        border: 1px solid $primary;
        margin-left: .5rem;
        padding-left: 0.25rem;;
        border-radius: 5px;
        color: $primary;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    > .btn:first-of-type {
      margin-right: 0.5rem;
    }
  }
}
</style>
