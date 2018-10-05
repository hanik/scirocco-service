<template>
  <div id="history-container">
    <HistoryStatus />
    <HistoryTable :items="items"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HistoryTable from '@/components/history/HistoryTable.vue';
import HistoryStatus from '@/components/history//HistoryStatus.vue';

export default {
  name: 'HistoryContainer',
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
