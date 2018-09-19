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
    width: auto;
    margin: 0 auto;
  }

  .wrapper {
    display: inline-table;
    height: 400px;
    vertical-align: middle;
  }
</style>