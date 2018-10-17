<template>
  <div id="verifyModel-content">
    <!--검증 단계 화면-->
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="single-border">
        <div class="container-body"  v-if="status === 'waiting'">
          <div class="container-title">
            {{ labels.useModelQuest }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processfin.svg" />
              <div :class="'ic-inner-item'"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.waiting }}</div>
        </div>
        <div class="container-body" v-if="status === 'updating'">
          <div class="container-title">
            {{ labels.updateMessage }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="'ic-inner-item'"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.updating }}{{ remainTime }}</div>
        </div>
      </div>

      <template slot="buttons">
        <div v-if="status === 'waiting'" >
          <r-button :title="'취소'" :type="'normal'" @button-clicked="openDialog" />
          <r-button :title="'사용'" :type="'primary'" @button-clicked="updateCurrentModel" />
        </div>
        <div v-if="status === 'updating'">
          <r-button :title="'취소'" :type="'normal'" @button-clicked="cancelUpdateCurrentModel" />
          <r-button :title="'재시작'" :type="'disabled'" @button-clicked="restart" />
        </div>
      </template>
    </step-contents>
    <!--confirm dialog-->
    <confirm-dialog v-show="dialogVisibility"
                    :message="labels.waitingFeedback"
                    @close="closeDialog"
                    @confirm="confirm"></confirm-dialog>
    <!-- 삭제 예정 -->
    <button v-on:click="moveNext">다음 화면</button>
  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import RButton from '@/components/common/RButton.vue';
import { CURRENT, COMMONS } from '@/strings';

const labels = {
  korean: COMMONS.LABEL_KOREAN,
  english: COMMONS.LABEL_ENGLISH,
  waitingFeedback: COMMONS.MESSAGE_WAITING_FEEDBACK,

  title: CURRENT.STEP_VERIFY_MODEL,
  description: CURRENT.STEP_VERIFY_MODEL_DESCRIPTION,

  useModelQuest: CURRENT.VERIFY_USE_MODEL_QUEST,
  waiting: CURRENT.VERIFY_WAITING,

  reportWaiting: CURRENT.VERIFY_MODEL_WAITING_MESSAGE,
  updating: CURRENT.VERIFY_UPDATING,
  updateMessage: CURRENT.VERIFY_UPDATING_MESSAGE,
};

export default {
  name: 'verify-model-content',
  components: {
    StepContents,
    ConfirmDialog,
    RButton,
  },
  data() {
    return {
      labels,
      dialogVisibility: false,
      status: 'waiting', // updating/waiting
      remainTime: '(6시간)',
    };
  },
  methods: {
    cancelUpdateCurrentModel() {
      // TODO request cancel update model
    },
    restart() {
      console.log('restart')
    },
    updateCurrentModel() {
      this.status = 'updating';
    },
    openDialog() {
      this.dialogVisibility = true;
    },
    closeDialog() {
      this.dialogVisibility = false;
    },
    confirm() {
      this.$router.push('feedback');
      this.$store.dispatch('current/setCurrentStep', 'step-feedback');
    },
    // 삭제 예정
    moveNext() {
      this.$router.push('restartService');
      //current.module의 해당 api로 이동필요
      this.$store.dispatch('current/setCurrentStep', 'step-restartService');
    },

  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#verifyModel-content {
  .container-body {
    @include current-container-body;

    .container-title {
      @include current-container-body-title;
      white-space: pre-line;
      display: inline;

      .highlight {
        @include current-container-body-title-highlight;
      }
    }

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap {
        @include current-container-body-icon-process;
        @include background-spin-image;

        .ic-inner-item {
          @include size(50px);
          background: url("../../../assets/images/ic-process-svcup.svg") no-repeat center;
        }
      }
    }

    .label-status {
      @include current-container-body-label;
    }
  }
}
</style>
