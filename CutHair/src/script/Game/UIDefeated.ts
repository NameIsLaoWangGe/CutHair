import { lwg, Click, EventAdmin } from "../Lwg_Template/lwg";
import { GEnum } from "../Lwg_Template/Global";

export default class UIDefeated extends lwg.Admin.Scene {

    BtnAgain: Laya.Sprite;
    selfNode(): void {
        this.BtnAgain = this.self['BtnAgain'];
        console.log(this.BtnAgain);
    }
    btnOnClick(): void {
        Click.on(Click.ClickType.largen, null, this.self['BtnAgain'], this, null, null, this.btnAgainUp, null);
    }

    btnAgainUp(): void {
        console.log('重新开始！');
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        EventAdmin.notify(EventAdmin.EventType.operrationRefresh);
        this.self.close();
    }
}