<template>
  <div id="stepper-tab-list">
    <div v-for="(value, key) in steps" class="step" :key="key" :class="[{selected: selected === key}, {current: current === key}]">
      <div :class="[{selected: selected === key}, {current: current === key}]" :id="key" @click="select($event)">
        <div class="label">
          <span class="ic-unchecked"></span>
          <span> {{ value }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENT } from '@/strings';

const steps = {
  'step-feedback': CURRENT.STEP_FEEDBACK,
  'step-prepareData': CURRENT.STEP_PREPARE_DATA,
  'step-learning': CURRENT.STEP_LEARNING,
  'step-verifyModel': CURRENT.STEP_VERIFY_MODEL,
  'step-restartService': CURRENT.STEP_RESTART_SERVICE,
};

export default {

  name: 'StepperTabList',
  data() {
    return {
      steps,
      selected: '', // 사용자가 확인을 위해 클릭한 탭
      current: '', // 현재 서버에서 돌아가고 있는 단계
    };
  },
  mounted() {
    // 현재 서버에서 돌아가고 있는 단계가 없을 경우
    if (this.current === '') {
      this.current = 'step-feedback';
      this.selected = 'step-feedback';
    } else {
      this.selected = this.current;
    }
  },
  methods: {
    select(event) {
      const targetId = event.currentTarget.id;
      this.selected = targetId;
      this.$router.push({
        name: targetId,
      });
    },
  },
};

</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#stepper-tab-list {
  min-width: 900px;
  display: flex;
  background-color: #dae4e6;

  @mixin ic-check {
    @include size(16px, 18px);
    float: left;
    margin-right: 8px;
    background-size: contain;
    background: no-repeat top;
  }

  & .step {
    flex: 1 1 180px;
    height: 60px;
    color: #444f57;
    cursor: pointer;
    margin: 0 1px;
    float: left;
    position: relative;
    background-color: #f3f7f8;
    border-bottom: solid 1px #dae4e6;
    border-top: solid 1px #dae4e6;

    &.current {
      background-color: #129fc8;
    }

    &.selected {
      background-color: #fff;
    }

    & > div {
      @include size(100%);

      &:after, &:before {
        @include size(0);
        content: " ";
        position: absolute;
        top: 0;
        right: -17px;
        /* stepper의 height크기 변경 시, border-top 및 border-bottom의 크기 조절 필요*/
        border-top: 29px solid transparent;
        border-bottom: 29px solid transparent;
        border-left: 17px solid #f3f7f8;
        z-index: 2;
      }

      &:before {
        right: auto;
        left: 0;
        border-left: 17px solid #dae4e6;
        z-index: 0;
      }

      &.selected {
        color: #444f57;
        background-color: #e7eff1;

        &:after {
          border-left: 17px solid #e7eff1;
        }

        .ic-unchecked {
          background-image: url('../../assets/images/ic-process-unchecked-selected.svg');
        }
      }

      &.current {
        color: white;
        background-color: #129fc8;

        &:after{
          border-left: 17px solid #129fc8;
        }
      }

      .ic-unchecked {
        @include ic-check;
        background-image: url('../../assets/images/ic-process-unchecked.svg');
      }

      .ic-checked {
        @include ic-check;
        background-image: url('../../assets/images/ic-process-checked.svg');
      }

      .label {
        @include flex-align-center-horizontal-vertical;
        line-height: 58px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
    }

    &:first-child > div:before, &:last-child > div:after {
      border: none;
    }
  }
}
</style>
