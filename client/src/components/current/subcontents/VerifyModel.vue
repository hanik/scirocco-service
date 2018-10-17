<template>
  <div id="content-verifyModel">
    <!--<verify-model-report />-->
    <verify-model-content />
  </div>
</template>

<script>
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
      status: 0,
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-verifyModel {
}
</style>
