<template>
  <div id="history-status">
    <div class="left-title">
      <div>
        <div>{{ labels.labelServiceModel }}</div>
        <div>{{ currentServiceModelName }} </div>
        <r-button r-button :title="labels.restartService" :width="101" @button-clicked="serviceRestart" />
      </div>
    </div>
    <div class="right-buttons">
      <!--<r-button :title="labels.buttonMoveArchive" :width="140" />-->
      <r-button :title="labels.buttonChangeModel" :width="140" @button-clicked="changeModel"/>
    </div>
    <alert-dialog v-show="alertDialogVisibility"
                  :message="'일단 암거나 띄워볼게요'"
                  @close="closeAlertDialog"/>
  </div>
</template>

<script>
import { HISTORY } from '@/strings';
import RButton from '@/components/common/RButton.vue';
import AlertDialog from '@/components/common/AlertDialog.vue';
import { mapGetters } from 'vuex';

const labels = {
  labelServiceModel: HISTORY.LABEL_SERVICE_MODEL,
  buttonMoveArchive: HISTORY.BUTTON_MOVE_ARCHIVE,
  buttonChangeModel: HISTORY.BUTTON_CHANGE_MODEL,
  restartService: HISTORY.SERVICE_RESTART,
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
    };
  },
  computed: {
    ...mapGetters({
      currentServiceModelName: 'models/getServiceModelName',
    }),
  },
  methods: {
    serviceRestart() {
      this.$store.dispatch('current/restartServiceStartAsync');
    },
    changeModel() {
      // TODO Validation
      // 여러개 선택된 경우 || 선택안된경우 --> 한개만 선택하도록 Alert;
      // 현재 사용중인 모델일 경우에 ---> 이미 사용중 alert
      // TODO 2번 /translation/restart/change-model
      this.alertDialogVisibility = true;

      const modelInfo = {
        modelName: 'Take-02',
        seq: '2',
      };

      this.$store.dispatch('models/restartChangeModelAsync', modelInfo);
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
