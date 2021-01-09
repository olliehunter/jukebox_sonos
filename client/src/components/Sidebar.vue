<template>
  <div>
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu"></q-btn>
        <q-toolbar-title class="text-right">Jukebox</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        overlay
        bordered
      >
        <q-scroll-area class="fit" style="margin-top: 200px">
            <q-list>
                <q-item clickable v-ripple to="/">
                    <q-item-section avatar>
                        <q-icon name="home"></q-icon>
                    </q-item-section>
                    <q-item-section>Home</q-item-section>
                </q-item>
                <q-item v-show="this.$store.getters.getJukeboxActive" clickable v-ripple to="search">
                  <q-item-section avatar>
                      <q-icon name="search"></q-icon>
                  </q-item-section>
                  <q-item-section>Search</q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item v-show="debugSwitch" clickable v-ripple to="debug"><q-item-section avatar>
                        <q-icon name="bug_report"></q-icon>
                    </q-item-section>
                    <q-item-section>Debug</q-item-section>
                </q-item>
                <q-item clickable v-ripple to="admin"><q-item-section avatar>
                        <q-icon name="bug_report"></q-icon>
                    </q-item-section>
                    <q-item-section>Admin</q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
        <img class="absolute-top drawLogo" src="@/assets/jukebox.jpeg">
          <div class="absolute-bottom bg-transparent">
            <q-separator></q-separator>
            <div class="on-right text-bold">Jukebox - {{version}}</div>
            <q-toggle class="on-right" v-model="debugSwitch" color="red" label="Debug" left-label></q-toggle>
          </div>
    </q-drawer>
  </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data () {
        return {
         drawer: false,
    }
  },
  computed: {
      debugSwitch: {
          get() { return this.$store.getters.getDebug },
          set(value) {this.$store.dispatch('setDebug', value)}
      },
      version: {
          get() { return this.$store.getters.getAppVersion }
      }
  }
}
</script>

<style>
 .drawLogo {
    height: 190px;
    width: 200px; 
 }
</style>