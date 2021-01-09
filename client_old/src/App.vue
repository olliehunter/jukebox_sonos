<template>
  <div id="app" class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <Sidebar></Sidebar>
    <!-- <router-view/>
     -->
    </q-layout>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: "RootApp",
  components: {
    Sidebar
  },
  data () {
    return {
      clientWebsocket: null,
      reconnectInterval: null
    }
  },
  methods:{
    addDebugLog(payload) {
      if (this.$store.getters.getDebug === true){
        this.$store.dispatch('addDebugLog', {
          message: payload
        });
      }
    },
    wsConnect(){
        this.addDebugLog("Client is connecting to WS Server")
        this.clientWebsocket = new WebSocket("ws://" + this.$store.getters.getWSServer + ":" + this.$store.getters.getWSPort);
    }
  },
  created() {
    this.wsConnect();
    this.clientWebsocket.onmessage = (event) => {
      this.addDebugLog(event.data);
    };
    this.clientWebsocket.onopen = (event) => {
      clearInterval(this.reconnectInterval);
      this.addDebugLog("Connection was opened with status: " + event.type);
      this.$store.dispatch('setWSStatus', true)
    };
    this.clientWebsocket.onerror = (event) => {
      this.addDebugLog("WS Connection Error:")
      this.addDebugLog(event)
      this.addDebugLog("Closing connection:")    
      this.clientWebsocket.close();
      this.clientWebsocket = null;
    };
    this.clientWebsocket.onclose = (event) => {
      this.$store.dispatch('setWSStatus', false);
      this.addDebugLog("Connection Closed:" + event);
    }
  }
}

</script>

<style>

</style>
