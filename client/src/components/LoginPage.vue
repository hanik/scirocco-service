<template>
  <div>
    <!--<div class="alert alert-info">-->
      <!--Username: test<br />-->
      <!--Password: test-->
    <!--</div>-->
    <h2 class="header-style">로그인이 필요합니다.</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <div class="form-group">
          <!--<label htmlFor="username">Username</label>-->
          <input type="text" v-model="username" name="username" class="form-control input-style" :class="{ 'is-invalid': submitted && !username }" placeholder="이메일 주소를 입력하세요"/>
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">
          <!--<label htmlFor="password">Password</label>-->
          <input type="password" v-model="password" name="password" class="form-control input-style" :class="{ 'is-invalid': submitted && !password }" placeholder="비밀번호를 입력하세요"/>
          <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="loggingIn">Login</button>
          <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
      </div>
    </form>
      <RButton :title="'대체 왜?'" :width="120" :type="'normal'" ></RButton>
  </div>
</template>

<script>
import RButton from './common/RButton.vue';

export default {
  components: {
    RButton,
  },
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {
    // reset login status
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch('authentication/login', { username, password });
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .header-style {
    margin-top: 215px;
  }
  .input-container {
    width: 400px;
    margin-top: 40px;
    display: inline-table;
    vertical-align: center;

    .input-style {
      min-width: 400px;
    }

  }
</style>