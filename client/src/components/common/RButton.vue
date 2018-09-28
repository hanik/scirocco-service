<template>
  <div id="rbutton">
    <div :style="{width: width+ 'px'}" :class="type"> {{ title }} </div>
  </div>
</template>

<script>
export default {
  name: 'rbutton',
  props: {
    title: {
      type: String,
    },
    width: {
      type: Number,
      default() {
        return 120;
      },
    },
    type: {
      type: String, // primary, normal, disabled
      default() {
        return 'normal';
      },
    },
  },
};
</script>

<style scoped lang="scss">
  #rbutton {
    & > div {
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;

      &.normal {
        background-color: white;
        border: solid 1px #d6dcde;
        color: #444f57
      }

      &.primary {
        background-color: #24435b;
      }

      &.disabled {
        background-color: rgba(36, 67, 91, 0.3);
        cursor: default;
      }
    }
  }
</style>
