<template>
  <div class="home">
    <div v-show="!this.$store.getters.getJukeboxActive">
      The jukebox isn't currently active
      <br>
      Please wait...
    </div>
    <div v-show="this.$store.getters.getJukeboxActive">
      You are connected to the {{this.$store.getters.getJukeboxName}} Jukebox
      <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
      <q-item>
        <q-item-section>
          <q-item-label>Currently Playing</q-item-label>
          <q-item-label caption>{{currentlyPlaying.currentTrack.title}} - {{currentlyPlaying.currentTrack.artist}}</q-item-label>
        </q-item-section>
      </q-item>

      <img :src="currentlyPlaying.currentTrack.absoluteAlbumArtUri">
    </q-card>
      </div>
      <q-table
        title="Up Next..."
        :data="playlist"
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
            <q-td style="white-space: normal" :props="data">
                <div>
                    <b>{{data.row.trackName}}</b><br>
                    <i>{{data.row.collectionName}}</i><br>
                    {{data.row.artistName}}
                </div>
            </q-td>
        </template>
    </q-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      columns: [
                {name: "artwork", label: "Art", align:"left", headerStyle: 'max-width: 60px'},
                {name: "trackName", label: "Track", align:"left", headerStyle: 'max-width: 100px'}
            ],
    }
  },
  computed: {
    playlist: {
      get() { return this.$store.getters.getPlaylist}
    },
    currentlyPlaying:{
      get() { return this.$store.getters.getCurrentlyPlaying}
    }
  }
}
</script>
