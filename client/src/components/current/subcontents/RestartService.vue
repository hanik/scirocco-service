<template>
  <div id="content-restartService">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="single-border">
        <div class="container-body" v-if="status === 'need'" >
          <div class="container-title">
            {{ labels.msgNeed }}
            {{ labels.msgInfoBefore }}<span class="highlight">&nbsp;{{ modelName }}</span>&nbsp;{{ labels.msgInfoAfter }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-finish">
              <div :class="[status === 'need' ? 'ic-process-finish' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.waiting }}</div>
        </div>

        <div class="container-body" v-if="status === 'restarting'">
          <div class="container-title">
            {{ labels.msgRestarting }}
            {{ labels.msgInfoBefore }}<span class="highlight">&nbsp;{{ modelName }}</span>{{ labels.msgInfoAfter }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-process">
              <div :class="[status === 'restarting' ? 'ic-process-progress' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.restarting }}{{ remainTime }}</div>
        </div>

        <div class="container-body" v-if="status === 'complete'">
          <div class="container-title">
            {{ labels.msgComplete }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap-finish">
              <div :class="[status === 'complete' ? 'ic-process-finish' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.complete}}</div>
        </div>
      </div>

      <template slot="buttons">
        <div v-if="status === 'need'" >
          <r-button :title="'시작'" :type="'primary'" @button-clicked="blahblah2" />
        </div>
        <div v-if="status === 'restarting'">
          <r-button :title="'취소'" :type="'normal'" @button-clicked="blahblah" />
          <r-button :title="'재시작'" :type="'normal'" @button-clicked="blahblah3" />
        </div>
        <div v-if="status === 'complete'" >
          <r-button :title="'시작'" :type="'primary'" @button-clicked="blahblah" />
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
  title: CURRENT.STEP_RESTART_SERVICE,
  description: CURRENT.STEP_RESTART_SERVICE_DESCRIPTION,
  msgNeed: CURRENT.RESTART_LABEL_NEED,
  msgRestarting: CURRENT.RESTART_LABEL_RESTARTING,
  msgComplete: CURRENT.RESTART_LABEL_COMPLETE,
  msgInfoBefore: CURRENT.RESTART_LABEL_INFO_BEFORE,
  msgInfoAfter: CURRENT.RESTART_LABEL_INFO_AFTER,
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
      status: 'need', // need, restarting, complete
      modelName: 'Sirocco-YC-v3',
      remainTime: '(5분)',
      labels,
    };
  },
  methods: {
    blahblah() {
      this.status = 'need';
    },
    blahblah2() {
      this.status = 'restarting';
    },
    blahblah3() {
      this.status = 'complete';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../../assets/mixins';

#content-restartService {
  .container-body {

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
        background: url("../../../assets/images/img-processing-1.svg") no-repeat center;

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
