import { Admin } from "../Lwg_Template/lwg";
import { SubpackController } from "./SubpackController";
import { Game } from "../Lwg_Template/Game";

export default class UISubpackages extends Laya.Script {
    onAwake(): void {
        // let isInit = false;
        // TJ.Common.PriorityInit.Add(100, () => {
        //     isInit = true;
        // });
        // Admin._platform == Admin._platformTpye.Bytedance;
        // if (Admin._platform !== Admin._platformTpye.WeChat) {
        //     Admin._openScene('UILoding');
        //     return;
        // }
        // let act = () => {
        //     if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
        //         let gameContrl = new SubpackController();
        //         gameContrl.init(() => {
        //             Admin._openScene('UILoding');
        //         })

        //     } else {
        //         Admin._openScene('UILoding');
        //     }
        // };
        // if (isInit) {
        //     act();
        // }
        // else {
        //     TJ.Common.PriorityInit.Add(100, act);
        // }
    }
    onStart(): void {
        let subpackController = new SubpackController();
        subpackController.init(() => {
            Admin._openScene('UILoding');
            console.log('分包完成！');
        });
    }
}