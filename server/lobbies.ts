interface Lobby {
	id: string;
    words: string[];
    players: Player[];
    isStarted: boolean;
    isFinished: boolean;
    admin: string;
    playersDone: number;
}

interface Player {
    id: string;
    score: number;
    name: string;
    progress: number;
    isDone: boolean;
}

export default class Lobbies {
    lobbies: Map<string, Lobby>;

    constructor() {
        this.lobbies = new Map<string, Lobby>();
    }

    createLobby(words: string[], adminID: string): string {
        let lobby = { 
			id: this.generateID(),
            words: words,
            players: [],
            isStarted: false,
            isFinished: false,
            admin: adminID,
            playersDone: 0
		};
        this.lobbies.set(lobby.id, lobby);
        return lobby.id;
    }

    joinLobby(lobbyID: string, playerID: string, name: string): boolean {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby && !lobby.isStarted) {
            //if name exists
            if (lobby.players.findIndex(player => player.name === name) !== -1) {
                return false;
            }
            lobby.players.push({
                id: playerID,
                score: 0,
                name: name,
                progress: 0,
                isDone: false
            });
            return true
        }
        return false
    }

    removePlayer(lobbyID: string, playerID: string): boolean {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            console.log(lobby)
            lobby.players = lobby.players.filter(player => player.id !== playerID);
            return true
        }
        return false
    }

    setStart(lobbyID: string): boolean {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            lobby.isStarted = true;
            return true
        }
        return false
    }

    getNextWord(lobbyID: string, playerID: string): boolean | string {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            let playerIndex = lobby.players.findIndex(player => player.id === playerID);
            if (lobby.players[playerIndex]) {
                if (lobby.players[playerIndex].progress >= lobby.words.length) {
                    return false;
                }
                lobby.players[playerIndex].progress++;
                
                return lobby.words[lobby.players[playerIndex].progress - 1];
            }
        }
        return false;
    }

    /**
     * 100 points max, -10 for each trial. Minimum 10 points.
     * @param lobbyID 
     * @param playerID 
     * @param trialsUsed 
     */
    addScore(lobbyID: string, playerID: string, trialsUsed: number): boolean | number {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            let playerIndex = lobby.players.findIndex(player => player.id === playerID);
            if (lobby.players[playerIndex] && trialsUsed < 10) {
                let score = 100 - 10 * trialsUsed
                if (score >= 10 && score <= 100) {
                    lobby.players[playerIndex].score += score;
                    return score;
                } else {
                    lobby.players[playerIndex].score += 10;
                    return 10;
                }
            }
        }
        return false
    }

    increasePlayersDone(lobbyID: string, playerID: string){
        let lobby = this.lobbies.get(lobbyID);
        let player = lobby?.players.find(player => player.id === playerID);
        if (lobby && player && !player.isDone) {
            lobby.playersDone++;
            player.isDone = true;
        }
    }

    isGameFinished(lobbyID: string): boolean {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            if (lobby.players.length === lobby.playersDone) {
                lobby.isFinished = true;
                return true;
            }
        }
        return false;
    }

    getScores(lobbyID: string): Player[] {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            return lobby.players;
        }
        return [];
    }

    resetLobby(lobbyID: string): boolean{
        return this.lobbies.delete(lobbyID);
    }

    getPlayerNames(lobbyID: string): string[] {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            return lobby.players.map(player => player.name);
        }
        return [];
    }

    isAdmin(lobbyID: string, playerID: string): boolean {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            return lobby.admin === playerID;
        }
        return false;
    }

    //very scuffed method
    generateID(): string {
        let id: string;
        do {
            id = Math.floor(1000 + Math.random() * 9000).toString();
        } while (this.lobbies.has(id));
        return id;
    }

}
