<template>
  <div id="content-prepareData">
    <step-contents>
      <template slot="info">
        <div>{{ labels.title }}</div>
        <div>{{ labels.description }}</div>
      </template>

      <div class="double-border">
        <div class="container-body" v-if="getStepStatus === 'preparing'" >
          <div class="container-title">
            {{ labels.feedback }}<span class="highlight">&nbsp;{{ prepareInfo.totalCount }}</span>{{ labels.preparing }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="[getStepStatus === 'preparing' ? 'ic-process-datard' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.dataPreparing }}</div>
        </div>
        <div class="container-body" v-if="getStepStatus === 'checking'">
          <div class="container-title">
            {{ labels.checking }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img :class="['spin']" src="../../../assets/images/img-processing-1.svg" />
              <div :class="[getStepStatus === 'checking' ? 'ic-process-datachk' : '']"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.dataChecking }}</div>
        </div>
        <div class="container-body" v-if="getStepStatus === 'screenPrevent'" >
          <div class="container-title">
            {{ labels.waitingFeedback }}
          </div>
          <div class="container-icon">
            <div class="ic-status-wrap">
              <img src="../../../assets/images/img-processfin.svg" />
              <div class="ic-process-datard"></div>
            </div>
          </div>
          <div class="label-status">{{ labels.waiting }}</div>
        </div>
      </div>

      <template slot="buttons">
        <div v-if="getStepStatus === 'preparing'" >
          <r-button :title="'시작'" :type="'primary'" @button-clicked="start" />
        </div>
        <div v-if="getStepStatus === 'checking'">
          <r-button :title="'취소'" :type="'normal'" @button-clicked="cancel" />
          <r-button :title="'재시작'" :type="'disabled'" @button-clicked="start" />
        </div>
        <div v-if="getStepStatus === 'screenPrevent'" >
          <r-button :title="'시작'" :type="'disabled'" />
        </div>
      </template>
    </step-contents>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CURRENT } from '@/strings';
import StepContents from '@/components/current/StepContents.vue';
import RButton from '@/components/common/RButton.vue';
import api from '@/services/api.service';


const labels = {
  title: CURRENT.STEP_PREPARE_DATA,
  description: CURRENT.STEP_PREPARE_DATA_DESCRIPTION,
  feedback: CURRENT.PREPARE_DATA_LABEL_DATA,
  preparing: CURRENT.PREPARE_DATA_LABEL_PREPARING,
  checking: CURRENT.PREPARE_DATA_LABEL_CHECKING,
  dataPreparing: CURRENT.PREPARE_DATA_LABEL_DATA_PREPARE,
  dataChecking: CURRENT.PREPARE_DATA_LABEL_DATA_CHECKING,
  waiting: CURRENT.PREPARE_DATA_WAITING,
  waitingFeedback: CURRENT.PREPARE_DATA_WAITING_FEEDBACK,
};

export default {
  name: 'PrepareData',
  components: {
    StepContents,
    RButton,
  },
  data() {
    return {
      polling: null,
      labels,
    };
  },
  mounted() {
    this.$store.dispatch('current/fetchPrepareInfoAsync');
  },
  computed: {
    ...mapGetters({
      prepareInfo: 'current/getPrepareInfo',
      currentStatusCode: 'current/getCurrentStatusCode',
    }),
    getStepStatus() {
      // preparing(2-1), checking(2-2), screenPrevent(2-3)
      if (this.currentStatusCode === 20) {
        return 'preparing';
      } else if (this.currentStatusCode === 21) {
        this.pollingServer();
        return 'checking';
      }
      return 'screenPrevent';
    },
  },
  methods: {
    pollingServer() {
      this.polling = setInterval(async () => {
        const result = await api.fetchPrepareDataStatus();
        if (result.data === 'DONE') {
          clearInterval(this.polling);
          await this.$store.dispatch('current/setCurrentStatusCode', 31);
          this.$router.push({ path: 'training' });
        }
      }, 5000);
    },
    start() {
      this.$store.dispatch('current/prepareDataStartAsync');
    },
    cancel() {
      clearInterval(this.polling);
      this.$store.dispatch('current/prepareDataCancelAsync');
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#content-prepareData {
  .container-body {
    @include current-container-body;

    .container-title {
      @include current-container-body-title;

      .highlight{
        @include current-container-body-title-highlight;
      }
    }

    .container-icon {
      @include current-container-body-icon;

      .ic-status-wrap {
        @include current-container-body-icon-process;
        @include background-spin-image;

        .ic-process-datard {
          @include size(50px);
          background: url("../../../assets/images/ic-process-datard.svg") no-repeat center;
        }

        .ic-process-datachk {
          @include size(50px);
          background: url("../../../assets/images/ic-process-datachk.svg") no-repeat center;
        }
      }
    }

    .label-status {
      @include current-container-body-label;
    }
  }
}
</style>
