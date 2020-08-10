import { lwg, Admin, Shop, Click, Setting, EventAdmin } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../TJ/Admanager";
import { GEnum } from "../Lwg_Template/Global";

export default class UISkinTry extends Admin.Scene {

    lwgOnAwake(): void {
        this.randomNoHave();
    }

    beforeTryOtherName: string;
    beforeTryPropName: string;
    /**随机出一个和当前皮肤不一样的皮肤放在加载位置*/
    randomNoHave(): void {
        let arrOther = Shop.getwayGoldArr(Shop.GoodsClass.Other, undefined, true);
        let arrProp = Shop.getwayGoldArr(Shop.GoodsClass.Props, undefined, true);
        let ele;
        if (Math.floor(Math.random() * 2) === 1) {
            ele = arrOther[Math.floor(Math.random() * arrOther.length)];
            this.self['SkinPic'].skin = 'UI/Shop/Other/' + ele.name + '.png';
            this.beforeTryOtherName = Shop._currentOther.name;
            Shop._currentOther.name = ele.name;

        } else {
            ele = arrProp[Math.floor(Math.random() * arrProp.length)];
            this.self['SkinPic'].skin = 'UI/Shop/Props/' + ele.name + '.png';
            this.beforeTryPropName = Shop._currentProp.name;
            Shop._currentProp.name = ele.name;
        }
    }

    lwgBtnClick(): void {
        Click.on(lwg.Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp, null);
        Click.on(lwg.Click.Type.largen, this.self['BtnGet'], this, null, null, this.btnGetUp, null);
    }

    btnGetUp(event): void {
        ADManager.ShowReward(() => {
            Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
            EventAdmin.notify(GEnum.EventType.changeOther);
            EventAdmin.notify(GEnum.EventType.changeProp);
        })
    }

    btnNoUp(event): void {
        Admin._openScene(Admin.SceneName.UIOperation, null, this.self);
        EventAdmin.notify(GEnum.EventType.changeOther);
        EventAdmin.notify(GEnum.EventType.changeProp);
    }

    lwgOnDisable(): void {
        if (this.beforeTryOtherName) {
            Shop._currentOther.name = this.beforeTryOtherName;
        }
        if (this.beforeTryPropName) {
            Shop._currentProp.name = this.beforeTryPropName;
        }
    }
}