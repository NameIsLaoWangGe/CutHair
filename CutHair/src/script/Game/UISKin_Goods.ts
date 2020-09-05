import { lwg, Gold, EventAdmin, Click, Admin, Shop, Tools, Skin, Dialog } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UISKin_Goods extends Admin.Object {

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self, this, null, null, this.up, null);
    }
    up(): void {
        Dialog.createVoluntarilyDialogue(135, 250, this.self['_dataSource'].name, 0, 1000);
        EventAdmin.notify(Skin.EventType.select, [this.self['_dataSource']]);
    }
}