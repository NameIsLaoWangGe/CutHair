import UIStart from "./UIStart";
import ADManager, { TaT } from "../TJ/Admanager";
import { Admin, Click } from "../Lwg_Template/lwg";

export default class UIADtishi extends Admin.Scene {
    /**否按钮*/
    private no: Laya.Image;
    /**是按钮*/
    private ok: Laya.Image;

    adAction;
    constructor() {
        super();

    }

    setCallBack(_adAction)  {
        this.adAction = _adAction;
    }

    lwgInit() {
        this.no = this.self['no'];
        this.ok = this.self['ok'];

        this.no.visible = false;
        Laya.timer.once(2000, this, () => {
            this.no.visible = true;
        });
        ADManager.TAPoint(TaT.BtnShow, "ADrewardbt_tishiAD");
        ADManager.TAPoint(TaT.PageEnter, "tishiADpage");
    }

    btnOnClick(): void {
        Click.on('largen', this.no, this, null, null, this.btnNo, null);
        Click.on('largen', this.ok, this, null, null, this.btnYes, null);
    }


    btnNo(event) {
        ADManager.TAPoint(TaT.PageLeave, "tishiADpage");
        event.currentTarget.scale(1, 1);
        this.self.close();
    }

    btnYes(event) {

        event.currentTarget.scale(1, 1);


        ADManager.TAPoint(TaT.BtnClick, "ADrewardbt_tishiAD");

        ADManager.ShowReward(this.adAction, null);

        this.self.close();


    }
}