<template>
  <div id="create-model-popup-area">
    <div class="popup">
      <div class="header">
        <div class="header-title">모델 생성</div>
        <div class="ic-close" @click="closePopup"/>
      </div>
      <div class="body">
        <div class="input-group">
          <div class="label"></div>
          <input type="text" />
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
import RButton from '../common/RButton.vue';

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
#create-model-popup-area {
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

  .popup {
    background-color: #fff;
    width: 564px;
    height: 405px;
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
