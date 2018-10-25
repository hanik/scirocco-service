<template>
  <div id="content-verifyModel">
    <verify-model-content v-if="currentStatusCode === 41" />
    <verify-model-report :reportDatas="reportDatas" :reportSummaries="reportSummaries" :currentStatusCode="currentStatusCode" v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VerifyModelReport from '@/components/current/subcontents/VerifyModelReport.vue';
import VerifyModelContent from '@/components/current/subcontents/VerifyModelContent.vue';

export default {
  name: 'VerifyModel',
  components: {
    VerifyModelReport,
    VerifyModelContent,
  },
  methods: {
    buttonClicked() {
    },
  },
  beforeUpdate() {
    if (this.currentStatusCode === 50) {
      this.$router.push('restartService');
    }
  },
  computed: {
    ...mapGetters({
      reportDatas: 'current/getVerityModelReportDatas',
      reportSummaries: 'current/getVerityModelReportSummaries',
      currentStatusCode: 'current/getCurrentStatusCode',
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-verifyModel {
}
</style>
