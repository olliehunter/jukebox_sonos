<template>
  <div>
    <div v-show="!this.$store.getters.getJukeboxActive">
      <q-input v-model="jukeboxName" label="Jukebox Name" />
      <q-select v-model="primarySpeaker" :options="sonosZones" label="Select Primary Speaker" />
      <br>Select the secondary speakers (optional)
      <q-list v-for="speaker in sonosZones" :key="speaker">
        <q-item v-show="speaker != primarySpeaker " tag="label" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="secondarySpeakers" :val=speaker color="teal" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{speaker}}</q-item-label>
        </q-item-section>
      </q-item>
      </q-list>
      <q-btn @click="$emit('createJukebox' , {jukeboxName, primarySpeaker, secondarySpeakers})" v-show="primarySpeaker != ''" color="deep-orange" glossy label="Create Jukebox" />
      <br><br><q-btn @click="connectSonos" color="deep-orange" glossy label="refresh" />
    </div>
    <div v-show="this.$store.getters.getJukeboxActive">
      Jukebox is active
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "Admin",
    data() {
      return {
        sonosZones: [],
        primarySpeaker:"",
        secondarySpeakers:[],
        jukeboxName: ""
      }
    },
    mounted() {
      this.connectSonos();
    },
    methods: {
  //     createJukebox(){
  //       this.$emit('createJukebox', 
  //       JSON.stringify({
  //         request: "createJukebox",
  //         data: {
  //           clientID: this.$store.getters.getID,
  //           primary: this.primarySpeaker,
  //           secondary: this.secondarySpeakers
  //         }
  //     }))
  //   }
      connectSonos() {
      axios.get('http://' + this.$store.getters.getAPIServer + ":" + this.$store.getters.getAPIPort + "/zones")
      .then(resp => {
        resp.data.forEach(zone => {
          this.sonosZones.push(zone.coordinator.roomName)
        });
        
      }).catch(err => {
        this.$store.dispatch('addDebugLog', {
          message: err
        });
      })
    },
   }
}
</script>

<style lang="scss" scoped>

</style>