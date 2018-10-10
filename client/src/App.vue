<template>
  <div id="app">
    <Navigator/>
    <router-view/>
  </div>
</template>
<script>
import Navigator from '@/components/navi/Navigator.vue';

export default {
  name: 'app',
  components: {
    Navigator,
  },
};
</script>
<style lang="scss">
@import '@/assets/app.scss';
</style>
