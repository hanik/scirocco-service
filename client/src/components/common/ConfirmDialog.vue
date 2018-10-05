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
        <r-button :title="'취소'" @button-clicked="closeDialog"/>
        <r-button :title="'확인'" @button-clicked="confirm"/>
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
      @include flex-align-center-vertical;
      height: 70px;
      justify-content: flex-end;
      padding-right: 20px;
    }

    .body {
      padding-top: 10px;
      height: 50px;
      font-size: 14px;
      line-height: 20px;
    }

    .buttons {
      @include flex-align-center-horizontal-vertical;
      height: 120px;

      & > :first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
