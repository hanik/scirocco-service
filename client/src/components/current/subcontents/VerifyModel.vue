<template>
  <div id="content-verifyModel">
    <span>content verify model</span>
    <confirm-dialog v-show="dialogVisibility"
                    :message="'다음 피드백 수집까지 기다리시겠습니까?'"
                    @close="closeDialog"
                    @confirm="confirm"></confirm-dialog>
    <create-model-popup v-show="popupVisibility"
                        @close="closePopup"
                        @create="create"></create-model-popup>
    <span>피드백 수집</span>
    <button @click="openDialog()">Confirm Dialog Test</button>
    <button @click="openPopup()">Create Popup Test</button>
  </div>
</template>

<script>
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import CreateModelPopup from '@/components/current/CreateModelPopup.vue';

export default {
  name: 'VerifyModel',
  components: {
    ConfirmDialog,
    CreateModelPopup,
  },
  methods: {
    openDialog() {
      this.dialogVisibility = true;
    },
    closeDialog() {
      this.dialogVisibility = false;
    },
    openPopup() {
      this.popupVisibility = true;
    },
    closePopup() {
      this.popupVisibility = false;
    },
    confirm() {
      console.log('hi kate');
    },
    create() {
      console.log('how are you');
    },
  },
};
</script>

<style scoped lang="scss">
div {
  background-color: grey;
}
</style>
