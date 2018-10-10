<template>
  <div id="content-learning">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="double-border">
        <div class="container-body" v-if="!error">
          <div class="container-title">
            {{ statusLabel }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="statusIcon"></div>
            </div>
          </div>
          <div class="label-status">{{ status === 'dataLearning' ? labels.learning : labels.translating }}{{ remainTime }}</div>
        </div>

        <div class="container-body-error" v-else>
          <div class="error-message">{{ labels.generalError }}</div>
          <div class="error-icon"></div>
        </div>
      </div>

      <template slot="buttons">
        <r-button :title="'취소'" :type="'normal'" @button-clicked="blahblah" />
        <r-button :title="'재시작'" :type="'normal'" @button-clicked="blahblah2" />
      </template>
    </step-contents>
  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import { CURRENT, COMMONS } from '@/strings';

const labels = {
  title: CURRENT.STEP_LEARNING,
  description: CURRENT.STEP_LEARNING_DESCRIPTION,
  transEn2Ko: CURRENT.LEARNING_TRANSLATE_KO_EN,
  transKo2En: CURRENT.LEARNING_TRANSLATE_EN_KO,
  dataLearning: CURRENT.LEARNING_DATA_LEARNING,
  learning: CURRENT.LEARNING_LEARNING,
  translating: CURRENT.LEARNING_TRANSLATING,
  memoryError: COMMONS.ERROR_MESSAGE_MEMORY,
  generalError: COMMONS.ERROR_MESSAGE_GENERAL,
};

export default {
  name: 'Learning',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      error: false,
      status: 'en2ko', // en2ko, ko2en, dataLearning
      remainTime: '(5시)',
      labels,
    };
  },
  computed: {
    statusIcon() {
      if (this.status === 'en2ko') {
        return 'ic-tran-en2ko';
      } else if (this.status === 'ko2en') {
        return 'ic-tran-ko2en';
      } else if (this.status === 'dataLearning') {
        return 'ic-learning';
      }
      return '';
    },
    statusLabel() {
      if (this.status === 'en2ko') {
        return this.labels.transEn2Ko;
      } else if (this.status === 'ko2en') {
        return this.labels.transKo2En;
      } else if (this.status === 'dataLearning') {
        return this.labels.dataLearning;
      }
      return '';
    },
  },
  methods: {
    blahblah() {
      this.status = 'ko2en';
    },
    blahblah2() {
      this.status = 'dataLearning';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-learning {
  .container-body {

    .container-title {
      @include current-container-body-title;
    }

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap {
        @include current-container-body-icon-process;
        @include background-spin-image;

        .ic-tran-en2ko {
          @include size(50px);
          background: url("../../../assets/images/ic-pi-trans-1.svg") no-repeat center;
        }

        .ic-tran-ko2en {
          @include size(50px);
          background: url("../../../assets/images/ic-pi-trans-2.svg") no-repeat center;
        }

        .ic-learning {
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
