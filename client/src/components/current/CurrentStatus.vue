<template>
  <div class="status-container" v-if="loggingIn">
    <span class="logo">
      Sirocco-YC-v3
    </span>
    <div class="status-content">
      <label>생성 일시</label>
      <span class="content-span" id="model-create-date">
        2018-09-17 20:00
      </span>
    </div>
    <div class="status-content">
      <label>종료 일시</label>
      <span class="content-span" id="model-finished-date">
        0000-00-00 00:00
      </span>
    </div>
    <div class="status-content">
      <label>관리자</label>
      <span class="content-span" id="admin-manager">
        icebar2002@gmail.com(service), yclaw01@gmail.com(legal)
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CurrentStatus',
  computed: {
    ...mapGetters({
      loggingIn: 'authentication/isLogin',
    }),
  },
};
</script>

<style scoped lang="scss">
div .status-container {
  width: 100%;
  min-width: 1040px;
  height: 80px;
  display: table;
}
.logo {
  float: left;
  font-size: 20px;
  opacity: 0.4;
  color: #444f57;
  margin-left: 30px;
  margin-top: 15px;
  margin-right: 38px;
}
div .status-content {
  float: left;
  margin-left: 50px;
  margin-top: 15px;
  display: table-cell;
  text-align: left;
  color: #444f57;
  overflow: hidden;
}
.content-span {
  display: flex;
}
</style>
