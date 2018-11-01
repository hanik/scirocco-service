<template>
  <div>
    <div class="table-header">
      <div class="checkbox"><input type="checkbox" /> </div>
      <div class="modelName">{{ modelName }}</div>
      <div class="startDate">{{ startDate }}</div>
      <div class="serviceStartDate">{{ serviceStartDate }}</div>
      <div class="serviceEndDate">{{ serviceEndDate }}</div>
      <div class="verifyResult">{{ verifyResult }}</div>
      <div class="serviceYn">{{ serviceYn }}</div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="item in historyList" :key="item.seq">
        <div class="checkbox"><input type="checkbox" /></div>
        <div class="modelName">{{ item.modelName }}</div>
        <div class="startDate">{{ item.modelCreateAt }}</div>
        <div class="serviceStartDate">{{ item.serviceStartAt }}</div>
        <div class="serviceEndDate">{{ item.serviceEndAt }}</div>
        <div class="verifyResult">{{ item.verifyResult }}</div>
        <div class="serviceYn">{{ item.serviceYn }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { HISTORY } from '@/strings';

export default {
  name: 'HistoryTable',
  props: ['historyList'],
  data() {
    return {
      modelName: HISTORY.TABLE_MODEL_NAME,
      startDate: HISTORY.TABLE_START_DATE,
      serviceStartDate: HISTORY.TABLE_SERVICE_START_DATE,
      serviceEndDate: HISTORY.TABLE_SERVICE_END_DATE,
      admin: HISTORY.TABLE_ADMIN,
      verifyResult: HISTORY.TABLE_VERIFY_RESULT,
      serviceYn: HISTORY.TABLE_SERVICE_YN,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

.table-header {
  @include size(100%, 40px);
  display: flex;
  line-height: 40px;
  background-color: rgba(243, 247, 248, 0.6);
  border-top: solid 1px #d6dcde;
}

.table-body {
  width: 100%;

  .table-row {
    display: flex;
    height: 48px;
    line-height: 48px;
    border-bottom: solid 1px rgba(214, 220, 222, 0.4);

    &:last-of-type {
      border-bottom: solid 1px #d6dcde;
    }
  }
}
.table-row, .table-header {
  & > div {
    padding: 0 22px;
    overflow: hidden;
  }

  .checkbox {
    flex: 1;
  }
  .modelName {
    flex: 3;
  }
  .startDate {
    flex: 4;
  }
  .serviceStartDate {
    flex: 4;
  }
  .serviceEndDate {
    flex: 4;
  }
  .verifyResult {
    flex: 3;
  }
  .serviceYn {
    flex: 3;

  }
}
</style>
