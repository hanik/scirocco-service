<template>
  <div id="content-restartService">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="single-border">
        <div class="container-body" v-if="getStepStatus === 'waiting'" >
          <div class="container-title">
            {{ labels.msgNeed }}
            {{ labels.msgInfoBefore }}<span class="highlight">&nbsp;{{ modelName }}</span>&nbsp;{{ labels.msgInfoAfter }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-finish">
              <div :class="[getStepStatus === 'waiting' ? 'ic-process-finish' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ statusLabel }}</div>
        </div>

        <div class="container-body" v-if="getStepStatus === 'restarting'">
          <div class="container-title">
            {{ labels.msgRestarting }}
            {{ labels.msgInfoBefore }}<span class="highlight">&nbsp;{{ modelName }}</span>{{ labels.msgInfoAfter }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-process">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="[getStepStatus === 'restarting' ? 'ic-process-progress' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ statusLabel }}</div>
        </div>

        <div class="container-body" v-if="getStepStatus === 'complete'">
          <div class="container-title">
            {{ labels.msgComplete }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-finish">
              <div :class="[getStepStatus === 'complete' ? 'ic-process-finish' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ statusLabel }}</div>
        </div>

        <div class="container-body" v-if="getStepStatus === 'screenPrevent'" >
          <div class="container-title">
            {{ labels.msgServiceRestarting }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-finish">
              <div class="ic-process-finish"></div>
            </div>
          </div>
          <div class="label-status">{{ statusLabel }}</div>
        </div>
      </div>

      <template slot="buttons">
        <div v-if="getStepStatus === 'waiting' || getStepStatus === 'screenPrevent' " >
          <r-button :title="'재시작'" :type="'primary'" @button-clicked="serviceRestart" />
        </div>
        <div v-if="getStepStatus === 'restarting'">
          <r-button :title="'취소'" :type="'normal'" @button-clicked="cancel" />
          <r-button :title="'재시작'" :type="'disabled'" @button-clicked="serviceRestart" />
        </div>
        <div v-if="getStepStatus === 'complete'" >
          <r-button :title="'확인'" :type="'primary'" @button-clicked="complete" />
        </div>
      </template>
    </step-contents>
  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import { CURRENT } from '@/strings';
import { mapGetters } from 'vuex';

const labels = {
  title: CURRENT.STEP_RESTART_SERVICE,
  description: CURRENT.STEP_RESTART_SERVICE_DESCRIPTION,
  msgNeed: CURRENT.RESTART_LABEL_NEED,
  msgRestarting: CURRENT.RESTART_LABEL_RESTARTING,
  msgComplete: CURRENT.RESTART_LABEL_COMPLETE,
  msgInfoBefore: CURRENT.RESTART_LABEL_INFO_BEFORE,
  msgInfoAfter: CURRENT.RESTART_LABEL_INFO_AFTER,
  msgServiceRestarting: CURRENT.RESTART_SERVICE_MESSAGE,
  waiting: CURRENT.RESTART_WAITING,
  restarting: CURRENT.RESTART_RESTARTING,
  complete: CURRENT.RESTART_COMPLETE,
};

export default {
  name: 'RestartService',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      // TODO 모델명 받아오기
      modelName: 'Sirocco-YC-v3',
      labels,
      polling: null,
    };
  },
  computed: {
    ...mapGetters({
      currentStatusCode: 'current/getCurrentStatusCode',
    }),
    getStepStatus() {
      if (this.currentStatusCode === 50) {
        return 'waiting';
      } else if (this.currentStatusCode === 51) {
        return 'restarting';
      } else if (this.currentStatusCode === 52) {
        return 'complete';
      }
      return 'screenPrevent';
    },
    statusLabel() {
      if (this.currentStatusCode === 50) {
        return labels.waiting;
      } else if (this.currentStatusCode === 51) {
        return `${labels.restarting}`;
      } else if (this.currentStatusCode === 52) {
        return labels.complete;
      }
      return 'screenPrevent';
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    pollingRestartingServer() {
      this.polling = setInterval(async () => {
        await this.$store.dispatch('current/fetchCurrentStatusAsync');
        if (this.currentStatusCode === 52) {
          clearInterval(this.polling);
          // await this.$store.dispatch('current/fetchCurrentStatusAsync');
        }
      }, 5000);
    },
    cancel() {
      this.status = 'waiting';
    },
    serviceRestart() {
      this.$store.dispatch('current/restartServiceStartAsync');
      this.pollingRestartingServer();
    },
    complete() {
      console.log('complete');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-restartService {
  .container-body {
    @include current-container-body;

    .container-title {
      @include current-container-body-title;
      white-space: pre-line;
      display: inline;

      .highlight{
        @include current-container-body-title-highlight;
      }
    }

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap-finish {
        @include current-container-body-icon-process;
        background: url("../../../assets/images/img-processfin.svg") no-repeat center;

        .ic-process-finish {
          @include size(50px);
          background: url("../../../assets/images/ic-process-svup.svg") no-repeat center;
        }
      }

      .ic-status-wrap-process {
        @include current-container-body-icon-process;
        @include background-spin-image;

        .ic-process-progress {
          @include size(50px);
          background: url("../../../assets/images/ic-process-svup.svg") no-repeat center;
        }
      }
    }

    .label-status {
      @include current-container-body-label;
    }
  }
}
</style>
