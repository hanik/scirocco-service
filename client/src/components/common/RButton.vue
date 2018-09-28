<template>
  <div id="rbutton">
    <div :style="{width: width+ 'px'}" :class="type" v-on:click="buttonClicked"> {{ title }} </div>
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
  methods: {
    buttonClicked() {
      if (this.type !== 'disabled') {
        this.$emit('button-clicked');
      }
    },
  },
};
</script>

<style scoped lang="scss">
  #rbutton {
    justify-content: center;
    display: flex;

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
