<template>
  <div id="history-status">
    <div class="left-title">
      <div>
        서비스 중인 모델 Sirocco-YC-v3
      </div>
    </div>
    <div class="right-buttons">
      <RButton :title="'아카이브 이동'" :width="140" />
      <RButton :title="'기준모델 변경'" :width="140" />
    </div>
  </div>
</template>

<script>
import RButton from '../common/RButton.vue';

export default {
  name: 'HistoryStatus',
  components: {
    RButton,
  },
};
</script>

<style scoped lang="scss">
#history-status {
  display: flex;
  margin-top: 30px;
  margin-bottom: 21px;

  & > div {
    flex: 1 1 0;
  }

  .left-title {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
  }

  .right-buttons {
    display: flex;
    justify-content: flex-end;

    & > :first-child {
      margin-right: 10px;
    }
  }
}
</style>
