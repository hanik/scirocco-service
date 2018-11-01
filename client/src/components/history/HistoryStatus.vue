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
      <!-- TODO 2번 /translation/restart/change-model -->
      <r-button :title="labels.buttonChangeModel" :width="140" />
    </div>
  </div>
</template>

<script>
import { HISTORY } from '@/strings';
import RButton from '@/components/common/RButton.vue';
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
  },
  data() {
    return {
      labels,
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
