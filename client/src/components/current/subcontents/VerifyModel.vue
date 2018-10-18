<template>
  <div id="content-verifyModel">
    <verify-model-report :reportDatas="reportDatas" :reportSummaries="reportSummaries" v-if="status === 'report'"/>
    <verify-model-content v-if="status === 'content'" />
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
  data() {
    return {
      status: 'report', // report / content
    };
  },
  methods: {
    buttonClicked() {
      console.log("???")
    },
  },
  computed: {
    ...mapGetters( {
      reportDatas: 'current/getVerityModelReportDatas',
      reportSummaries: 'current/getVerityModelReportSummaries',
    })
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-verifyModel {
}
</style>
