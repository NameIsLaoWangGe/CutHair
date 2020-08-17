import { Admin } from "../Lwg_Template/lwg";
import { SubpackController } from "./SubpackController";

export default class UISubpackages extends Laya.Script {

    onAwake(): void {
        console.log('开始分包！');
        if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
            let gameContrl = new SubpackController();
            gameContrl.init(() => {
                Admin._openScene('UILoding');
            })

        } else {
            Admin._openScene('UILoding');
        }
    }
    onEnable(): void {

    }
    onDisable(): void {
    }
}