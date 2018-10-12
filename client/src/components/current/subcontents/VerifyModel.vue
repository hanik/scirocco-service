<template>
  <div id="content-verifyModel">

    <!--검증 결과 리포트 화면-->
    <div class="report">
      <step-contents>
        <template slot="info">
          <div>{{ labels.title }}</div>
          <div>{{ labels.description }}</div>
        </template>
      </step-contents>
      <div class="header-status-label">
        {{ labels.reportWaiting }}
      </div>

      <div class="summary">
        <div class="box" v-for="(item, index) in summarys" :key="index">
          <div class="category">{{ item.categoryName }}</div>
          <div class="percentage"><span>{{ item.percentage }}</span>%</div>
        </div>
      </div>

      <div class="result-basic-set">
        <div class="ic-something"></div>
        <div class="result-table">
          <div class="table-header">
            <div>{{ labels.korean }}</div>
            <div>{{ labels.english }}</div>
          </div>
          <div class="table-body">
            <div class="table-row" v-for="(item, index) in verifiedBasicSetItems" :key="index">
              <div :class="['table-item', {new: item.isNew}]">{{ item.ko }}</div>
              <div :class="['table-item', {new: item.isNew}]">{{ item.en }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="result-task-set"></div>
    </div>

    <!--검증 단계 화면-->
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


    <!--confirm dialog-->
    <!--<confirm-dialog v-show="dialogVisibility"-->
                    <!--:message="'다음 피드백 수집까지 기다리시겠습니까?'"-->
                    <!--@close="closeDialog"-->
                    <!--@confirm="confirm"></confirm-dialog>-->
    <!--<button @click="openDialog()">Confirm Dialog Test</button>-->
  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import { CURRENT, COMMONS } from '@/strings';

const labels = {
  title: CURRENT.STEP_VERIFY_MODEL,
  description: CURRENT.STEP_VERIFY_MODEL_DESCRIPTION,
  korean: COMMONS.LABEL_KOREAN,
  english: COMMONS.LABEL_ENGLISH,
  useModelQuest: CURRENT.VERIFY_USE_MODEL_QUEST,
  waiting: CURRENT.VERIFY_WAITING,
  reportWaiting: CURRENT.VERIFY_MODEL_WAITING_MESSAGE,
};

// TODO: 사라질 놈들 -> 서버스펙 ㄱㄱ
const datas = [
  { ko: '한글 원본 구문이 여기있고', en: 'English something writing' },
  { ko: '매칭 되는 영어 번역 구문이 우측에 보입니다', en: 'English something writing' },
  { ko: '단어', en: 'Word' },
  { ko: '문장이 길어져서 여러줄이 되는 경우는 이렇게 적용 될 것 같습니다. 문장이 길어져서 여러줄이 되는 경우는 이렇게 적용 될 것 같습니다', en: 'Sentence Sentence Sentence Sentence Sentence Sentence. Sentence Sentence Sentence Sentence Sentence Sentence' },
  { ko: '**기본 Set에 대해 내용을 주시면 제가 여기에다가 써놓도록 할게요!', en: '**English something writing' },
  { ko: '**이전 결과에 대비해 새롭게 바뀐 번역은 이렇게 별도로 표시해주면 어떨까요?', en: '**English something writing. English something writing?', isNew: true },
  { ko: '**기본 Set에 대해 내용을 주시면 제가 여기에다가 써놓도록 할게요!', en: '**English something writing' },
];
const summarys = [
  { categoryName: '이전 모델 대비\n개선도', percentage: 30 },
  { categoryName: '이전 모델 대비\n오류 감소', percentage: 30 },
  { categoryName: '이전 모델 대비\n개선도', percentage: 30 },
  { categoryName: '이전 모델 대비\n오류 감소', percentage: 30 },
];

export default {
  name: 'VerifyModel',
  components: {
    StepContents,
    ConfirmDialog,
  },
  data() {
    return {
      labels,
      dialogVisibility: false,
      status: 0,
      verifiedBasicSetItems: datas,
      verifiedTaskSetItems: datas,
      summarys,
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
@import '@/assets/mixins.scss';

#content-verifyModel {

  .report {
    padding: 0 60px;

    .header-status-label {
      margin-top: 12px;
      font-size: 22px;
      color: #1c75b9;
      line-height: 33px;
    }

    .summary {
      @include flex-align-center-horizontal;
      margin-top: 54px;

      .box + .box {
        margin-left: 10px;
      }

      .box {
        @include size(280px, 108px);
        @include flex-align-center-vertical;
        justify-content: space-between;
        padding-left: 40px;
        padding-right: 32px;
        border: solid 1px #d6dcde;
        color: rgba(68,79,87,0.8);

        .category {
          white-space: pre;
          text-align: left;
          font-size: 16px;
          line-height: 24px;
        }

        .percentage {
          font-size: 20px;

          & > span {
            font-size: 30px;
            margin-right: 2px;
          }
        }
      }
    }

    @mixin set-area {
      margin-top: 50px;
    }

    .result-basic-set {
      @include set-area;
    }

    .result-task-set {
      @include set-area;
    }


    .result-table {

      @mixin table-column-item {
        flex: 1 1 0;
        padding-left: 20px;
        padding-right: 20px;
        text-align: left;
        &:first-child {
          border-right: solid 1px #d6dcde;
        }
      }

      .table-header {
        height: 40px;
        border-top: solid 1px #d6dcde;
        background-color: rgba(243, 247, 248, 0.6);
        display: flex;

        & > div {
          @include table-column-item;
          line-height: 40px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(68,79,87,0.8);
        }
      }

      .table-body {
        .table-row {
          min-height: 48px;
          border-bottom: solid 1px rgba(214, 220, 222, 0.4);
          display: flex;

          &:last-child {
            border-bottom: solid 1px #d6dcde;
          }

          .table-item {
            @include table-column-item;
            padding: 12px 20px;
            line-height: 24px;
            font-size: 16px;
            color: #444f57;

            &.new {
              color: #7fb30b;
            }
          }
        }
      }
    }
  }
}
</style>
