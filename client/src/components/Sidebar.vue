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
          <p></p>
          <p></p>
          <p v-show="this.$store.getters.getDebug"><router-link to="/Debug">Debug</router-link></p>
        </div>
        <template #footer="{}">
       <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto">Debug Mode</strong>
        <b-form-checkbox v-model="debug" switch>
        </b-form-checkbox>
       </div>
      </template>
      </b-sidebar>
      <b-navbar-brand class="ml-auto">Jukebox v0.1 <b-badge v-show="!wsServerOnline" variant="danger">offline</b-badge></b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {
  
  name: "Sidebar",
  computed: {
    debug: {
      get() {return this.$store.getters.getDebug},
      set(value) {this.$store.dispatch('setDebug', value)}
    },
    wsServerOnline: {
      get() { return this.$store.getters.getWSStatus},
      // set(value) { this.$store.dispatch('setWSStatus', value)}
    }
  }
}
</script>

<style>
    .sidebar_top{
      position: sticky;
      top: 0
    }
</style>