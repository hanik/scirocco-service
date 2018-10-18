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
            {{ statusMessage }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processfin.svg" />
              <div :class="statusIcon"></div>
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
        <r-button :title="'재시작'" :type="'disabled'" @button-clicked="restart" />
      </template>
    </step-contents>
    <!-- 임시 버튼 -->
    <button v-on:click="ko2en">한영</button>
    <button v-on:click="en2ko">영한</button>
    <button v-on:click="learning">학습중</button>
    <button v-on:click="moveNext">다음 화면</button>
  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import { CURRENT, COMMONS } from '@/strings';
import { mapGetters } from 'vuex';

const labels = {
  title: CURRENT.STEP_LEARNING,
  description: CURRENT.STEP_LEARNING_DESCRIPTION,
  transKo2En: CURRENT.LEARNING_TRANSLATE_KO_EN,
  transEn2Ko: CURRENT.LEARNING_TRANSLATE_EN_KO,
  dataLearning: CURRENT.LEARNING_DATA_LEARNING,
  learning: CURRENT.LEARNING_LEARNING,
  dataWaiting: CURRENT.LEARNING_WAIT_DATA,
  waiting: CURRENT.LEARNING_WAITING,
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
      status: 'en2ko', // en2ko, ko2en, dataLearning, screenPrevent
      remainTime: '(5시간)',
      labels,
    };
  },
  computed: {
    ...mapGetters({
      currentStep: 'current/getCurrentStep',
    }),
    statusIcon() {
      if (this.status === 'en2ko') {
        return 'ic-tran-en2ko';
      } else if (this.status === 'ko2en') {
        return 'ic-tran-ko2en';
      } else if (this.status === 'dataLearning') {
        return 'ic-learning';
      } else if (this.status === 'screenPrevent') {
        return 'ic-learning';
      }
      return '';
    },
    statusMessage() {
      if (this.status === 'en2ko') {
        return this.labels.transEn2Ko;
      } else if (this.status === 'ko2en') {
        return this.labels.transKo2En;
      } else if (this.status === 'dataLearning') {
        return this.labels.dataLearning;
      } else if (this.status === 'screenPrevent') {
        return this.labels.dataWaiting;
      }
      return '';
    },
    statusLabel() {
      if (this.status === 'dataLearning') {
        return this.labels.learning;
      } else if (this.status === 'ko2en' || this.status === 'en2ko') {
        return this.labels.translating + ' ' + this.remainTime;
      } else if (this.status === 'screenPrevent') {
        return this.labels.waiting;
      }
      return '';
    },
    statusCircle(){
      if (this.status === 'dataLearning') {
        return '../../../assets/images/img-processfin.svg';
      } else {
        return '../../../assets/images/img-processing-1.svg';
      }
    }
  },
  mounted() {
    if(this.currentStep !== 'step-learning') {
      this.status = 'screenPrevent'
    }  },
  methods: {
    restart() {
      // TODO 재시작 할 수 있도록 api 호출하면 될 것 같음
      // this.$store.dispatch('current/prepareDataStartAsync');
      console.log('restart');
    },
    cancel() {
      // TODO 현재 프로세스를 중지 할 수 있도록 api 호출
      // this.$store.dispatch('current/cancelLearningAsync');
      console.log('cancel')
    },
    //삭제 예정
    en2ko() {
      this.status = 'en2ko';
    },
    ko2en() {
      this.status = 'ko2en';
    },
    learning() {
      this.status = 'dataLearning';
    },
    moveNext() {
      this.$router.push('verifyModel');
      //current.module의 해당 api로 이동필요
      this.$store.dispatch('current/setCurrentStep', 'step-verifyModel');
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-learning {
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
