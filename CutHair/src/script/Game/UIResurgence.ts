import { Admin, Click, EventAdmin } from "../Lwg_Template/lwg";
import ADManager from "../TJ/Admanager";

export default class UIResurgence extends Admin.Scene {

    lwgOnEnable(): void {
        console.log(Laya.stage);
    }
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnResurgence'], this, null, null, this.btnResurgenceUp);
        Click.on(Click.Type.largen, this.self['BtnNo'], this, null, null, this.btnNoUp);

    }
    btnResurgenceUp(): void {
        // ADManager.ShowReward(() => {
        Admin._gameStart = true;
        EventAdmin.notify(EventAdmin.EventType.scene3DResurgence);
        this.self.close();
        // })
    }
    btnNoUp(): void {
        EventAdmin.notify(EventAdmin.EventType.closeOperation);
        Admin._openScene(Admin.SceneName.UIDefeated);
        this.self.close();
    }
}