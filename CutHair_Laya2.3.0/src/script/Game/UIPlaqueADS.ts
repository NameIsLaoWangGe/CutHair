import { Admin, Click } from "../Lwg_Template/lwg";

export default class UIPlaqueADS extends Admin.Scene {

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, () => {
            this.self.close();
        });
    }
}