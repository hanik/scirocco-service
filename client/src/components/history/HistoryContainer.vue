<template>
  <div id="history-container">
    <HistoryStatus />
    <HistoryTable :items="items"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HistoryTable from './HistoryTable.vue';
import HistoryStatus from './HistoryStatus.vue';

export default {
  name: 'History',
  components: {
    HistoryTable,
    HistoryStatus,
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
