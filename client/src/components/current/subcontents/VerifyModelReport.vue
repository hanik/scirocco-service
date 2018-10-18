<template>
  <div id="verifyModel-report">
    <!--검증 결과 리포트 화면-->
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
      <div class="box" v-for="(item, index) in summaries" :key="index">
        <div class="category">{{ item.categoryName }}</div>
        <div class="percentage"><span>{{ item.percentage }}</span>%</div>
      </div>
    </div>

    <div class="result-basic-set">
      <div class="container-icon">
        <div class="ic-status-wrap">
          <img src="../../../assets/images/img-processfin.svg" />
          <div class="ic-process-datachk"></div>
        </div>
        <div class="label-subtitle">{{ labels.basicSet }}</div>
      </div>
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
        <div class="report-info">{{ labels.reportInfo }}</div>
      </div>
    </div>
    <div class="result-task-set">
      <div class="container-icon">
        <div class="ic-status-wrap">
          <img src="../../../assets/images/img-processfin.svg" />
          <div class="ic-process-datachk"></div>
        </div>
        <div class="label-subtitle">{{ labels.taskSet }}</div>
      </div>
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
        <div class="report-info">{{ labels.reportInfo }}</div>
      </div>
    </div>

    <step-contents>
      <template slot="buttons">
        <div>
          <r-button :title="'저장'" :type="'primary'" @button-clicked="saveCurrentModel" />
        </div>
      </template>
    </step-contents>
    <!-- 삭제 예정 -->
    <button v-on:click="saveCurrentModel">다음 화면</button>
  </div>
</template>

<script>
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import { CURRENT, COMMONS } from '@/strings';

const labels = {
  title: CURRENT.STEP_VERIFY_MODEL,
  description: CURRENT.STEP_VERIFY_MODEL_DESCRIPTION,
  korean: COMMONS.LABEL_KOREAN,
  english: COMMONS.LABEL_ENGLISH,
  basicSet: CURRENT.VERITY_REPORT_BASIC,
  taskSet: CURRENT.VERITY_REPORT_TASK,
  reportInfo: CURRENT.VERIFY_REPORT_INFO_TEXT,
  useModelQuest: CURRENT.VERIFY_USE_MODEL_QUEST,
  waiting: CURRENT.VERIFY_WAITING,
  reportWaiting: CURRENT.VERIFY_MODEL_WAITING_MESSAGE,
};

export default {
  name: 'VerifyModelReport',
  components: {
    StepContents,
    RButton,
  },
  props: ['reportDatas', 'reportSummaries'],
  methods: {
    saveCurrentModel() {
      //https://forum.vuejs.org/t/emit-data-between-separate-components/6556
      this.$emit('content');
    },
  },
  data() {
    return {
      labels,
      verifiedBasicSetItems: this.reportDatas,
      verifiedTaskSetItems: this.reportDatas,
      summaries: this.reportSummaries,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#verifyModel-report {
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
    margin-top: 20px;
  }

  .result-basic-set, .result-task-set {
    @include set-area;

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap {
        @include current-container-body-icon-process;
        @include background-spin-image;
        height: 70px;

        & > img {
          @include size(60px);
        }

        .ic-process-datachk {
          @include size(40px);
          background: url("../../../assets/images/ic-process-datachk.svg") round;
        }
      }
    }

    .label-subtitle {
      font-size: 16px;
      font-weight: bold;
      color: #1c75b9;
      margin-bottom: 21px;
    }
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

    .report-info {
      font-size: 12px;
      color: #444f57;
      text-align: right;
      margin-top: 10px;
    }

    &:last-child {
      margin-bottom: 50px;
    }
  }
}
</style>
