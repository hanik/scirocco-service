<template>
  <div id="confirm-dialog-area">
    <div class="dialog">
      <div class="header">
        <div class="ic-close" @click="closeDialog"/>
      </div>
      <div class="body">
        {{ message }}
      </div>
      <div class="buttons">
        <RButton :title="'취소'" @button-clicked="closeDialog"/>
        <RButton :title="'확인'" @button-clicked="confirm"/>
      </div>
    </div>
  </div>
</template>

<script>
import RButton from './RButton.vue';

export default {
  name: 'ConfirmDialog',
  props: {
    message: String,
  },
  components: {
    RButton,
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped lang="scss">
#confirm-dialog-area {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  left: 0;
  top: 0;
  z-index: 100;

  .ic-close {
    background-image: url("../../assets/ic-close.svg");
    width: 30px;
    height: 30px;
    background-size: cover;
    cursor: pointer;
  }

  .dialog {
    background-color: #fff;
    width: 430px;
    height: 240px;
    top: calc(50% - 120px);
    left: calc(50% - 215px);
    position: fixed;

    .header {
      height: 70px;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
      align-items: center;
    }

    .body {
      padding-top: 10px;
      height: 50px;
      font-size: 14px;
      line-height: 20px;
    }

    .buttons {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;

      & > :first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
