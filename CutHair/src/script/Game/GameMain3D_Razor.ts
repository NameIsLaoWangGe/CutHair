import { lwg, Shop, EventAdmin } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";
import { GEnum, GVariate } from "../Lwg_Template/Global";

export default class GameMain3D_Razor extends lwg.Admin.Object3D {


    lwgEventReg(): void {
        EventAdmin.reg(GEnum.EventType.changeProp, this, () => {
            let name;
            for (let index = 0; index < this.self.numChildren; index++) {
                const element = this.self.getChildAt(index);
                if (element.name !== 'Blade') {
                    if (element.name !== Shop._currentProp.name) {
                        element.active = false;
                    } else {
                        name = element.name;
                        element.active = true;
                    }
                }
            }
            if (!name) {
                this.self.getChildByName('jiandao').active = true;
            }
        });
    }

    /**当前剃须刀的状态*/
    RazorState: string;
    lwgOnEnable(): void {
        this.RazorState = GEnum.RazorState.move;
        let Blade = this.self.getChildByName('Blade') as Laya.Sprite3D;
        Blade.addComponent(GameMain3D_Blade);
        EventAdmin.notify(GEnum.EventType.changeProp);
    }

    lwgOnUpdate(): void {
    }
}