import { lwg, Click, EventAdmin, Dialog, Admin, PalyAudio, Setting, Tools } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";
import ADManager, { TaT } from "../TJ/Admanager";
import { Game } from "../Lwg_Template/Game";
import RecordManager from "../TJ/RecordManager";

export default class UIDefeated extends lwg.Admin.Scene {

    lwgOnAwake(): void {
        Admin._gameStart = false;
        this.self['BtnSelect_WeChat'].visible = true;
        this.self['BtnAgain_WeChat'].visible = false;
        this.self['Dot_WeChat'].visible = true;
        Tools.node_ShowExcludedChild(this.var('Platform'), [Admin._platform]);
        if (!Admin._elect) {
            this.self['P202'].removeSelf();
        }
    }

    lwgOnEnable(): void {
        ADManager.TAPoint(TaT.LevelFail, 'level' + Game._gameLevel.value);

        ADManager.TAPoint(TaT.BtnShow, 'ADnextbt_fail');
        ADManager.TAPoint(TaT.BtnShow, 'returnword_fail');

        Setting.setBtnAppear();
        PalyAudio.playDefeatedSound();

        Laya.timer.once(1000, this, () => {
            Admin._openScene(Admin.SceneName.UIPlaqueADS);
        })
    }

    lwgAdaptive(): void {
        let y = this.self['Bytedance'].globalToLocal(new Laya.Point(Laya.stage.width / 2, Laya.stage.height - 80)).y;
        this.self['Select_Bytedance'].y = y;
    }
    lwgOpenAni(): number {
        return 1000;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnAgain_WeChat'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_WeChat'], this, null, null, this.btnNextUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_WeChat'], this, null, null, this.btnSelectUp);

        Click.on(Click.Type.largen, this.self['BtnAgain_OPPO'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_OPPO'], this, null, null, this.btnNextUp);

        Click.on(Click.Type.largen, this.self['BtnAgain_Bytedance'], this, null, null, this.btnAgainUp);
        Click.on(Click.Type.largen, this.self['BtnNext_Bytedance'], this, null, null, this.btnNextUp);
        Click.on(Click.Type.largen, this.self['BtnSelect_Bytedance'], this, null, null, this.btnSelectUp);
    }

    btnSelectUp(): void {
        let Dot;
        switch (Game._platform) {
            case Game._platformTpye.WeChat:
                Dot = this.self['Dot_WeChat'];
                break;
            case Game._platformTpye.Bytedance:
                Dot = this.self['Dot_Bytedance'];
                break;

            default:
                break;
        }

        if (Dot.visible) {
            Dot.visible = false;
            this.self['BtnNext_WeChat'].visible = false;
            this.self['BtnAgain_WeChat'].visible = true;

            this.self['BtnNext_Bytedance'].visible = false;
            this.self['BtnAgain_Bytedance'].visible = true;
        } else {
            Dot.visible = true;
            this.self['BtnNext_WeChat'].visible = true;
            this.self['BtnAgain_WeChat'].visible = false;

            this.self['BtnNext_Bytedance'].visible = true;
            this.self['BtnAgain_Bytedance'].visible = false;
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
        //          //判断是否已经添加到桌面
        //  if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.OPPO_AppRt) {

        //     if (DataMgr.getPlayerData("addTable") == 0) {
        //         this.AddToDesk.visible = true;
        //         ADManager.TAPoint(TaT.BtnShow, "tablebt_main")
        //         if (this.turn > 2 && this.out == true) {
        //            //判断游戏轮次
        //             if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.OPPO_AppRt) {
        //                 this.showShortcutInstall();
        //                 this.out = false;
        //             }
        //         }
        //     }
        //     else {
        //         this.AddToDesk.visible = false;
        //     }
        // }
    }
}