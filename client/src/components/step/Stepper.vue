<template>
  <form-wizard>
    <tab-content title="Personal details">
      <HelloWorld></HelloWorld>
    </tab-content>
    <tab-content title="Additional Info">
      My second tab content
    </tab-content>
    <tab-content title="Last step">
      Yuhuuu! This seems pretty damn simple
    </tab-content>
  </form-wizard>

</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import HelloWorld from '../HelloWorld.vue';

export default {
  name: 'stepper',
  components: {
    FormWizard,
    TabContent,
    HelloWorld,
  },
  props: {
    title: {
      type: String,
      default: 'Awesome Wizard',
    },
    subtitle: {
      type: String,
      default: 'Split a complicated flow in multiple steps',
    },
    nextButtonText: {
      type: String,
      default: 'Next',
    },
    backButtonText: {
      type: String,
      default: 'Back',
    },
    finishButtonText: {
      type: String,
      default: 'Finish',
    },
    stepSize: {
      type: String,
      default: 'md',
      validator: (value) => {
        const acceptedValues = ['xs', 'sm', 'md', 'lg'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    /** *
       *  Sets validation (on/off) for back button. By default back button ignores validation
       */
    validateOnBack: Boolean,
    /** *
       * Applies to text, border and circle
       */
    color: {
      type: String,
      default: '#e74c3c', // circle, border and text color
    },
    /** *
       *  Is set to current step and text when beforeChange function fails
       */
    errorColor: {
      type: String,
      default: '#8b0000',
    },
    /**
       * Can take one of the following values: 'circle|square|tab`
       */
    shape: {
      type: String,
      default: 'circle',
    },
    /**
       * name of the transition when transition between steps
       */
    transition: {
      type: String,
      default: '', // name of the transition when transition between steps
    },
    /** *
       * Index of the initial tab to display
       */
    startIndex: {
      type: Number,
      default: 0,
    },
  },
};

</script>

<style scoped>

</style>