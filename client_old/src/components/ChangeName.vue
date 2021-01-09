<template>
  <div>
      <b-input-group>
          <b-input  size="sm" type="text" v-model="newName"></b-input>
          <b-input-group-append>
              <b-button size="sm" variant="primary" @click="setNewName(newName)">       
                Set Name
               </b-button> 
          </b-input-group-append>
      </b-input-group>    
  </div>
</template>

<script>
export default {
    name: "ChangeName"

}
</script>

<style>

</style>