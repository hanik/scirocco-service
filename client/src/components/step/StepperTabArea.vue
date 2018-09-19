<template>
  <div class="container">
    <div class="wrapper">
      <StepperTabList/>
      <StepperTabContents/>
    </div>
  </div>
</template>

<script>
  import StepperTabList from './StepperTabList'
  import StepperTabContents from './StepperTabContents'

  export default {
    name: "stepper-tab-area",
    components: {
      StepperTabList,
      StepperTabContents,
    }
  }
</script>

<style scoped>
  .container {
    font-family: 'Lato', sans-serif;
    margin: 0 auto;
    display: contents;
  }

  .wrapper {
    display: inline-table;
    height: 400px;
    width: 100%;
    vertical-align: middle;
  }
</style>