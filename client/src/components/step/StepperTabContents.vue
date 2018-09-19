<template>
  <div>
    <ContentGatherFeedback/>
    <ContentPrepareData/>
    <ContentLearning/>
    <ContentVerifyModel/>
    <ContentRestartService/>
  </div>
</template>

<script>
  import ContentGatherFeedback from './ContentGatherFeedback'
  import ContentLearning from './ContentLearning'
  import ContentPrepareData from './ContentPrepareData'
  import ContentVerifyModel from './ContentVerifyModel'
  import ContentRestartService from './ContentRestartService'

  export default {
    name: "stepper-tab-contents",
    components: {
      ContentRestartService,
      ContentVerifyModel,
      ContentPrepareData,
      ContentLearning,
      ContentGatherFeedback,
    }
  }
</script>

<style scoped>
div {
  margin-top: 40px;
}
</style>