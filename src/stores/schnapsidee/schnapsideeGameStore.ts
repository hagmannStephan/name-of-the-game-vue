import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n';
import { useGameConfigStore } from "../gameConfigStore";

const { t } = useI18n();

interface Group {
    id: number;
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
    currentGroupId?: number,
    currentGameMode?: string,
    currentWordList?: string,
    // Each player gets per round three free skips
    // If they are used up, each skip costs the group a point
    currentSkipsLeft?: number,
}

export const useSchnapsideeStore = defineStore('schnapsidee-game-store', {
    state: (): { schnapsideeGameStore: SchnapsideeGameStore } => ({
        schnapsideeGameStore: {
            gameModes: ['pantomime', 'draw', 'describe'],
            groups: [
                {
                    "id": 0,
                    "name": t('schnapsidee.config.groups.default', { num: 1 })
                },
                {
                    "id": 1,
                    "name": t('schnapsidee.config.groups.default', { num: 2 })
                }
            ],
            maxPlayersGroup: 0,
            currentRound: 0,
            currentGroupId: 0,
            currentGameMode: '',
            currentWordList: '',
            currentSkipsLeft: 0
        }
    }),
    persist: true,
    getters: {
        getCurrentGameMode: (state) => state.schnapsideeGameStore.currentGameMode,
        getCurrentRound: (state) => state.schnapsideeGameStore.currentRound,
        getcurrentGroupId: (state) => state.schnapsideeGameStore.currentGroupId,
        getMaxPlayersPerGroup: (state) => state.schnapsideeGameStore.maxPlayersGroup,
        getAvailableGameModes: (state) => state.schnapsideeGameStore.gameModes,
        getCurrentWordList: (state) => state.schnapsideeGameStore.currentWordList,
        getSkipsLeft: (state) => state.schnapsideeGameStore.currentSkipsLeft,
        getGroups: (state) => state.schnapsideeGameStore.groups,
        getGroupById: (state) => (id: number) => state.schnapsideeGameStore.groups.find(group => group.id === id),
        getPlayerIdByCurrentPlayerIndex: (state) => (index: number, groupID: number) => {
            const group = state.schnapsideeGameStore.groups.find(group => group.id === groupID);
            return group?.playerIds?.[index - 1];
        },
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
            let maxPlayers = 0;     // Track which group is the maxPlayersGroup
            this.schnapsideeGameStore.groups.forEach((group) => {
                group.score = 0;
                if (group.playerIds && group.playerIds.length >= 2) {
                    if(group.playerIds.length >= maxPlayers) {
                        this.schnapsideeGameStore.maxPlayersGroup = group.id;
                        maxPlayers = group.playerIds.length;
                    }

                    group.currentPlayerIndex = 0;
                } else {
                    console.error(`Group ${group.id} has not enougth players!`);
                    return;
                }

                this.schnapsideeGameStore.currentRound = 0;
                this.schnapsideeGameStore.currentGroupId = 0;
            });
            
        },
        initTurn() {
            let group = this.getGroupById(this.schnapsideeGameStore.currentGroupId || 0);

            if(!group){
                console.error(`Group with id ${this.schnapsideeGameStore.currentGroupId} not found!`);
                return;
            }

            if (typeof group.currentPlayerIndex === 'undefined') {
                group.currentPlayerIndex = 1;
            }

            const currentPlayerId = 

            const gameConfigStore = useGameConfigStore();
            gameConfigStore.getPlayerById()

        },
        deductSkript() {
            this.schnapsideeGameStore.currentSkipsLeft = (this.schnapsideeGameStore.currentSkipsLeft || 3) - 1;
        },
    }
})