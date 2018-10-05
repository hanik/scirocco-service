<template>
  <div id="stepper-tab-area">
    <Status/>
    <div class="stepper-container">
      <StepperTabList/>
      <StepperTabContents/>
    </div>
  </div>
</template>

<script>
import Status from '@/components/current/CurrentStatus.vue';
import StepperTabList from '@/components/current/StepperTabList.vue';
import StepperTabContents from '@/components/current/StepperTabContents.vue';

export default {
  name: 'StepperTabArea',
  components: {
    StepperTabList,
    StepperTabContents,
    Status,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#stepper-tab-area {
  font-family: 'Lato', sans-serif;
  margin: 0 auto;
  display: contents;

  .stepper-container {
    @include size(100%, 400px);
    display: inline-table;
    vertical-align: middle;
  }
}

</style>
