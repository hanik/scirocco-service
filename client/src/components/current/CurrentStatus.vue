<template>
  <div class="status-container" v-if="loggingIn">
    <div class="status-content">
      <label>{{ labels.modelName }}</label>
      <span :class="['content-span',  {'no-data': dateNullCheckOnSpan(processingModel)}]" id="model-name">
        {{ modelNameNullCheck(processingModel) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.createDate }}</label>
      <span :class="['content-span',  {'no-data': dateNullCheckOnSpan(createDate)}]" id="model-create-date">
        {{ dateNullCheck(createDate) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.endDate }}</label>
      <span :class="['content-span',  {'no-data': dateNullCheckOnSpan(endDate)}]" id="model-finished-date">
        {{ dateNullCheck(endDate) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.manager }}</label>
      <span class="content-span" id="admin-manager">
        icebar2002@gmail.com(service), yclaw01@gmail.com(legal)
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CURRENT } from '@/strings';

const labels = {
  modelName: CURRENT.STATUS_PROCESS_NAME,
  createDate: CURRENT.STATUS_CREATE_DATE,
  endDate: CURRENT.STATUS_END_DATE,
  manager: CURRENT.STATUS_MANAGER,
};

export default {
  name: 'CurrentStatus',
  data() {
    return {
      labels,
      manager: '',
    };
  },
  computed: {
    ...mapGetters({
      loggingIn: 'authentication/isLogin',
      processingModel: 'status/getModelName',
      createDate: 'status/getCreateDate',
      endDate: 'status/getEndDate',
    }),
  },
  methods: {
    dateNullCheck(date) {
      return !date ? '0000-00-00 00:00': date
    },
    modelNameNullCheck(modelName) {
      return !modelName ? '새 모델을 생성하세요': modelName
    },
    dateNullCheckOnSpan(date) {
      return date == null ? true : false
    },
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

div .status-container {
  @include size(100%, 80px);
  min-width: 1040px;
  display: table;
}

div .status-content {
  float: left;
  margin-left: 50px;
  margin-top: 15px;
  display: table-cell;
  text-align: left;
  font-size: 14px;
  color: #444f57;
  overflow: hidden;
  line-height: 1.71;

  &:first-child {
    margin-left: 30px;
    margin-right: 30px;
    min-width: 123px;
  }
}
.content-span {
  display: flex;

  &.no-data {
    opacity: 0.4;
  }
}
</style>
