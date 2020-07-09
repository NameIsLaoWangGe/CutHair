import { lwg } from "../Lwg_Template/lwg";

export default class GameMain3D_Moustache extends lwg.Admin.Object3D {

    timer: number;
    moveSwitch: boolean = false;
    lwgInit(): void {
        this.timer = 0;
        this.moveSwitch = false;
    }
    lwgOnUpdate(): void {
        if (this.moveSwitch) {
            this.timer++;
            this.self.transform.localPositionY += 0.1;
            if (this.timer > 100) {
                if (this.self.parent.numChildren === 1) {
                    lwg.Global._gameStart = false;
                }
                this.self.removeSelf();
            }
        }
    }
}