import { lwg, Click, EventAdmin, Hint } from "../Lwg_Template/lwg";
import { GEnum } from "../Lwg_Template/Global";

export default class UIDefeated extends lwg.Admin.Scene {

    BtnAgain: Laya.Sprite;
    selfNode(): void {
        this.BtnAgain = this.self['BtnAgain'];

        this.self['BtnAdv'].visible = true;
        this.self['BtnAgain'].visible = false;
        this.self['Dot'].visible = true;
    }
    btnOnClick(): void {
        Click.on(Click.Type.largen, null, this.self['BtnAgain'], this, null, null, this.btnAgainUp, null);
        Click.on(Click.Type.largen, null, this.self['BtnNext'], this, null, null, this.btnNextUp, null);
        Click.on(Click.Type.largen, null, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
        
    }

    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            this.self['Dot'].visible = false;
            this.self['BtnAdv'].visible = false;
            this.self['BtnAgain'].visible = true;
        } else {
            this.self['Dot'].visible = true;
            this.self['BtnAdv'].visible = true;
            this.self['BtnAgain'].visible = false;
        }
    }

    btnAgainUp(): void {
        console.log('重新开始！');
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        EventAdmin.notify(EventAdmin.EventType.operrationRefresh);
        this.self.close();
    }

    btnNextUp():void{
        Hint.createHint_Middle(Hint.HintDec["暂时没有广告，过会儿再试试吧！"])
    }
}