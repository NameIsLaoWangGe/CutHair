import { lwg, Click, Admin, EventAdmin } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum } from "../Lwg_Template/Global";

export default class UIVictory extends lwg.Admin.Scene {
    constructor() { super(); }

    lwgOnEnable(): void {
    }

    btnOnClick(): void {
        Click.on(Click.ClickType.largen, null, this.self['BtnNext'], this, null, null, this.btnNextUp, null);
    }

    btnNextUp(): void {
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        EventAdmin.notify(EventAdmin.EventType.operrationRefresh);
        this.self.close();
    }

    lwgDisable(): void {

    }
}