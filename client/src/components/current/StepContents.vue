<template>
  <div id="step-contents">
    <div class="header">
      <slot name="info"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div>
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
#step-contents {
  .header {
    & > :first-child {
      font-size: 26px;
      color: #232b31;
      margin-bottom: 12px;
    }
    & > :last-child {
      white-space: pre;
      font-size: 16px;
      color: rgba(68,79,87,0.6);
      margin-bottom: 30px;
    }
  }

  .body {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    .single-border:first-child {
      & {
        display: block;
        width: 505px;
        height: 254px;
        border: 1px solid #d4d9dc;
        background-color: white;
        position: relative;
      }
    }

    .double-border:first-child {
      & {
        display: block;
        width: 505px;
        height: 254px;
        border: 1px solid #d4d9dc;
        background-color: white;
        position: relative;

        &:after {
          content: "";
          position: absolute;
          left: 0;
          width: 505px;
          height: 254px;
          border: 1px solid #d4d9dc;
          margin-left: -6px;
          margin-top: -6px;
          background-color: white;
        }
      }
    }
  }
}

</style>
