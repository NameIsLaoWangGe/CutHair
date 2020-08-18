import { lwg, Click, EventAdmin, Dialog, Admin, PalyAudio, Setting } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import ADManager, { TaT } from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";

export default class UIDefeated extends lwg.Admin.Scene {

    lwgOnAwake(): void {
        Admin._gameStart = false;
    }

    lwgNodeDec(): void {
        this.self['BtnSelect_WeChat'].visible = true;
        this.self['BtnAgain_WeChat'].visible = false;
        this.self['Dot'].visible = true;
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.LevelFail, 'level' + Game._gameLevel.value);

        ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
        ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');

        Setting.setBtnAppear();
        PalyAudio.playDefeatedSound();


        if (Game._platform == Game._platformTpye.OPPO) {

            this.self['OPPO'].visible = true;
            this.self['WeChat'].visible = false;

        } else {
            this.self['OPPO'].visible = false;
            this.self['WeChat'].visible = true;
        }

    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_WeChat'], this, null, null, this.btnNextUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_WeChat'], this, null, null, this.btnSelectUp);

        Click.on(Click.Type.largen, this.self['BtnAgain_OPPO'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_OPPO'], this, null, null, this.btnNextUp);
    }

    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            this.self['Dot'].visible = false;
            this.self['BtnSelect_WeChat'].visible = false;
            this.self['BtnAgain_WeChat'].visible = true;
        } else {
            this.self['Dot'].visible = true;
            this.self['BtnSelect_WeChat'].visible = true;
            this.self['BtnAgain_WeChat'].visible = false;
        }
    }

    btnAgainUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'returnword_fail');

        console.log('重新开始！');
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        Admin._openScene(Admin.SceneName.UIStart, null, this.self);
    }

    btnNextUp(): void {

        ADManager.ShowReward(() => {
            ADManager.TAPoint(TaT.BtnClick, 'ADnextbt_fail');

            Game._gameLevel.value += 1;
            EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
            Admin._openScene(Admin.SceneName.UIStart, null, this.self);
        })
    }

    lwgOnDisable(): void {
        EventAdmin.notify(GEnum.EventType.goBack);
    }
}