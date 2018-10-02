<template>
  <!-- Navigator Area -->
  <b-navbar toggleable="md" type="dark" variant="secondary">
    <b-navbar-brand href="#">YC-Admin</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/current">Current</b-nav-item>
        <b-nav-item href="/history">History</b-nav-item>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <span class="span-font-color">icebar2002@gmail.com</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navigator',
};
</script>

<style scoped lang="scss">
.span-font-color {
  color: white;
}

</style>
