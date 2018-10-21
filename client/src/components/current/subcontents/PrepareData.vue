<template>
  <div id="content-prepareData">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="double-border">
        <div class="container-body" v-if="status === 'preparing'" >
          <div class="container-title">
            {{ labels.feedback }}<span class="highlight">&nbsp;{{ prepareInfo.totalCount }}</span>{{ labels.preparing }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="[status === 'preparing' ? 'ic-process-datard' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.dataPreparing }}{{ remainTime }}</div>
        </div>
        <div class="container-body" v-if="status === 'checking'">
          <div class="container-title">
            {{ labels.checking }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="[status === 'checking' ? 'ic-process-datachk' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.dataChecking }}{{ remainTime }}</div>
        </div>
        <div class="container-body" v-if="status === 'screenPrevent'" >
          <div class="container-title">
            {{ labels.waitingFeedback }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img src="../../../assets/images/img-processfin.svg" />
              <div class="ic-process-datard"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.waiting }}</div>
        </div>
      </div>

      <template slot="buttons">
        <div v-if="status === 'preparing'" >
          <r-button :title="'시작'" :type="'primary'" @button-clicked="start" />
        </div>
        <div v-if="status === 'checking'">
          <r-button :title="'취소'" :type="'normal'" @button-clicked="cancel" />
          <r-button :title="'재시작'" :type="'disabled'" @button-clicked="restart" />
        </div>
        <div v-if="status === 'screenPrevent'" >
          <r-button :title="'시작'" :type="'disabled'" @button-clicked="start" />
        </div>
      </template>
    </step-contents>
    <!-- 삭제 예정 -->
    <button v-on:click="moveNext">다음 화면</button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import { CURRENT } from '@/strings';

const labels = {
  title: CURRENT.STEP_PREPARE_DATA,
  description: CURRENT.STEP_PREPARE_DATA_DESCRIPTION,
  feedback: CURRENT.PREPARE_DATA_LABEL_DATA,
  preparing: CURRENT.PREPARE_DATA_LABEL_PREPARING,
  checking: CURRENT.PREPARE_DATA_LABEL_CHECKING,
  dataPreparing: CURRENT.PREPARE_DATA_LABEL_DATA_PREPARE,
  dataChecking: CURRENT.PREPARE_DATA_LABEL_DATA_CHECKING,
  waiting: CURRENT.PREPARE_DATA_WAITING,
  waitingFeedback: CURRENT.PREPARE_DATA_WAITING_FEEDBACK,
};

export default {
  name: 'PrepareData',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      status: 'preparing',  // preparing, checking, screenPrevent
      remainTime: '(5분)',
      labels,
    };
  },
  mounted() {
    this.$store.dispatch('current/fetchPrepareInfoAsync');
    console.log(this.currentStep)

    if(this.currentStep !== 'step-prepareData') {
      this.status = 'screenPrevent'
    }
  },
  computed: {
    ...mapGetters({
      prepareInfo: 'current/getPrepareInfo',
      currentStep: 'current/getCurrentStep',
      currentStepCode: 'current/getCurrentStepCode',
    }),
  },
  methods: {
    start() {
      // TODO 주석(원복)
      // TODO 여기서 status를 바꾸면 안될거가틈...
      this.status = 'checking';
      this.$store.dispatch('current/prepareDataStartAsync');
    },
    restart() {
      this.$store.dispatch('current/prepareDataStartAsync');
      console.log('restart');
    },
    cancel() {
      this.$store.dispatch('current/prepareDataCancelAsync');
      this.status = 'preparing';
      console.log('cancel')
    },
    // 삭제 예정
    moveNext() {
      this.$router.push('learning');
      //current.module의 해당 api로 이동필요
      this.$store.dispatch('current/setCurrentStep', 'step-learning');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-prepareData {
  .container-body {
    @include current-container-body;

    .container-title {
      @include current-container-body-title;

      .highlight{
        @include current-container-body-title-highlight;
      }
    }

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap {
        @include current-container-body-icon-process;
        @include background-spin-image;

        .ic-process-datard {
          @include size(50px);
          background: url("../../../assets/images/ic-process-datard.svg") no-repeat center;
        }

        .ic-process-datachk {
          @include size(50px);
          background: url("../../../assets/images/ic-process-datachk.svg") no-repeat center;
        }
      }
    }

    .label-status {
      @include current-container-body-label;
    }
  }
}
</style>
