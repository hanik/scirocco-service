<template>
  <div id="content-feedback">
    <span>피드백 수집</span>
    <button @click="openDialog()">Confirm Dialog Test</button>
    <confirm-dialog v-show="dialogVisibility"
                    :message="'다음 피드백 수집까지 기다리시겠습니까?'"
                    @close="closeDialog"
                    @confirm="confirm"></confirm-dialog>
  </div>
</template>

<script>
import ConfirmDialog from '../common/ConfirmDialog.vue';

export default {
  name: 'GatherFeedback',
  components: {
    ConfirmDialog,
  },
  methods: {
    openDialog() {
      this.dialogVisibility = true;
    },
    closeDialog() {
      this.dialogVisibility = false;
    },
    confirm() {
      console.log('hi kate');
    },
  },
  data() {
    return {
      dialogVisibility: false,
    };
  },
};
</script>

<style scoped lang="scss">
div {
  background-color: grey;
}
</style>
