<template>
  <div id="step-contents">
    <div class="header">
      <slot name="info"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepContents',
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#step-contents {
  .header {
    & > :first-child {
      font-size: 26px;
      color: #232b31;
    }
    & > :last-child {
      margin-top: 12px;
      white-space: pre;
      font-size: 16px;
      color: rgba(68,79,87,0.6);
      line-height: 24px;
    }
  }

  .body {
    @include flex-align-center-horizontal;

    @mixin bordered-area {
      display: block;
      margin-top: 30px;
      margin-bottom: 40px;
    }

    .single-border {
      @include size(505px, 224px);
      @include bordered-area;
      border: 1px solid #d4d9dc;
      background-color: white;
      position: relative;
      padding-bottom: 30px;
    }

    .double-border {
      @include size(511px, 210px);
      @include bordered-area;
      background-size: contain;
      background: url("../../assets/images/img-step-contents-body-bg.svg") no-repeat;
      padding-bottom: 50px;
    }
  }

  .buttons, .buttons > div {
    @include flex-align-center-horizontal;

    & > div + div {
      margin-left: 10px;
    }
  }
}

</style>
