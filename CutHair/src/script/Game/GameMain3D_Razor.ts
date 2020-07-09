import { lwg } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";

export default class GameMain3D_Razor extends lwg.Admin.Object3D {
    /**当前剃须刀的状态*/
    RazorState: string;
    lwgInit(): void {
        this.RazorState = lwg.Enum.RazorState.move;
        let Blade = this.self.getChildByName('Blade') as Laya.Sprite3D;
        Blade.addComponent(GameMain3D_Blade);
    }

    onTriggerEnter(other): void {

    }
    lwgOnUpdate(): void {
    }
}