<template>
  <div id="content-prepareData">
    <step-contents>
      <template slot="info">
        <div>{{ title }}</div>
        <div>{{ description }}</div>
      </template>

      <!--<div class="single-border"> </div>-->
      <div class="double-border"> </div>

      <template slot="buttons">
        <RButton :title="'시작'" :type="'primary'" />
      </template>
    </step-contents>
  </div>
</template>

<script>
import StepContents from './StepContents.vue';
import RButton from '../common/RButton.vue';
import { STRING_CURRENT } from '../../strings';

export default {
  name: 'PrepareData',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      title: STRING_CURRENT.STEP_PREPARE_DATA,
      description: STRING_CURRENT.STEP_PREPARE_DATA_DESCRIPTION,
    };
  },
};
</script>

<style scoped lang="scss">
#content-prepareData {

}
</style>
