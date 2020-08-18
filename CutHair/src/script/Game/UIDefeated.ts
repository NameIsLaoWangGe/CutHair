import { lwg, Click, EventAdmin, Dialog, Admin, PalyAudio, Setting } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import ADManager, { TaT } from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";

export default class UIDefeated extends lwg.Admin.Scene {

    lwgOnAwake(): void {
        Admin._gameStart = false;
    }

    lwgNodeDec(): void {
        this.self['BtnAdv'].visible = true;
        this.self['BtnAgain'].visible = false;
        this.self['Dot'].visible = true;
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.LevelFail, 'level' + Game._gameLevel.value);

        ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
        ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');

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
        ADManager.TAPoint(TaT.BtnClick, 'returnword_fail');

        console.log('重新开始！');
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        Admin._openScene(Admin.SceneName.UIOperation, null, this.self)
    }

    btnNextUp(): void {
        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'ADnextbt_fail');

            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
            Game._gameLevel.value += 1;
            Admin._openScene(Admin.SceneName.UIStart, null, this.self)
        })
    }

    lwgOnDisable(): void {
        Setting.setBtnVinish();
    }
}