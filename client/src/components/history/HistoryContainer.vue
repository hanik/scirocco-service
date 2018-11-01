<template>
  <div id="history-container">
    <HistoryStatus />
    <HistoryTable :historyList="historyList"/>
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
  mounted() {
    this.$store.dispatch('models/fetchHistoryListAsync');
    this.$store.dispatch('models/fetchServiceModelAsync');
  },
  computed: {
    ...mapGetters({
      historyList: 'models/getHistoryList',
    }),
  },
};
</script>

<style scoped lang="scss">
  #history-container {
    padding: 0 60px;
  }
</style>
