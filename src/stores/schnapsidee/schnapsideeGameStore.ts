import { defineStore } from "pinia";

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
        getGroups: (state) => state.schnapsideeGameStore.groups,
        getGroupById: (state) => (id: number) => state.schnapsideeGameStore.groups.find(group => group.id === id),
    },
    actions: {
        setGameModes(gameModes: string[]) {
            this.schnapsideeGameStore.gameModes = gameModes;
        },
        addPlayerToGroup(playerId: number, groupId: number) {
            const group = this.getGroupById(groupId);
            if (group) {
                group.playerIds = [...(group.playerIds || []), playerId];
            }
        },
        removePlayerFromGroup(playerId: number, groupId: number) {
            const group = this.getGroupById(groupId);
            if (group && group.playerIds) {
                group.playerIds = group.playerIds.filter(id => id!== playerId);
            }
        },
        changeGroupName(name: string, groupId: number) {
            const group = this.getGroupById(groupId);
            if (group) {
                group.name = name;
            }
        },
        initGame() {

        },
        initTurn() {

        },
        deductSkript() {
            this.schnapsideeGameStore.currentSkipsLeft = (this.schnapsideeGameStore.currentSkipsLeft || 3) - 1;
        },
    }
})