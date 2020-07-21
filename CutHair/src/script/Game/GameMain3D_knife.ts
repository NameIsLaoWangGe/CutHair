import { lwg } from "../Lwg_Template/lwg";
import GameMain3D_Blade from "./GameMain3D_Blade";
import { GEnum, GVariate } from "../Lwg_Template/Global";

export default class GameMain3D_knife extends lwg.Admin.Object3D {
    /**当前剃须刀的状态*/
    RazorState: string;
    lwgOnEnable(): void {
    }
    num = 0;
    onTriggerEnter(other: Laya.Rigidbody3D): void {
        let owner = other.owner as Laya.MeshSprite3D;
        let ownerParent = owner.parent as Laya.MeshSprite3D;
        this.num++;
        switch (owner.name.substring(0, 5)) {
            case 'Beard':
                // 随机给予一个属性，退出时把这个属性变为true，防止二次碰撞！
                if (owner['already']) {
                    return;
                }
                if (ownerParent.name === 'RightBeard') {
                    GVariate._rightBeardNum.setValue = GVariate._rightBeardNum.value - 0.5;

                } else if (ownerParent.name === 'LeftBeard') {
                    GVariate._leftBeardNum.setValue = GVariate._leftBeardNum.value - 0.5;

                }
                other.isKinematic = false;
                other.linearVelocity = new Laya.Vector3(0, -0.5, 0);
                break;
            default:
                break;
        }
    }

    onTriggerExit(other: Laya.Rigidbody3D): void {
        let owner = other.owner as Laya.MeshSprite3D;
        let ownerParent = owner.parent as Laya.MeshSprite3D;
        switch (owner.name) {
            case 'Beard':
                owner['already'] = true;
                break;
            default:
                break;
        }
    }


    lwgOnUpdate(): void {
    }
}