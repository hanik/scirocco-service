<template>
  <div id="stepper-tab-contents">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'StepperTabContents',
};
</script>

<style scoped lang="scss">

  #stepper-tab-contents {
    height: 550px;
    margin-top: 55px;
  }

</style>
