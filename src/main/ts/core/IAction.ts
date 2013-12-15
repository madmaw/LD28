module ct.core {
    export interface IAction {

        // TODO move to sub-interface or something
        getPrimaryId(): string;

        perform(gameState: IGameState): { gameState: IGameState; actions: IAction[]; };
    }
} 