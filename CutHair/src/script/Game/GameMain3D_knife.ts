import { lwg } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";
import { GEnum } from "../Lwg_Template/Global";

export default class GameMain3D_knife extends lwg.Admin.Object3D {
    /**当前剃须刀的状态*/
    RazorState: string;
    lwgInit(): void {

    }
    onTriggerEnter(other: Laya.Rigidbody3D): void {
        let owner = other.owner as Laya.MeshSprite3D;
        // console.log(other);
        switch (owner.name.substring(0, 5)) {
            case 'Beard':
                other.isKinematic = false;
                other.linearVelocity = new Laya.Vector3(0, -0.5, 0);
                break;

            default:
                break;
        }
    }
    lwgOnUpdate(): void {
    }
}