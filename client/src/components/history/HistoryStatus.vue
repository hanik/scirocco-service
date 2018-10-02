<template>
  <div id="history-status">
    <div class="left-title">
      <div>
        {{ labelServiceModel }} {{ currentServiceModel }}
      </div>
    </div>
    <div class="right-buttons">
      <RButton :title="buttonMoveArchive" :width="140" />
      <RButton :title="buttonChangeModel" :width="140" />
    </div>
  </div>
</template>

<script>
import { STRING_HISTORY } from "../../strings";
import RButton from '../common/RButton.vue';

export default {
  name: 'HistoryStatus',
  components: {
    RButton,
  },
  data() {
    return {
      labelServiceModel: STRING_HISTORY.LABEL_SERVICE_MODEL,
      buttonMoveArchive: STRING_HISTORY.BUTTON_MOVE_ARCHIVE,
      buttonChangeModel: STRING_HISTORY.BUTTON_CHANGE_MODEL,
      currentServiceModel: 'Sirocco-YC-v3',
    };
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
