import { defineStore } from "pinia";
import { useGameConfigStore } from "../gameConfigStore";

interface Group {
    id?: number;
    name: string;
    score?: number;
    playerIds?: number[];
    // Current Player (or last current player) in group
    // Goes from start to end
    currentPlayerIndex?: number;
}

interface SchnapsideeGameStore {
    gameModes: string[],
    groups: Group[],
    // Game State
    // ------------------
    // To keep track of when to change the round
    // Change round when last player of bigger group finished turn
    maxPlayersGroup?: number,
    currentRound?: number,
    currentGroupIndex?: number,
    currentGameMode?: string,
    currentWordList?: string,
    // Each player gets per round three free skips
    // If they are used up, each skip costs the group a point
    currentSkipsLeft?: number,
}

export const useSchnapsideeStore = defineStore('schnapsidee-game-store', {
    state: (): { schnapsideeGameStore: SchnapsideeGameStore } => ({
        schnapsideeGameStore: {
            gameModes: [],
            groups: [],
            maxPlayersGroup: 0,
            currentRound: 0,
            currentGroupIndex: 0,
            currentGameMode: '',
            currentWordList: '',
            currentSkipsLeft: 0
        }
    }),
    persist: true,
    getters: {
        getCurrentGameMode: (state) => state.schnapsideeGameStore.currentGameMode,
        getCurrentRound: (state) => state.schnapsideeGameStore.currentRound,
        getCurrentGroupIndex: (state) => state.schnapsideeGameStore.currentGroupIndex,
        getMaxPlayersPerGroup: (state) => state.schnapsideeGameStore.maxPlayersGroup,
        getAvailableGameModes: (state) => state.schnapsideeGameStore.gameModes,
        getCurrentWordList: (state) => state.schnapsideeGameStore.currentWordList,
        getSkipsLeft: (state) => state.schnapsideeGameStore.currentSkipsLeft,
    },
    actions: {
        setGameModes(gameModes: string[]) {
            this.schnapsideeGameStore.gameModes = gameModes;
        },

    }
})