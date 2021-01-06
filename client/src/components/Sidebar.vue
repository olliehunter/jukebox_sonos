<template>
  <div id="sidebar" class="sidebar_top">
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-button variant="info" v-b-toggle.sidebar-1>
        <i class="fas fa-list-ul"></i>
        </b-button>
      <b-sidebar id="sidebar-1" title="Menu" bg-variant="dark" text-variant="light" shadow width="50%" z-index="10">
        <div class="px-3 py-2">
          <p><router-link to="/">Home</router-link></p>
          <p><router-link to="/Search">Search</router-link></p>
        </div>
      </b-sidebar>
      <b-navbar-brand class="ml-auto">Jukebox v0.1</b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .sidebar_top{
      position: sticky;
      top: 0
    }
</style>