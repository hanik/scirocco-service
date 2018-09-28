<template>
  <div id="history-container">
    <HistoryTable :items="items"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HistoryTable from './HistoryTable.vue';

export default {
  name: 'History',
  components: {
    HistoryTable,
  },
  computed: {
    ...mapGetters({
      items: 'getHistoryItems',
    }),
  },
};
</script>

<style scoped lang="scss">
  #history-container {
    padding: 0 60px;
  }
</style>
