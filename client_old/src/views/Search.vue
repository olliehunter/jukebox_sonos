<template>
  <div id="search">
                <b-input type="text" placeholder="Type Here..." v-model="searchTerm" @keyup.enter.native="search"></b-input>
                <b-button squared block variant="outline-success" @click="search">Search</b-button>
                <b-button squared block variant="outline-warning" @click="clear">Clear</b-button>
        <b-table hover v-if="showResults" :items="searchResults" :fields="tableFields">
            <template #cell(artworkUrl60)="data">
                <img :src=data.value>
            </template>
            <template #cell(trackName)="data">
                <b>{{ data.value }}</b><br>
                <i>{{data.item.collectionName}}</i><br>
                {{data.item.artistName}}
            </template>
            <template #cell(add)="data">
                <b-button variant="info" @click="queueTrack(data.item.trackId)">
                    <i class="fas fa-play-circle"></i>
                </b-button>
            </template>
        </b-table>
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
            tableFields: [
                {
                    key: 'artworkUrl60',
                    label: 'Art',
                    tdClass: 'tableButtonCell',
                    thClass: 'tableHeader'
                },
                {
                    key: 'trackName',
                    label: 'Track',
                    tdClass: "tableText",
                },
                // {
                //     key: 'collectionName',
                //     label: 'Album'
                // },
                // {
                //     key: 'artistName',
                //     label: 'Artist',
                //     tdClass: "tableText"
                // },
                {
                    key: 'Add',
                    label: 'Add',
                    tdClass: "tableButtonCell",
                    thClass: 'tableHeader'
                },
            ]
        }
    },
    methods: {
        search() {
            axios.get("https://itunes.apple.com/search?term=" + this.searchTerm +"&entity=musicTrack&attribute=artistTerm").then(resp => {
                console.log(resp.data.results);
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
        queueTrack(id) {
            console.log("Queue Track - " + id);
        },
        testmethod(){
            this.$store.commit('increment');
            console.log(this.$store.state.counter);
        }
    }

}
</script>

<style>
    .tableText {
        font-size: 14px;
    }
    .tableButtonCell {
        vertical-align: middle !important;
    }
    .tableHeader {
        text-align: center;
    }
</style>