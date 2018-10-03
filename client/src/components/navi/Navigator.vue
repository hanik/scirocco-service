<template>
  <!-- Navigator Area -->
  <b-navbar toggleable="md" type="dark" variant="secondary">
    <b-navbar-brand>{{ brand }}</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/current">{{ current }}</b-nav-item>
        <b-nav-item href="/history">{{ history }}</b-nav-item>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <span class="span-font-color">icebar2002@gmail.com</span>
          </template>
          <b-dropdown-item href="#">{{ profile }}</b-dropdown-item>
          <b-dropdown-item href="/login">{{ signout }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { STRING_COMMONS } from "../../strings";

export default {
  name: 'Navigator',
  data() {
    return {
      brand: STRING_COMMONS.LABEL_BRAND,
      current: STRING_COMMONS.LABEL_CURRENT,
      history: STRING_COMMONS.LABEL_HISTORY,
      profile: STRING_COMMONS.LABEL_PROFILE,
      signout: STRING_COMMONS.LABEL_SINGOUT,
    };
  },
};
</script>

<style scoped lang="scss">
.span-font-color {
  color: white;
}

</style>
