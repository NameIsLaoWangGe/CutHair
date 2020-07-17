import { lwg } from "../Lwg_Template/lwg";

export default class GameMain3D_Floor extends lwg.Admin.Object3D {

    lwgInit(): void {
        console.log(this.self);
        this.rig3D.restitution = 0;
    }
    onTriggerEnter(other: Laya.Rigidbody3D): void {
        let owner = other.owner as Laya.MeshSprite3D;
        owner.parent.removeSelf();
        
    }


    lwgOnUpdate(): void {
    }
    lwgDisable(): void {

    }
}