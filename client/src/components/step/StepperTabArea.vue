<template>
  <div id="stepper-tab-area">
    <Status/>
    <div class="wrapper">
      <StepperTabList/>
      <StepperTabContents/>
    </div>
  </div>
</template>

<script>
import Status from '../status/Status.vue';
import StepperTabList from './StepperTabList.vue';
import StepperTabContents from './StepperTabContents.vue';

export default {
  name: 'stepper-tab-area',
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

    .wrapper {
      display: inline-table;
      height: 400px;
      width: 100%;
      vertical-align: middle;
    }
  }

</style>
