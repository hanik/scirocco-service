<template>
  <div id="create-model-popup-area">
    <div class="popup">
      <div class="header">
        <div class="header-title">{{ labels.modelCreate }}</div>
        <div class="ic-close" @click="closePopup"/>
      </div>
      <div class="body">
        <div class="input-group">
          <div class="label">{{ labels.modelName }}</div><input type="text" placeholder="입력해 보아요" />
        </div>
        <div class="input-group">
          <div class="label">{{ labels.createDate }}</div><input type="text" disabled />
        </div>
        <div class="input-group">
          <div class="label">{{ labels.itAdmin }}</div><input type="text" disabled />
        </div>
        <div class="input-group">
          <div class="label">{{ labels.legalAdmin }}</div><input type="text" disabled />
        </div>
      </div>
      <div class="buttons">
        <r-button :title="'취소'" @button-clicked="closePopup"/>
        <r-button :title="'생성'" @button-clicked="create"/>
      </div>
    </div>
  </div>
</template>

<script>
import RButton from '@/components/common/RButton.vue';
import { CURRENT } from '@/strings';

const labels = {
  modelCreate: CURRENT.POPUP_MODEL_CREATE,
  modelName: CURRENT.POPUP_MODEL_NAME,
  createDate: CURRENT.POPUP_MODEL_CREATE_DATE,
  itAdmin: CURRENT.POPUP_ADMIN_IT,
  legalAdmin: CURRENT.POPUP_ADMIN_LEGAL,
};

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
      this.$store.dispatch('current/createModel');
    },
  },
  data() {
    return {
      labels,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#create-model-popup-area {
  @include popup-background-wrap;

  .ic-close {
    @include size(30px);
    background-image: url("../../assets/images/ic-close.svg");
    background-size: cover;
    cursor: pointer;
  }

  .popup {
    @include size(564px, 405px);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    top: calc(50% - 202px);
    left: calc(50% - 282px);
    position: fixed;

    .header {
      @include flex-align-center-vertical;
      justify-content: space-between;
      height: 70px;
      padding-right: 20px;

      .header-title {
        font-size: 22px;
        color: #444f57;
        margin-left: 30px;
        line-height: 33px;
      }
    }

    .body {
      padding: 7px 30px 0 30px;
      height: 210px;

      .input-group + .input-group {
        margin-top: 16px;
      }

      .input-group {
        @include flex-align-center-vertical;

        .label {
          width: 104px;
          line-height: 20px;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: -0.3px;
          color: #444f57;
        }
      }
    }

    .buttons {
      height: 120px;
      @include flex-align-center-horizontal-vertical;

      & > :first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
