import { Socket, Server } from 'socket.io';
import { createServer } from 'http';
import express, { Request, Response } from 'express';
import Lobbies from './lobbies';

const app = express();
const http = createServer(app);
const io = new Server(http, { cors: { origin: '*' } });

let lobbies = new Lobbies()

app.get('/', function(req: Request, res: Response) {
    res.send('Hello world!');
});

io.on('connection', function(socket: Socket) {
    console.log('a user ' + socket.id + ' connected');
    let joined = false;
    let lobbyID = '';
    let name = '';
    
    socket.on('setName', function(username: string) {
        console.log(`${socket.id} set to ${username}`);
        name = username;
    });

    socket.on('createLobby', function(words: string[]) {
        console.log(`${socket.id} created a lobby`);
        lobbyID = lobbies.createLobby(words, socket.id);
        socket.join(lobbyID);
        joined = true;
        socket.emit('lobbyCreated', lobbyID);
    });

    socket.on('joinLobby', function(currentLobbyID: string) {
        if (lobbies.joinLobby(currentLobbyID, socket.id, name)) {
            lobbyID = currentLobbyID;
            console.log(`${socket.id} joined ${lobbyID}`);
            socket.join(lobbyID);
            joined = true;
            socket.emit('lobbyJoined', lobbyID);
            if(lobbies.isAdmin(lobbyID, socket.id)) {
                socket.emit('isAdmin');
            }
            io.to(lobbyID).emit('setPlayerList', lobbies.getPlayerNames(lobbyID));
        } else {
            console.log(`${socket.id} failed to join ${lobbyID}`);
            socket.emit('joinFailed');
        }
    });

    socket.on('startLobby', function(currentLobbyID: string) {
        if (lobbies.isAdmin(currentLobbyID, socket.id)) {
            console.log(`${socket.id} started ${currentLobbyID}`);
            lobbies.setStart(currentLobbyID);
            io.to(currentLobbyID).emit('lobbyStarted');
        } else {
            console.log(`${socket.id} failed to start ${lobbyID}`);
        }
    });

    socket.on('getNextWord', function(currentLobbyID: string) {
        console.log(`${socket.id} asked for next word in ${currentLobbyID}`);
        let word = lobbies.getNextWord(currentLobbyID, socket.id);
        if (word) {
            socket.emit('nextWord', word);
        } else {
            socket.emit('noMoreWords');
            lobbies.increasePlayersDone(currentLobbyID, socket.id);
            if(lobbies.isGameFinished(currentLobbyID)) {
                io.to(currentLobbyID).emit('gameFinished');
                //lobbies.resetLobby(currentLobbyID);
            }
        }
    });

    socket.on('askPlayerList', function(currentLobbyID: string) {
        console.log(`${socket.id} asked for player list in ${currentLobbyID}`);
        socket.emit('setPlayerList', lobbies.getScores(currentLobbyID));
    });

    socket.on('addScore', function(currentLobbyID: string, trials: number) {
        console.log(`${socket.id} added ${trials} tries to ${currentLobbyID}`);
        lobbies.addScore(currentLobbyID, socket.id, trials);
        io.to(currentLobbyID).emit('setPlayerList', lobbies.getScores(currentLobbyID));
    });


	socket.on('disconnect', function () {
		console.log(socket.id + ' disconnected');
        if(joined) {
            socket.leave(lobbyID);
            lobbies.removePlayer(lobbyID, socket.id);
            io.to(lobbyID).emit('setPlayerList', lobbies.getPlayerNames(lobbyID));
        }
	});
});

http.listen(3001, function() {
	console.log('listening on *:3001');
});