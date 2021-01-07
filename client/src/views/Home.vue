<template>
  <div class="home">
    <div v-show="!jukeboxCreated">
      <b-container fluid class="centerAlignText">
        <b-row class="mx-auto">
          <img src="@/assets/jukebox.jpeg" width="350" height="350">
        </b-row>
        <b-row class="mx-auto">
          <h2>waiting for a jukebox to be created...</h2>
        </b-row>
        <b-row class="mx-auto">
          <p>While we wait...</p>
          <p>currently your name is <b>{{requestorName}}</b></p>
          <p>if you want to, you can enter a new name here:</p>
          <b-input type="text" v-model="newName"></b-input>
          <b-button variant="primary" @click="setNewName(newName)">
            Set Name
          </b-button>
        </b-row>
      </b-container> 
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  computed:{
    jukeboxCreated: {
      get() {return this.$store.getters.getJukeboxActive}
    },
    requestorName: {
      get() {return this.$store.getters.getName},
     // set(value) { this.$store.dispatch('setName', value)}
    }
  },
  methods: {
    setNewName(value){ this.$store.dispatch('setName', value)}
  },
  data(){
    return {
      newName: ""
    }
  }
}
</script>
<style scoped>
  .centerAlignText {
    text-align: center;
  };
</style>