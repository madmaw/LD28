module ct.core.render {

    export class HardcodedActionRendererFactory implements IActionRendererFactory {

        private selectTileActionRenderer: IActionRenderer;
        private dropTileActionRenderer: IActionRenderer;
        private destroyTileActionRenderer: IActionRenderer;
        private createTileActionRenderer: IActionRenderer;
        private actionTimeRemainingUpdatedRenderer: IActionRenderer;
        private actionUpdatePointsRenderer: IActionRenderer;

        constructor(
            tileColor: string, 
            validTileSelectColor: string,
            invalidTileSelectColor: string, 
            extraneousTileSelectColor: string,
            badParameterTileSelectionColor: string,
            tileTemplate: (context: any, options?: any) => string,
            attributeAnimationTemplate: (context: any, options?: any) => string,
            tileClaimTemplate: (context: any, options?: any) => string,
            dropTileAnimationTemplate: (context: any, options?: any) => string,
            dropTileSoundEffect: SoundEffect
        ) {
            this.selectTileActionRenderer = new ct.core.render.board.HandlebarsSVGAnimationActionSetTileSelectionStateRenderer(
                attributeAnimationTemplate,
                tileColor,
                validTileSelectColor,
                invalidTileSelectColor,
                extraneousTileSelectColor,
                badParameterTileSelectionColor,
                "-bg",
                {}
            );
            this.dropTileActionRenderer = new ct.core.render.board.HandlebarsSVGAnimationActionDropTileRenderer(dropTileAnimationTemplate, tileTemplate, tileColor, dropTileSoundEffect, {});
            // TODO this should remove the element as well as just fade it out!
            this.destroyTileActionRenderer = new ct.core.render.HandlebarsSVGAnimationAttributeActionRenderer(tileClaimTemplate, "opacity", "1", "0", "-container", {}, true);
            this.createTileActionRenderer = new ct.core.render.board.HandlebarsSVGAnimationActionCreateTileRenderer(attributeAnimationTemplate, tileTemplate, tileColor, {});
            this.actionTimeRemainingUpdatedRenderer = new ct.core.render.board.action.ActionTimeRemainingUpdatedRenderer();
            this.actionUpdatePointsRenderer = new ct.core.render.board.action.ActionUpdatePointsRenderer();

        }

        public getActionRenderer(action: IAction): IActionRenderer {
            var result;
            if (action instanceof ct.core.board.action.ActionDeselectTile || action instanceof ct.core.board.action.ActionSelectTile || action instanceof ct.core.board.action.ActionSetTileSelectionState) {
                result = this.selectTileActionRenderer;
            } else if (action instanceof ct.core.board.action.ActionDropTile) {
                result = this.dropTileActionRenderer;
            } else if (action instanceof ct.core.board.action.ActionCreateTile) {
                result = this.createTileActionRenderer;
            } else if (action instanceof ct.core.board.action.ActionDestroyTile) {
                result = this.destroyTileActionRenderer;
            } else if (action instanceof ct.core.board.action.ActionTimeRemainingUpdated) {
                result = this.actionTimeRemainingUpdatedRenderer;
            } else if (action instanceof ct.core.board.action.ActionScoreUpdated || action instanceof ct.core.board.action.ActionScoreAccumulated) {
                result = this.actionUpdatePointsRenderer;
            } else {
                result = null;
            }
            return result;
        }

    }

} 