<template>
  <div id="history-status">
    <div class="left-title">
      <div>
        <div>{{ labels.labelServiceModel }}</div>
        <div>{{ currentServiceModel.modelName }} </div>
        <r-button r-button :title="labels.restartService" :width="101" @button-clicked="serviceRestart" />
      </div>
    </div>
    <div class="right-buttons">
      <!--<r-button :title="labels.buttonMoveArchive" :width="140" />-->
      <r-button :title="labels.buttonChangeModel" :width="140" @button-clicked="changeModel" v-show="isHistoryListNotEmpty"/>
    </div>
    <alert-dialog v-show="alertDialogVisibility"
                  :message="alertMessage"
                  @close="closeAlertDialog"/>
  </div>
</template>

<script>
import { MODELS } from '@/strings';
import RButton from '@/components/common/RButton.vue';
import AlertDialog from '@/components/common/AlertDialog.vue';
import { mapGetters } from 'vuex';

const labels = {
  labelServiceModel: MODELS.LABEL_SERVICE_MODEL,
  buttonMoveArchive: MODELS.BUTTON_MOVE_ARCHIVE,
  buttonChangeModel: MODELS.BUTTON_CHANGE_MODEL,
  restartService: MODELS.SERVICE_RESTART,
};

export default {
  name: 'HistoryStatus',
  components: {
    RButton,
    AlertDialog,
  },
  data() {
    return {
      labels,
      alertDialogVisibility: false,
      alertMessage: '',
    };
  },
  props: ['historyList', 'selected'],
  computed: {
    ...mapGetters({
      currentServiceModel: 'models/getServiceModel',
    }),
    isHistoryListNotEmpty() {
      return this.historyList.length !== 0;
    },
  },
  methods: {
    serviceRestart() {
      this.$store.dispatch('current/restartServiceStartAsync');
    },
    changeModel() {
      const { selected, currentServiceModel } = this;

      if (selected.length !== 1) {
        this.alertMessage = '변경 모델은 하나를 선택해야 합니다.';
        this.alertDialogVisibility = true;
      } else {
        const selectedModel = this.historyList[selected[0]];
        if (selectedModel.modelName === currentServiceModel.modelName
          && selectedModel.seq === currentServiceModel.seq) {
          this.alertMessage = '이미 적용중인 모델입니다.';
          this.alertDialogVisibility = true;
        } else {
          this.$store.dispatch('models/restartChangeModelAsync', selectedModel);
        }
      }
    },
    closeAlertDialog() {
      this.alertDialogVisibility = false;
    },
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

    & > :first-child {
      display: flex;

      & > * {
        margin-right: 20px;
      }
    }
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
