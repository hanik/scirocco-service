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
              <div :class="[status === 'checking' ? 'ic-process-datachk' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.dataChecking }}{{ remainTime }}</div>
        </div>
      </div>

      <template slot="buttons">
        <div v-if="status === 'preparing'" >
          <RButton :title="'시작'" :type="'primary'" @button-clicked="blahblah" />
        </div>
        <div v-if="status === 'checking'">
          <RButton :title="'취소'" :type="'normal'" @button-clicked="blahblah2" />
          <RButton :title="'재시작'" :type="'disabled'" @button-clicked="blahblah" />
        </div>
      </template>
    </step-contents>
  </div>
</template>

<script>
import StepContents from '../StepContents.vue';
import RButton from '../../common/RButton.vue';
import { CURRENT } from '../../../strings';

const labels = {
  title: CURRENT.STEP_PREPARE_DATA,
  description: CURRENT.STEP_PREPARE_DATA_DESCRIPTION,
  feedback: CURRENT.PREPARE_DATA_LABEL_FEEDBACK,
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
    blahblah() {
      this.status = 'checking';
    },
    blahblah2() {
      this.status = 'preparing';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../assets/mixins';

#content-prepareData {
  .container-body {

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

        // TODO 빙글빙글 돌리기
        background: url("../../../assets/img-processing-1.svg") no-repeat center;

        .ic-process-datard {
          @include size(50px);
          background: url("../../../assets/ic-process-datard.svg") no-repeat center;
        }

        .ic-process-datachk {
          @include size(50px);
          background: url("../../../assets/ic-process-datachk.svg") no-repeat center;
        }
      }
    }

    .label-status {
      @include current-container-body-label;
    }
  }
}
</style>
