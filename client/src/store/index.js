import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      version: "0.0.0.2",
      name: "Jukebox",
      wsServer: "homeassistant",
      wsPort: "3001",
      wsConnected: false,
      apiServer: "homeassistant",
      apiPort: 5005
    },
    jukebox: {
      jukeboxCreated: false,
        jukebox: {
          name: "",
          master: "",
          secondary: []
        },
      playlist: [],
      clientList: [],
    },
    client: {
      ID: "",
      name: "Anonymous"
    },
    sonosSystem: [],
    debug: true,
    debuglog: [{}],
    messageTemplate: {
      request: "",
      data: {}
    }

  },
  mutations: {
    setID(state, value) {
      state.client.ID = value;
    },
    setName(state, value) {
      state.client.name = value;
    },
    setJukebox(state, value) {
      state.jukebox = value;
    },
    setSonosSystem(state, value) {
      state.sonosSystem = value;
    },
    setWSStatus(state, value) {
      state.config.wsConnected = value;
    },
    setDebug(state, value) {
      state.debug = value;
    },
    addDebugLog(state, value) {
      state.debuglog.push(value);
    }
  },
  actions: {
    setID({commit}, payload) {
      commit('setID', payload.ID);
    },
    setName({commit}, payload) {
      //add sending message to WS to set name on server
      commit('setName', payload);
    },
    setJukebox({commit}, payload) {
      commit('setJukebox', payload.jukebox);
    },
    setSonosSystem({commit}, payload) {
      commit('setSonosSystem', payload.sonosSystem);
    },
    setWSStatus({commit}, payload) {
      commit('setWSStatus', payload);
    },
    setDebug({commit}, payload) {
      commit('setDebug', payload);
    },
    addDebugLog({ commit }, payload) {
      commit('addDebugLog', payload.message);
    }
  },
  getters: {
    getID(state) {
      return state.client.ID;
    },
    getName(state) {
      return state.client.name;
    },
    getJukebox(state) {
      return state.jukebox;
    },
    getJukeboxActive(state) {
      return state.jukebox.jukeboxCreated;
    },
    getSonosSystem(state) {
      return state.sonosSystem;
    },
    getWSStatus(state) {
      return state.config.wsConnected;
    },
    getPlaylist(state) {
      return state.jukebox.playlist;
    },
    getWSServer(state) {
      return state.config.wsServer;
    },
    getWSPort(state) {
      return state.config.wsPort;
    },
    getDebug(state) {
      return state.debug;
    },
    getDebugLog(state) {
      return state.debuglog;
    }
  },
  modules: {
  }
});
