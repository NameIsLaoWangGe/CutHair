import { Admin } from "../Lwg_Template/lwg";
import { SubpackController } from "./SubpackController";

let isInit = false;
TJ.Common.PriorityInit.Add(100, () => {
    isInit = true;
});
export default class UISubpackages extends Laya.Script {
    onAwake(): void {
        let act = () => {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                let gameContrl = new SubpackController();
                gameContrl.init(() => {
                    Admin._openScene('UILoding');
                })

            } else {
                Admin._openScene('UILoding');
            }
        };
        if (isInit) {
            act();
        }
        else {
            TJ.Common.PriorityInit.Add(100, act);
        }
    }
}