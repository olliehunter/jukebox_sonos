<template>
 <div>
   <q-layout class="q-pa-md">
    <Sidebar></Sidebar>
    <q-page-container >
      <router-view 
        @createJukebox="createJukebox"
        @addSong="addSong"
      />
    </q-page-container>
   </q-layout>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  name: 'LayoutDefault',
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
    },
    createJukebox(payload){
      console.log("Jukebox Name: " + payload.jukeboxName)
      console.log("primary speaker: " + payload.primarySpeaker);
      console.log("secondary speaker(s): " + payload.secondarySpeakers.length);
      this.clientWebsocket.send(JSON.stringify(
        {
          request: "createJukebox",
          data: {
            name: payload.jukeboxName,
            primary: payload.primarySpeaker,
            secondary: payload.secondarySpeakers
          }
        }
      ))
    },
    addSong(payload){
      this.clientWebsocket.send(JSON.stringify(
        {
          request: "addSong",
          data: payload
        }
      ));
      console.log(payload);
    }
  },
  created() {
    this.wsConnect();
    this.clientWebsocket.onmessage = (event) => {
      this.addDebugLog(event.data);
      this.$store.dispatch('setJukebox', JSON.parse(event.data))
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
    //this.clientWebSocket.send("test message")
  }
}
</script>

<style>
</style>