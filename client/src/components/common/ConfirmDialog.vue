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
import RButton from '@/components/common/RButton.vue';

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
@import '@/assets/mixins.scss';

#confirm-dialog-area {
  @include popup-background-wrap;

  .ic-close {
    @include size(30px);
    background-image: url("../../assets/ic-close.svg");
    background-size: cover;
    cursor: pointer;
  }

  .dialog {
    @include size(430px, 240px);
    background-color: #fff;
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
