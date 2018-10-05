<template>
  <div>
    <div class="table-header">
      <div class="checkbox"><input type="checkbox" /> </div>
      <div class="modelName">{{ modelName }}</div>
      <div class="startDate">{{ startDate }}</div>
      <div class="endDate">{{ endDate }}</div>
      <div class="improve">{{ improve }}</div>
      <div class="fix">{{ fix }}</div>
      <div class="base">{{ base }}</div>
      <div class="admin">{{ admin }}</div>
      <div class="volume">{{ volume }}</div>
      <div class="history">{{ history }}</div>
    </div>
    <div class="table-body">
      <div class="table-row" v-for="item in items" :key="item.modelName">
        <div class="checkbox"><input type="checkbox" /></div>
        <div class="modelName">{{ item.modelName }}</div>
        <div class="startDate">{{ item.startDate }}</div>
        <div class="endDate">{{ item.endDate }}</div>
        <div class="improve">{{ item.improve }}</div>
        <div class="fix">{{ item.fix }}</div>
        <div class="base">{{ item.base }}</div>
        <div class="admin">{{ item.admin }}</div>
        <div class="volume">{{ item.volume }}</div>
        <div class="history">{{ item.history }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { HISTORY } from '@/strings';

export default {
  name: 'HistoryTable',
  props: ['items'],
  data() {
    return {
      modelName: HISTORY.TABLE_MODEL_NAME,
      startDate: HISTORY.TABLE_START_DATE,
      endDate: HISTORY.TABLE_END_DATE,
      improve: HISTORY.TABLE_IMPROVE,
      fix: HISTORY.TABLE_FIX,
      base: HISTORY.TABLE_BASE,
      admin: HISTORY.TABLE_ADMIN,
      volume: HISTORY.TABLE_VOLUME,
      history: HISTORY.TABLE_HISTORY,

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
  }

  .checkbox {
    flex: 1;
  }
  .modelName {
    flex: 6;
  }
  .startDate {
    flex: 5;
  }
  .endDate {
    flex: 5;
  }
  .improve {
    flex: 3;
  }
  .fix {
    flex: 3;
  }
  .base {
    flex: 3;
  }
  .admin {
    flex: 7;
  }
  .volume {
    flex: 3;
  }
  .history {
    flex: 1;
  }
}
</style>
