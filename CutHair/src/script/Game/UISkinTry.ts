import { lwg, Admin, Shop, Click, Setting, EventAdmin } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
import { GEnum } from "../Lwg_Template/Global";

export default class UISkinTry extends Admin.Scene {

    lwgOnAwake(): void {
        this.randomNoHave();
    }

    /**随机出一个和当前皮肤不一样的皮肤放在加载位置*/
    randomNoHave(): void {
        let arrOther = Shop.getwayGoldArr(Shop.GoodsClass.Other, undefined, true);
        let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
        let ele;
        if (Math.floor(Math.random() * 2) === 1) {
            ele = arrOther[Math.floor(Math.random() * arrOther.length)];
            this.self['SkinPic'].skin = 'UI/Shop/Other/' + ele.name + '.png';
            Shop._tryName = [Shop.GoodsClass.Other, ele.name];

        } else {
            ele = arrProp[Math.floor(Math.random() * arrProp.length)];
            this.self['SkinPic'].skin = 'UI/Shop/Props/' + ele.name + '.png';
            Shop._tryName = [Shop.GoodsClass.Props, ele.name];
        }
    }

    lwgBtnClick(): void {
        Click.on(lwg.Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp, null);
        Click.on(lwg.Click.Type.largen, this.self['BtnGet'], this, null, null, this.btnGetUp, null);
    }

    btnGetUp(event): void {
        // ADManager.ShowReward(() => {
        EventAdmin.notify(GEnum.EventType.changeTrySkin, Shop._tryName);
        Admin._openScene(Admin.SceneName.UIOperation, null, this.self)
        // })
    }

    btnNoUp(event): void {
        Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
    }

    onDisable(): void {
    }
}