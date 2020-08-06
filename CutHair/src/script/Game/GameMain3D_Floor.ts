import { lwg } from "../Lwg_Template/lwg";

export default class GameMain3D_Floor extends lwg.Admin.Object3D {

    lwgOnEnable(): void {
        this.rig3D.restitution = 0;
    }
    onTriggerEnter(other: Laya.Rigidbody3D): void {
        let owner = other.owner as Laya.MeshSprite3D;
        switch (owner.name) {
            case 'Beard':
                break;
            case 'cutHairline':
                owner.parent.removeSelf();
                break;
            default:
                break;
        }
    }

}