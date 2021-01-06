<template>
  <div id="app">
    <Sidebar></Sidebar>
    <router-view/>
    
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: "RootApp",
  components: {
    Sidebar
  }

}

</script>

<style>

</style>
