<template>
  <div>
    <q-input bottom-slots v-model="searchTerm" v-on:keyup.enter="search" label="Search" dense>
    <template v-slot:prepend>
        <q-icon name="library_music" />
    </template>
    <template v-slot:append>
        <q-icon name="close" @click="searchTerm = ''" class="cursor-pointer" />
    </template>
    <template v-slot:after>
        <q-btn round dense flat icon="send" @click="search" />
    </template>
    </q-input>
    <q-table
    v-show="showResults"
    title="Results"
    :data="searchResults"
    :columns="columns"
    row-key="trackId"
    class="table-responsive"
    :pagination={rowsPerPage:0}
    >
        <template v-slot:body-cell-artwork="data">
            <q-td :props="data">
                <div>
                    <q-img :src="data.row.artworkUrl100" height="60px" width="60px"/>
                </div>
            </q-td>
        </template>
        <template v-slot:body-cell-trackName="data">
            <q-td style="white-space: normal" :props="data" @click="selectTrack(data.row)">
                <div>
                    <b>{{data.row.trackName}}</b><br>
                    <i>{{data.row.collectionName}}</i><br>
                    {{data.row.artistName}}
                </div>
            </q-td>
        </template>
    </q-table>
    <q-dialog v-model="card" >
      <q-card class="my-card" style="width:300px;max-width=300px">
        <q-img :src="selectedTrack.artworkUrl100" />
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col ellipsis" style="white-space: normal">
                <b>{{selectedTrack.trackName}}</b><br>
                <i>{{selectedTrack.collectionName}}</i><br>
                {{selectedTrack.artistName}}<br>
                <sub>Release Date: {{selectedTrack.releaseDate | formatDate}}</sub>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Queue this Track" @click="queueTrack(selectedTrack)" />
          <q-btn v-close-popup flat color="primary" icon="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Search",
    data() {
        return{
            searchTerm: "",
            searchResults: [],
            showResults: false,
            columns: [
                {name: "artwork", label: "Art", align:"left", headerStyle: 'max-width: 60px'},
                {name: "trackName", label: "Track", align:"left", headerStyle: 'max-width: 100px'}
            ],
            selectedTrack:{},
            carousel: false,
            card: false,
        }
    },
    methods: {
        search() {
            axios.get("https://itunes.apple.com/search?term=" + this.searchTerm +"&entity=musicTrack&attribute=artistTerm").then(resp => {
                this.searchResults = resp.data.results;
                this.showResults = true
            }).catch(err => {
                console.log(err);
            });
        },
        clear() {
            this.searchTerm = "";
            this.searchResults = [];
            this.showResults = false;
            this.testmethod();
        },
        selectTrack(data) {
            this.selectedTrack = data;
            this.card = true;
        },
        queueTrack(payload){
            this.$emit('addSong', payload)
            console.log("Queueing Track " + payload.trackId)
        }
    }
}
</script>

<style>

</style>