import { lwg, Click, Admin, EventAdmin, Gold, Hint } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate } from "../Lwg_Template/Global";

export default class UIVictory extends lwg.Admin.Scene {
    constructor() { super(); }

    GlodNum: Laya.Sprite;
    selfNode(): void {
        this.GlodNum = this.self['GlodNum'];
    }
    lwgOnEnable(): void {
        Gold.GoldNode.visible = true;
        Gold.addGold(25);
        this.getGoldDisPlay();

        this.self['BtnAdv'].visible = true;
        this.self['BtnNormal'].visible = false;
        this.self['Dot'].visible = true;

    }

    /**本关获得金币显示*/
    getGoldDisPlay(): void {
        let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
        Num.text = (25).toString();
    }

    btnOnClick(): void {
        Click.on(Click.ClickType.largen, null, this.self['BtnAdv'], this, null, null, this.btnAdvUp, null);
        Click.on(Click.ClickType.largen, null, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
        Click.on(Click.ClickType.largen, null, this.self['BtnNormal'], this, null, null, this.btnNormalUp, null);


    }
    btnNormalUp(): void {
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        EventAdmin.notify(EventAdmin.EventType.operrationRefresh);
        this.self.close();
    }
    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            this.self['Dot'].visible = false;
            this.self['BtnAdv'].visible = false;
            this.self['BtnNormal'].visible = true;
        } else {
            this.self['Dot'].visible = true;
            this.self['BtnAdv'].visible = true;
            this.self['BtnNormal'].visible = false;
        }
    }

    btnNextUp(): void {

    }

    btnAdvUp(): void {
        Hint.createHint_01(Hint.HintDec["暂时没有广告，过会儿再试试吧！"]);
    }

    lwgDisable(): void {

    }
}