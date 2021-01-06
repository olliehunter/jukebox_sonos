const ws = require('ws');
const uuid = require('uuid');
const axios = require('axios').default;
const { createWebSocketStream } = require('ws');
const http = require('http');
const events = require('events');
const fs = require('fs');
const express = require('express');
const path = require('path');
// const static = require('node-static');
// const { Http2ServerRequest } = require('http2');

const eventEmitter = new events.EventEmitter();
// EVENTS
// jukeboxStopped - When the status of the jukebox is stopped

const clientApp = express();
clientApp.use('/css', express.static(path.join(__dirname, '../client/dist/css')));
clientApp.use('/fonts', express.static(path.join(__dirname, '../client/dist/fonts')));
clientApp.use('/img', express.static(path.join(__dirname, '../client/dist/img')));
clientApp.use('/js', express.static(path.join(__dirname, '../client/dist/js')));
clientApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

clientApp.listen(3002, () => {
  console.log("Client Server is listening on port 3002");
});

server = http.createServer();
server.listen(3001);

let clients = [];

let wsServerData = {
  jukeboxCreated: false,
  jukebox: {
    name: "",
    master: "",
    secondary: []
  },
  playlist: [],
  clientList: [],
};

//checkstatus and triggers
function checkJukeboxStatus() {
  if (wsServerData.jukeboxCreated) {
    axios.get('http://localhost:5005/' + wsServerData.jukebox.master + '/state').then(resp => {
      if (resp.data.playbackState === 'STOPPED') {
        // console.log('jukebox has stopped - attempting to play next track!');
        eventEmitter.emit('jukeboxStopped');
      } else {
        // console.log('jukebox is playing...');
      }
    }).catch(err => {
      // console.log('error in status check...' + err);
    });
  } else {
      console.log('jukebox not created');
  }
}

setInterval(checkJukeboxStatus, 5000);

const wsServer = new ws.Server({ server });
wsServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
});

wsServer.on('connection', (socket, req) => {
  let ID = uuid.v4();
  let ClientName = 'Anonymous';
  let ClientData = {
    ID: ID,
    ClientName: ClientName
  };
  socket.ID = ID;
  clients.push(socket);
  wsServerData.clientList.push(ClientData);
  socket.send(JSON.stringify(ClientData));
  console.log(wsServerData.clientList);



  //message handler
  socket.on('message', event => {
    let messageContent = JSON.parse(event);
    switch (messageContent.request) {
      case 'changeName':
        if (messageContent.ID) {
          let client = wsServerData.clientList.findIndex(({ ID }) => ID == messageContent.ID);
          wsServerData.clientList[client].ClientName = messageContent.ClientName;
          ClientData.ClientName = messageContent.ClientName;
          socket.send(JSON.stringify(ClientData));
          }
        break;
      
      case 'getJukebox':
        if (!wsServerData.jukeboxCreated) {
          socket.send('{"result": "false"}');
        } else {
          axios.get('http://localhost:5005/' + wsServerData.jukebox.master + '/queue').then(resp => {
            wsServerData.jukebox.playlist = resp.data;
            socket.send(JSON.stringify(wsServerData));
          }).catch(err => {
            console.log('error fetching playlist');
          });
          
        }
        //socket.send(JSON.stringify(wsServerData));
        break;
      
      case 'createJukebox':
        console.log('Creating new Jukebox called: ' + messageContent.name);
        console.log('Master: ' + messageContent.master);
        axios.get('http://localhost:5005/' + messageContent.master + '/state').then(resp => {
          console.log('all ok here!');
          axios.get('http://localhost:5005/' + messageContent.master + '/shuffle/off').then(resp => {
            console.log('shuffle disabled');
            axios.get('http://localhost:5005/' + messageContent.master + '/clearqueue').then(resp => {
              console.log('Queue Cleared');
            }).catch(err => {
              socket.send(`"error": "${err}"`);
            });
          }).catch(err => {
            socket.send(`"error": "${err}"`);
          });
        }).catch(err => {
          socket.send(`"error": "${err}"`);
        });

        console.log('Secondary: ' + messageContent.secondary);
        if (messageContent.secondary) {
          messageContent.secondary.forEach(speaker => {
            axios.get('http://localhost:5005/' + messageContent.master + '/add/' + speaker).then(resp => {
              console.log(`Added ${speaker} to the group!`);
              wsServerData.jukebox.secondary.push(speaker);
            }).catch(err => {
              socket.send(`"error": "${err}"`);
            });
          });
        }
        wsServerData.jukebox.name = messageContent.name;
        wsServerData.jukebox.master = messageContent.master;
        wsServerData.jukeboxCreated = true;
        break;
      
      case 'deleteJukebox':
          //implement
        socket.send('delete jukebox not implemented');
        break;
      
      case 'zoneInfo':
        axios.get('http://localhost:5005/zones').then(resp => {
          resp.data.forEach(speaker => {
            console.log('New Speaker Found: ' + speaker.coordinator.roomName);
            
          });
          socket.send(JSON.stringify(resp.data));
        });
        break;
      
      case 'addSong':
        let newSong = messageContent.data;
        newSong.selectedby = ClientName;
        console.log(newSong);
        wsServerData.playlist.push(newSong);
        eventEmitter.emit('songAdded');
        break;
      default:
        break;
    }
  });
});

function evt_jukeboxStopped() {
    //play next song from playlist
    // help - [array.shift()] - removes first item in array
}

function evt_songAdded() {
  //notify all clients of the new playlist
  console.log('New Song Added: ' + wsServerData.playlist);
  console.log(wsServerData);
}

eventEmitter.on('jukeboxStopped', evt_jukeboxStopped);
eventEmitter.on('songAdded', evt_songAdded);

module.exports = wsServer;