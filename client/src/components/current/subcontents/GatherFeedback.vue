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
            {{ labels.total }}&nbsp;<span class="highlight">{{ totalCount }}</span>{{ labels.count }}
            {{ labels.current }}&nbsp;<span class="highlight">{{ currentCount }}</span>{{ labels.count }}
          </div>
          <gauge-bar :percentage="percentage" />
        </div>
      </div>

      <template slot="buttons">
          <r-button :title="'피드백 적용'" :type="'primary'" @button-clicked="blahblah" />
      </template>
    </step-contents>

  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import GaugeBar from '@/components/common/GaugeBar.vue';
import { CURRENT } from '@/strings';

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
  },
  methods: {
    blahblah() {

    },
  },
  data() {
    return {
      labels,
      dialogVisibility: false,
      popupVisibility: false,
      totalCount: '29,300',
      currentCount: '5,000',
      percentage: 25,
    };
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
