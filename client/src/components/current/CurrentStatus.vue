<template>
  <div class="status-container" v-if="loggingIn">
    <div class="status-content">
      <label>{{ labels.serviceModelName }}</label>
      <span :class="['content-span',  {'no-data': isDateNull(serviceModel.modelName)}]" id="service-model-name">
        {{ modelNameNullCheck(serviceModel.modelName) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.processModelName }}</label>
      <span :class="['content-span',  {'no-data': isDateNull(currentModelStatus.modelName)}]" id="process-model-name">
        {{ modelNameNullCheck(currentModelStatus.modelName) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.createDate }}</label>
      <span :class="['content-span',  {'no-data': isDateNull(currentModelStatus.createDate)}]" id="model-create-date">
        {{ dateNullCheck(currentModelStatus.createDate) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.endDate }}</label>
      <span :class="['content-span',  {'no-data': isDateNull(currentModelStatus.endDate)}]" id="model-finished-date">
        {{ dateNullCheck(currentModelStatus.endDate) }}
      </span>
    </div>
    <div class="status-content">
      <label>{{ labels.manager }}</label>
      <span class="content-span" id="admin-manager">
        {{ currentModelStatus.itAdmin }}, {{ currentModelStatus.legalAdmin }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CURRENT } from '@/strings';

const labels = {
  serviceModelName: CURRENT.STATUS_SERVICE_MODEL_NAME,
  processModelName: CURRENT.STATUS_PROCESS_MODEL_NAME,
  createDate: CURRENT.STATUS_CREATE_DATE,
  endDate: CURRENT.STATUS_END_DATE,
  manager: CURRENT.STATUS_MANAGER,
  defaultDate: CURRENT.STATUS_DEFAULT_DATE,
  defaultModelMessage: CURRENT.STATUS_DEFAULT_MODEL_MESSAGE,
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
      currentModelStatus: 'status/getCurrentModelStatus',
      serviceModel: 'models/getServiceModel',
    }),
  },
  methods: {
    dateNullCheck(date) {
      return !date ? labels.defaultDate : date;
    },
    modelNameNullCheck(modelName) {
      return !modelName ? labels.defaultModelMessage : modelName;
    },
    isDateNull(data) {
      return !data;
    },
  },
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
