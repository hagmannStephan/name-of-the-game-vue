import { defineStore } from "pinia";

interface Player {
    id: number;
    name: string;
    groupId?: number;
}

interface PlayerDTO {
    name: string;
    groupId?: number;
}

interface GameConfigStore {
    players: Player[],
    rounds?: number,
    timePerRound?: number,
    isSpicy?: boolean;
}

export const useGameConfigStore = defineStore('game-config-store', {
    state: (): { gameConfigStore: GameConfigStore } => ({
        gameConfigStore: {
            players: [] as Player[],
            rounds: 1,
            timePerRound: 60,
            isSpicy: true
        }
    }),
    persist: true,
    getters: {
        getPlayers: (state) => state.gameConfigStore.players,
        getRounds: (state) => state.gameConfigStore.rounds,
        getTimePerRound: (state) => state.gameConfigStore.timePerRound,
        getIsSpicy: (state) => state.gameConfigStore.isSpicy,
        getPlayerById: (state) => (playerId: number) => state.gameConfigStore.players.find((player) => player.id === playerId),
    },
    actions: {
        // Public Actions
        setRounds(rounds: number) {
            this.gameConfigStore.rounds = Math.max(1, rounds);
        },
        setIsSpicy(isSpicy: boolean) {
            this.gameConfigStore.isSpicy = isSpicy;
        },
        setTimePerRound(timePerRound: number) {
            this.gameConfigStore.timePerRound = Math.max(30, timePerRound);
        },
        addPlayer(playerDTO: PlayerDTO) {
            let player = {
                id: this.gameConfigStore.players.length + 1,
                name: playerDTO.name,
                groupId: playerDTO.groupId,
            }

            this.gameConfigStore.players.push(player)
            return player;
        },
        removePlayer(playerID: number) {
            this.gameConfigStore.players = this.gameConfigStore.players.filter((player) => player.id!== playerID);

            // Update IDs to avoid gaps
            this.gameConfigStore.players.forEach((player, index) => {
                player.id = index + 1;
            });
        },
        modifyPlayer(playerDTO: PlayerDTO, id: number) {
            if (id >= 1 && id <= this.gameConfigStore.players.length) {
                this.gameConfigStore.players[id - 1].name = playerDTO.name;
                this.gameConfigStore.players[id - 1].groupId = playerDTO.groupId;
            }
        }
    }
})