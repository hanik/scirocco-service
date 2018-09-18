<template>
  <!-- Navigator Area -->
  <b-navbar toggleable="md" type="dark" variant="secondary">
    <b-navbar-brand href="#">YC-Admin</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/stepperTabArea">Current</b-nav-item>
        <b-nav-item href="/stepper">History</b-nav-item>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <span style="color: white">icebar2002@gmail.com</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  export default {
    name: "navigator"
  }
</script>

<style scoped>

</style>