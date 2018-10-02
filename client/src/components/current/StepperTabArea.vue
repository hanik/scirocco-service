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
import Status from './CurrentStatus.vue';
import StepperTabList from './StepperTabList.vue';
import StepperTabContents from './StepperTabContents.vue';

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

  #stepper-tab-area {
    font-family: 'Lato', sans-serif;
    margin: 0 auto;
    display: contents;

    .stepper-container {
      display: inline-table;
      height: 400px;
      width: 100%;
      vertical-align: middle;
    }
  }

</style>
