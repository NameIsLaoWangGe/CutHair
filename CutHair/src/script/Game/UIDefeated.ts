import { lwg, Click, EventAdmin, Dialog, Admin, Game, PalyAudio, Setting } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import ADManager from "../TJ/Admanager";

export default class UIDefeated extends lwg.Admin.Scene {

    lwgNodeDec(): void {
        this.self['BtnAdv'].visible = true;
        this.self['BtnAgain'].visible = false;
        this.self['Dot'].visible = true;
    }

    lwgOnEnable(): void {
        Setting.setBtnAppear();
        PalyAudio.playDefeatedSound();
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnAgain'], this, null, null, this.btnAgainUp, null);
        Click.on(Click.Type.largen, this.self['BtnNext'], this, null, null, this.btnNextUp, null);
        Click.on(Click.Type.largen, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
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
        EventAdmin.notify(EventAdmin.EventType.operationRefresh);
        this.self.close();
    }

    btnNextUp(): void {
        ADManager.ShowReward(() => {
            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
            Game._gameLevel.value += 1;
            Admin._openScene(Admin.SceneName.UIStart, null, null, () => { console.log(Laya.stage) })
            this.self.close();
        })
    }

    lwgOnDisable(): void {
        Setting.setBtnVinish();
    }
}