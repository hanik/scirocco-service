<template>
  <div id="content-feedback">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="single-border">
        <div class="container-body">
          <div class="container-title">
            {{ labels.total }}&nbsp;<span class="highlight">{{ feedbackInfo.totalCount }}</span>{{ labels.count }}
            {{ labels.current }}&nbsp;<span class="highlight">{{ feedbackInfo.progressCount }}</span>{{ labels.count }}
          </div>
          <gauge-bar :percentage="displayFeedbackInfo" />
        </div>
      </div>

      <template slot="buttons">
        <div v-if="isPrevented">
          <r-button :title="'피드백 적용'" :type="'disabled'" @button-clicked="openPopup()" />
        </div>
        <div v-else>
          <r-button :title="'피드백 적용'" :type="'primary'" @button-clicked="openPopup()" />
        </div>
      </template>
    </step-contents>
    <create-model-popup v-show="popupVisibility"
                        @close="closePopup"
                        @create="create"></create-model-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CURRENT } from '@/strings';
import RButton from '@/components/common/RButton.vue';
import GaugeBar from '@/components/common/GaugeBar.vue';
import StepContents from '@/components/current/StepContents.vue';
import CreateModelPopup from '@/components/current/CreateModelPopup.vue';
import StatusCode from '@/StatusCode.js'

const labels = {
  title: CURRENT.STEP_FEEDBACK,
  description: CURRENT.STEP_FEEDBACK_DESCRIPTION,
  total: CURRENT.FEEDBACK_TOTAL,
  current: CURRENT.FEEDBACK_CURRENT,
  count: CURRENT.FEEDBACK_COUNT,
};

export default {
  name: 'GatherFeedback',
  components: {
    StepContents,
    RButton,
    GaugeBar,
    CreateModelPopup,
  },
  methods: {
    openPopup() {
      this.popupVisibility = true;
    },
    closePopup() {
      this.popupVisibility = false;
    },
    create() {
    },
  },
  data() {
    return {
      labels,
      dialogVisibility: false,
      popupVisibility: false,
      status: '', // screenPrevent
    };
  },
  mounted() {
    this.$store.dispatch('current/fetchFeedbackInfoAsync');
  },
  computed: {
    ...mapGetters({
      feedbackInfo: 'current/getFeedbackInfo',
      currentStatusCode: 'current/getCurrentStatusCode',
    }),
    displayFeedbackInfo() {
      if (Object.keys(this.feedbackInfo).length !== 0) {
        const { totalCount, progressCount } = this.feedbackInfo;
        const percentage = (progressCount / totalCount) * 100;
        return Number.isNaN(percentage) ? 0 : percentage;
      }
      return 0;
    },
    isPrevented() {
      if(this.currentStatusCode > 0) {
        this.status = (StatusCode.getCodeStep(this.currentStatusCode) === 'step-feedback') ? '' : 'screenPrevent';
      }
      return this.status === 'screenPrevent'
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-feedback {
  .container-body {
    @include current-container-body;

    .container-title {
      @include current-container-body-title;
      white-space: pre-line;
      display: inline;
      line-height: 33px;
      height: auto;

      .highlight {
        @include current-container-body-title-highlight;
      }
    }
  }
}
</style>
