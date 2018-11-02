<template>
  <div id="history-container">
    <HistoryStatus :historyList="historyList" :selected="selectedItemsIndex"/>
    <HistoryTable :historyList="historyList" @model-checked="selected"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HistoryTable from '@/components/models/HistoryTable.vue';
import HistoryStatus from '@/components/models//HistoryStatus.vue';

export default {
  name: 'HistoryContainer',
  components: {
    HistoryTable,
    HistoryStatus,
  },
  data() {
    return {
      selectedItemsIndex: [],
    };
  },
  mounted() {
    this.$store.dispatch('models/fetchHistoryListAsync');
    this.$store.dispatch('models/fetchServiceModelAsync');
  },
  methods: {
    selected(itemIndex) {
      const { selectedItemsIndex } = this;
      const selected = selectedItemsIndex.indexOf(itemIndex);
      if (selected === -1) {
        selectedItemsIndex.push(itemIndex);
      } else {
        selectedItemsIndex.splice(selected, 1);
      }
    },
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
