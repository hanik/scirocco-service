<template>
  <div id="app">
    <Navigator/>
    <Status/>
    <router-view/>
  </div>
</template>
<script>
import Navigator from './components/navi/Navigator.vue';
import Status from './components/status/Status.vue';

export default {
  name: 'app',
  components: {
    Navigator,
    Status,
  },
};
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
