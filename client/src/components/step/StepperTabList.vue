<template>
  <div class="arrow-steps clearfix">
    <div class="step" :class="[{current:selected == 'step-feedback'}]" id="step-feedback" @click="select($event)">
      <span> 피드백 수집 </span>
    </div>
    <div class="step" :class="{current:selected == 'step-prepareData'}" id="step-prepareData" @click="select($event)">
      <span>Data 준비 / 검증</span>
    </div>
    <div class="step" :class="{current:selected == 'step-learning'}" id="step-learning" @click="select($event)">
      <span>학습과 적용</span>
    </div>
    <div class="step" :class="{current:selected == 'step-verifyModel'}" id="step-verifyModel" @click="select($event)">
      <span>모델 검증</span>
    </div>
    <div class="step" :class="{current:selected == 'step-restartService'}" id="step-restartService" @click="select($event)">
      <span>서비스 재시작</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "stepper-tab-list",
    data() {
      return {
        selected: 'step-feedback',
      }
    },
    methods: {
      select: function(event) {
        var targetId = event.currentTarget.id;
        this.selected = targetId
        this.$router.push({
          name: targetId
        })
      }
    }
  }

</script>

<style scoped>
  .clearfix:after {
    clear: both;
    content: "";
    display: block;
    height: 0;
  }
  a, a:active {
    color: #333;
    text-decoration: none;
  }

  a:hover {
    color: #999;
  }

  /* Breadcrups CSS */
  .arrow-steps {
    min-width: 1400px;
  }
  .arrow-steps .step {
    height: 60px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    font-style: normal;
    font-stretch: normal;
    color: #444f57;
    cursor: pointer;
    margin: 0 1px;
    padding-top: 18px;
    min-width: 276px;
    float: left;
    position: relative;
    background-color: #f3f7f8;
    border-bottom: solid 1px #dae4e6;
    border-top: solid 1px #dae4e6;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background-color 0.2s ease;
  }

  .arrow-steps .step:after,
  .arrow-steps .step:before {
    content: " ";
    position: absolute;
    top: 0;
    right: -17px;
    width: 0;
    height: 0;
    /* stepper의 height크기 변경 시, border-top 및 border-bottom의 크기 조절 필요*/
    border-top: 29px solid transparent;
    border-bottom: 29px solid transparent;
    border-left: 17px solid #f3f7f8;
    z-index: 2;
    transition: border-color 0.2s ease;
  }

  .arrow-steps .step:before {
    right: auto;
    left: 0;
    border-left: 17px solid #fff;
    z-index: 0;
  }

  .arrow-steps .step span {
    position: relative;
  }

  .arrow-steps .step span:before {
    opacity: 0;
    content: "✔";
    position: absolute;
    top: -2px;
    left: -20px;
  }

  .arrow-steps .step.done span:before {
    opacity: 1;
    -webkit-transition: opacity 0.3s ease 0.5s;
    -moz-transition: opacity 0.3s ease 0.5s;
    -ms-transition: opacity 0.3s ease 0.5s;
    transition: opacity 0.3s ease 0.5s;
  }

  .arrow-steps .step.current {
    color: #ffffff;
    background-color: #129fc8;
  }

  .arrow-steps .step.current:after {
    border-left: 17px solid #129fc8;
  }


  .arrow-steps .step:first-child:before {
    border: none;
  }
  .arrow-steps .step:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-left: solid 1px #dae4e6;
  }
  .arrow-steps .step:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right: solid 1px #dae4e6;
  }
  .arrow-steps .step:last-child:after {
    border: none;
  }

</style>