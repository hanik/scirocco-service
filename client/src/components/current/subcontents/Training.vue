<template>
  <div id="content-training">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="single-border">
        <div class="container-body" v-if="!error">
          <div class="container-title">
            {{ statusMessage }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processfin.svg" />
              <div class="ic-training"></div>
            </div>
          </div>
          <div class="label-status">{{ statusLabel }}</div>
        </div>

        <div class="container-body-error" v-else>
          <div class="error-message">{{ labels.generalError }}</div>
          <div class="error-icon"></div>
        </div>
      </div>

      <template slot="buttons">
        <r-button :title="'취소'" :type="'normal'" @button-clicked="cancel" />
        <r-button :title="'재시작'" :type="'disabled'" @button-clicked="startTraining" />
      </template>
    </step-contents>
  </div>
</template>

<script>
import { CURRENT, COMMONS } from '@/strings';
import { mapGetters } from 'vuex';
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import api from '@/services/api.service';

const labels = {
  title: CURRENT.STEP_TRAINING,
  description: CURRENT.STEP_TRAINING_DESCRIPTION,

  dataTraining: CURRENT.TRAINING_DATA_TRAINING,
  training: CURRENT.TRAINING_TRAINING,
  dataWaiting: CURRENT.TRAINING_WAIT_DATA,
  waiting: CURRENT.TRAINING_WAITING,

  memoryError: COMMONS.ERROR_MESSAGE_MEMORY,
  generalError: COMMONS.ERROR_MESSAGE_GENERAL,
};

export default {
  name: 'Training',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      error: false,
      currentEpoch: 0,
      polling: null,
      labels,
    };
  },
  computed: {
    ...mapGetters({
      currentStatusCode: 'current/getCurrentStatusCode',
    }),
    getStepStatus() {
      if (this.currentStatusCode === 30) {
        return 'dataTraining';
      } else if (this.currentStatusCode === 31) {
        this.pollingTrainingStatus();
        return 'dataTraining';
      }
      return 'screenPrevent';
    },
    statusMessage() {
      if (this.getStepStatus === 'dataTraining') {
        return this.labels.dataTraining;
      }
      return this.labels.dataWaiting;
    },
    statusLabel() {
      if (this.getStepStatus === 'dataTraining') {
        return `${this.labels.training} ${this.currentEpoch}`;
      }
      return this.labels.waiting;
    },
    statusCircle() {
      if (this.getStepStatus === 'dataTraining') {
        return '../../../assets/images/img-processfin.svg';
      }
      return '../../../assets/images/img-processing-1.svg';
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    pollingTrainingStatus() {
      this.polling = setInterval(async () => {
        const result = await api.fetchTrainingStatus();
        this.currentEpoch = result.data;
        if (this.currentEpoch === 'DONE') {
          clearInterval(this.polling);
          await this.$store.dispatch('current/setCurrentStatusCode', 40);
          this.$router.push({
            path: 'verifyModel',
          });
        }
      }, 5000);
    },
    startTraining() {
      this.$store.dispatch('current/trainingStartAsync');
    },
    cancel() {
      this.$store.dispatch('current/trainingCancelAsync');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-training {
  .container-body {
    @include current-container-body;

    .container-title {
      @include current-container-body-title;
    }

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap {
        @include current-container-body-icon-process;
        @include background-spin-image;

        .ic-training {
          @include size(50px);
          background: url("../../../assets/images/ic-process-study.svg") no-repeat center;

        }
      }
    }

    .label-status {
      @include current-container-body-label;
    }
  }

  .container-body-error {
    .error-message{
      margin-top: 51px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #be0d58;
      white-space: pre;
    }
    .error-icon {
      height: 100px;
      background: url("../../../assets/images/ic-processerror.svg") no-repeat center;
    }
  }
}
</style>
