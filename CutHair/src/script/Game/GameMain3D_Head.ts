import { lwg } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";

export default class GameMain3D_Head extends lwg.Admin.Object3D {
    /**当前剃须刀的状态*/
    RazorState: string;
    lwgInit(): void {
      
    }

    onTriggerEnter(other): void {

    }
    lwgOnUpdate(): void {
    }
}