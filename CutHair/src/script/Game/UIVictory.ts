import { lwg, Click, Admin } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";

export default class UIVictory extends lwg.Admin.Scene {
    constructor() { super(); }

    lwgOnEnable(): void {

    }

    btnOnClick(): void {
        Click.on(Click.ClickType.largen, null, this.self['BtnNext'], this, null, null, this.btnNextUp, null);
    }

    btnNextUp(): void {
        this.self.close();
        lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].refreshScene();
        
    }

    lwgDisable(): void {

    }
}