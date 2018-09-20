<template>
  <div id="stepper-tab-list">
    <div v-for="(value, key) in steps" class="step" :key="key">
      <div :class="[{current: selected === key}]" :id="key" @click="select($event)">
        <span> {{ value }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'stepper-tab-list',
  data() {
    return {
      steps: {
        'step-feedback': '피드백 수집',
        'step-prepareData': 'Data 준비 / 검증',
        'step-learning': '학습과 적용',
        'step-verifyModel': '모델 검증',
        'step-restartService': '서비스 재시작',
      },
      selected: 'step-feedback',
    };
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
  #stepper-tab-list {

    min-width: 1400px;
    display: flex;

    &:after {
      clear: both;
      content: "";
      display: block;
      height: 0;
    }

    & .step {
      flex: 1 1 276px;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: #444f57;
      cursor: pointer;
      margin: 0 1px;
      float: left;
      position: relative;
      background-color: #f3f7f8;
      border-bottom: solid 1px #dae4e6;
      border-top: solid 1px #dae4e6;
      user-select: none;
      transition: background-color 0.2s ease;

      & > div {
        width: 100%;
        height: 100%;

        &.current {
          color: #ffffff;
          background-color: #129fc8;

          &:after {
            border-left: 17px solid #129fc8;
          }
        }

        &:after, &:before {
          content: " ";
          position: absolute;
          top: 0;
          right: -17px;
          width: 0;
          height: 0;
          /* stepper의 height크기 변경 시, border-top 및 border-bottom의 크기 조절 필요*/
          border-top: 29px solid transparent;
          border-bottom: 29px solid transparent;
          border-left: 17px solid #f3f7f8;
          z-index: 2;
        }

        &:before {
          right: auto;
          left: 0;
          border-left: 17px solid #fff;
          z-index: 0;
        }

        & span {
          position: relative;

          &:before {
            opacity: 0;
            content: "✔";
            position: absolute;
            top: -2px;
            left: -20px;
          }
        }
      }

      &:first-child > div {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-left: solid 1px #dae4e6;

        &:before {
          border: none;
        }
      }

      &:last-child > div {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: solid 1px #dae4e6;

        &:after {
          border: none;
        }
      }
    }
  }
</style>
