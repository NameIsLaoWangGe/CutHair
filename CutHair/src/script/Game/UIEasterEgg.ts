import { EasterEgg } from "../Lwg_Template/EasterEgg";
import { Click, Admin, Setting, Gold } from "../Lwg_Template/lwg";

export default class UIEasterEgg extends EasterEgg.EasterEggScene {

    easterEggOnAwake(): void {
        Setting.setBtnVinish();
        Gold.goldVinish();
    }
    easterEggBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            this.self.close();
        });

    };

    easterEggOnDisable(): void {
        Setting.setBtnAppear();
        Gold.goldAppear();
    }
}