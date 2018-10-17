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
            {{ labels.feedback }}<span class="highlight">&nbsp;{{ feedbackCount }}</span>{{ labels.preparing }}
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
      </div>

      <template slot="buttons">
        <div v-if="status === 'preparing'" >
          <r-button :title="'시작'" :type="'primary'" @button-clicked="start" />
        </div>
        <div v-if="status === 'checking'">
          <r-button :title="'취소'" :type="'normal'" @button-clicked="cancel" />
          <r-button :title="'재시작'" :type="'disabled'" @button-clicked="restart" />
        </div>
      </template>
    </step-contents>
  </div>
</template>

<script>
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
};

export default {
  name: 'PrepareData',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      status: 'preparing',
      feedbackCount: '29,800',
      remainTime: '(5분)',
      labels,
    };
  },
  methods: {
    start() {
      // this.status = 'checking';

      this.$store.dispatch('current/prepareDataStartAsync');
    },
    restart() {
      console.log('restart');
    },
    cancel() {
      this.status = 'preparing';
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
