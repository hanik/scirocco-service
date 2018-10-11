<template>
  <div id="gauge-bar">
    <div class="gauge-wrap">
      <div class="gauge-background-bar">
        <div class="gauge-progress-bar"
             v-bind:style="{ width: percentage + '%' }"></div>
      </div>
      <div class="gauge-mark">
        <div class="gauge-mark-bar" v-for="index in 11" :key="index"></div>
      </div>
    </div>
    <div class="values">
      <span>{{ labels.zero }}</span>
      <span>{{ labels.fiveThousand }}</span>
      <span>{{ labels.tenThousand }}</span>
    </div>
  </div>
</template>

<script>
import { CURRENT } from '@/strings';

const labels = {
  zero: CURRENT.FEEDBACK_VALUE_ZERO,
  fiveThousand: CURRENT.FEEDBACK_VALUE_FIVE_THOUSAND,
  tenThousand: CURRENT.FEEDBACK_VALUE_TEN_THOUSAND,
};

export default {
  name: 'GaugeBar',
  props: [
    'percentage',
  ],
  data() {
    return {
      labels,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#gauge-bar {
  height: 126px;
  padding-top: 52px;

  .gauge-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 62px;

    .gauge-background-bar {
      @include size(100%, 6px);
      border-radius: 3px;
      background-color: #ebf2f4;
      .gauge-progress-bar {
        height: 6px;
        border-radius: 3px;
        background-color: #1c75b9;
      }
    }
    .gauge-mark {
      display: flex;
      width: 98%;
      justify-content: space-between;

      .gauge-mark-bar {
        @include size(1px, 8px);
        background-color: #ebf2f4;

        &:nth-child(1), &:nth-child(6), &:nth-child(11) {
          height: 17px;
        }
      }
    }
  }

  .values {
    display: flex;
    justify-content: space-between;
    padding-left: 60px;
    padding-right: 50px;
    margin-top: 8px;
    font-size: 14px;
    color: rgba(68, 79, 87, 0.8)
  }
}
</style>
