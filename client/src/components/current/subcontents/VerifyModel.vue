<template>
  <div id="content-verifyModel">
    <!--<step-contents>-->
      <!--<template slot="info">-->
        <!--<div>{{ labels.title }}</div>-->
        <!--<div>{{ labels.description }}</div>-->
      <!--</template>-->

      <!--<div class="single-border">-->
        <!--<div class="container-body">-->
          <!--<div class="container-title">-->
            <!--{{ labels.useModelQuest }}-->
          <!--</div>-->

        <!--</div>-->
      <!--</div>-->

      <!--<template slot="buttons">-->
        <!--<r-button :title="'피드백 적용'" :type="'primary'" @button-clicked="openPopup()" />-->
      <!--</template>-->
    <!--</step-contents>-->
    <!--<confirm-dialog v-show="dialogVisibility"-->
                    <!--:message="'다음 피드백 수집까지 기다리시겠습니까?'"-->
                    <!--@close="closeDialog"-->
                    <!--@confirm="confirm"></confirm-dialog>-->
    <!--<span>피드백 수집</span>-->
    <!--<button @click="openDialog()">Confirm Dialog Test</button>-->
  </div>
</template>

<script>
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import { CURRENT } from '@/strings';

const labels = {
  title: CURRENT.STEP_VERIFY_MODEL,
  description: CURRENT.STEP_VERIFY_MODEL_DESCRIPTION,
  useModelQuest: CURRENT.VERIFY_USE_MODEL_QUEST,
  waiting: CURRENT.VERIFY_WAITING,
};

export default {
  name: 'VerifyModel',
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      labels,
      dialogVisibility: false,
    };
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
};
</script>

<style scoped lang="scss">

</style>
