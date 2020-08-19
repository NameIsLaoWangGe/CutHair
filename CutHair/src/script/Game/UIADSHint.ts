import { Admin, Click, EventAdmin } from "../Lwg_Template/lwg";
import ADManager from "../TJ/Admanager";
export default class UIADSHint extends Admin.Scene {
    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp);
        Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, this.btnConfirmUp);
    }

    lwgEventReg(): void {
        EventAdmin.reg('continue', this, () => {
            ADManager.ShowReward(() => {
                if (ADManager._currentRewardAction) {
                    ADManager._currentRewardAction();
                }
            })
        });
    }

    btnCloseUp(): void {
        this.self.close();
    }
    btnConfirmUp(): void {
        EventAdmin.notify('continue');
        this.self.close();
    }
}
