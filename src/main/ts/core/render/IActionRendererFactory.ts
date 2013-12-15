module ct.core.render {

    export interface IActionRendererFactory {

        getActionRenderer(action:IAction): IActionRenderer;

    }
} 