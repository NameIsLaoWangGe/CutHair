import { lwg, Click, Admin, EventAdmin, Gold, Hint, Game, Animation2D } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate, GSene3D } from "../Lwg_Template/Global";
import ADManager from "../TJ/Admanager";

export default class UIVictory extends lwg.Admin.Scene {
    constructor() { super(); }

    GlodNum: Laya.Sprite;
    /**本关应该给予多少金币*/
    getGoldNum: number;
    lwgNodeDec(): void {
        this.GlodNum = this.self['GlodNum'];
    }

    lwgOnEnable(): void {
        this.getGoldNum = 50;
        Gold.GoldNode.visible = true;
        this.getGoldDisPlay();

        Game._gameLevel.value++;
        this.self['BtnAdv'].visible = true;
        this.self['BtnNormal'].visible = false;
        this.self['Dot'].visible = true;

        lwg.Effects.createFireworks(Laya.stage, 40, 430, 200);
        lwg.Effects.createFireworks(Laya.stage, 40, 109, 200);

        lwg.Effects.createLeftOrRightJet(Laya.stage, 'right', 40, 720, 300);
        lwg.Effects.createLeftOrRightJet(Laya.stage, 'left', 40, 0, 300);
    }

    lwgOpenAni(): number {

        return 0
    }

    /**本关获得金币显示*/
    getGoldDisPlay(): void {
        let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
        Num.text = (this.getGoldNum * 10).toString();
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, null, this.self['BtnAdv'], this, null, null, this.btnAdvUp, null);
        Click.on(Click.Type.noEffect, null, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
        Click.on(Click.Type.largen, null, this.self['BtnNormal'], this, null, null, this.btnNormalUp, null);
    }

    btnNormalUp(): void {
        this.advFunc();
    }

    addOrSub: string = 'add';
    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            // 按钮格式
            this.self['Dot'].visible = false;
            this.self['BtnAdv'].visible = false;
            this.self['BtnNormal'].visible = true;
            this.addOrSub = 'sub';

            // 图片消失动画
            let Multiply10 = this.self['Multiply10'] as Laya.Image;
            Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 0, 0, 0, 100)
            // 金币下降动画
            let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
            Laya.timer.loop(30, this, () => {

                if (this.addOrSub == 'sub') {
                    if (Number(Num.text) < this.getGoldNum) {
                        Num.text = (this.getGoldNum).toString();
                        this.addOrSub = null;
                    } else {
                        Num.text = (Number(Num.text) - 30).toString();
                    }
                }
            })

        } else {
            // 按钮格式
            this.self['Dot'].visible = true;
            this.self['BtnAdv'].visible = true;
            this.self['BtnNormal'].visible = false;
            this.addOrSub = 'add';

            // 图片出现动画
            let Multiply10 = this.self['Multiply10'] as Laya.Image;
            Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 1, 1, 1, 100)
            // 金币上涨动画
            let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
            Laya.timer.loop(30, this, () => {
                if (this.addOrSub == 'add') {
                    if (Number(Num.text) > this.getGoldNum * 10) {
                        Num.text = (this.getGoldNum * 10).toString();
                        this.addOrSub = null;
                    } else {
                        Num.text = (Number(Num.text) + 30).toString();
                    }
                }
            })
        }
    }

    btnAdvUp(): void {
        ADManager.ShowReward(() => {
            this.advFunc();
        })
    }

    advFunc(): void {
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        Admin._openScene(Admin.SceneName.UIStart, null, null, () => { console.log(Laya.stage) })
        this.self.close();
    }

    lwgDisable(): void {

    }
}