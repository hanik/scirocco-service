<template>
  <div id="create-model-popup-area">
    <div class="popup">
      <div class="header">
        <div class="header-title">모델 생성</div>
        <div class="ic-close" @click="closePopup"/>
      </div>
      <div class="body">
        <div class="input-group">
          <div class="label">모델명</div><input type="text" />
        </div>
        <div class="input-group">
          <div class="label">모델명</div><input type="text" />
        </div>
        <div class="input-group">
          <div class="label">모델명</div><input type="text" />
        </div>
        <div class="input-group">
          <div class="label">모델명</div><input type="text" />
        </div>
      </div>
      <div class="buttons">
        <RButton :title="'취소'" @button-clicked="closePopup"/>
        <RButton :title="'생성'" @button-clicked="create"/>
      </div>
    </div>
  </div>
</template>

<script>
import RButton from '@/components/common/RButton.vue';

export default {
  name: 'CreateModelPopup',
  components: {
    RButton,
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    create() {
      this.$emit('create');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#create-model-popup-area {
  @include popup-background-wrap;

  .ic-close {
    @include size(30px);
    background-image: url("../../assets/ic-close.svg");
    background-size: cover;
    cursor: pointer;
  }

  .popup {
    @include size(564px, 405px);
    background-color: #fff;
    top: calc(50% - 202px);
    left: calc(50% - 282px);
    position: fixed;

    .header {
      height: 70px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      align-items: center;

      .header-title {
        font-size: 22px;
        color: #444f57;
        margin-left: 30px;
      }
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
