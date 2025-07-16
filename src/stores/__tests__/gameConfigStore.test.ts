import { describe, expect, it } from "vitest";
import { useGameConfigStore } from "../gameConfigStore";
import { createPinia, setActivePinia } from "pinia";

function createTestStore() {
    setActivePinia(createPinia())
    return useGameConfigStore()
}

describe('Game Config Store', () => {
    describe('Game Config Store - Default Values / Getters', () => {
        let store = createTestStore();
        
        it('default players should equal null', () => {
            expect(store.getPlayers).toBeNull;
        })

        it('default rounds should equal 1', () => {
            expect(store.getRounds).toEqual(1);
        })

        it('default timePerRound should equal 60', () => {
            expect(store.getTimePerRound).toEqual(60);
        })

        it('default isSpicy should equal true', () => {
            expect(store.getIsSpicy).toEqual(true);
        })
    })

    describe('Game Config Store - Actions', () => {
        let store = createTestStore();
        it('should set rounds as expected', () => {
            store.setRounds(5);
            expect(store.getRounds).toEqual(5);
        })

        it('should set isSpicy as expected', () => {
            store.setIsSpicy(false);
            expect(store.getIsSpicy).toEqual(false);
        })

        it('should set timePerRound as expected', () => {
            store.setTimePerRound(90);
            expect(store.getTimePerRound).toEqual(90);
        })

        it('should add player as expected (without groupId)', () => {
            store.addPlayer({
                "name": "Steffla Cheffla",
            })
            expect(store.getPlayers).toEqual([
                {
                    "groupId": undefined,
                    "id": 1,
                    "name": "Steffla Cheffla"
                }
            ])
        })

        it('should add player as expected (with groupId)', () => {
            store.addPlayer({
                "name": "Franz Ferdindand",
                "groupId": 1
            })
            expect(store.getPlayers).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        "groupId": 1,
                        "id": 2,
                        "name": "Franz Ferdindand"
                    })
                ])
            )
        })

        it('should remove player as expected', () => {
            store.removePlayer(1)
            expect(store.getPlayers.length).toEqual(1)
            expect(store.getPlayers).toEqual([
                {
                        "groupId": 1,
                        "id": 1,
                        "name": "Franz Ferdindand"
                }
            ])
        })

        it('should modify player as expected', () => {
            store.modifyPlayer({
                "name": "Mattea Meyer",
                "groupId": 2
            }, 1)
            expect(store.getPlayers).toEqual([{
                "groupId": 2,
                "id": 1,
                "name": "Mattea Meyer",
            }])
        })

    })

    describe('Game Config Store - Getters (With Additional Logic)', () => {
        let store = createTestStore();

        it('should get correct player by id', () =>  {
            store.addPlayer({
                "name": "Steffla Cheffla",
                "groupId": 2
            })
            store.addPlayer({
                "name": "Mattea Meyer"
            })
            store.addPlayer({
                "name": "Franz Ferdinand",
                "groupId": 1
            })

            expect(store.getPlayerById(2)).toEqual({
                "groupId": undefined,
                "id": 2,
                "name": "Mattea Meyer"
            })
        })
    })
})