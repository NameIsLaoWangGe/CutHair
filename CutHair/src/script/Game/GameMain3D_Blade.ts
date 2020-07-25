import { lwg, EventAdmin, Global } from "../Lwg_Template/lwg";
import { GEnum, GSene3D } from "../Lwg_Template/Global";

export default class GameMain3D_Blade extends lwg.Admin.Object3D {

    /**头发的总数*/
    hairsNumber: any;
    lwgOnEnable(): void {

    }

    onTriggerEnter(other): void {
        if (!lwg.Admin._gameStart) {
            return;
        }
        let otherOwner = other.owner as Laya.MeshSprite3D;
        let otherOwnerParent = otherOwner.parent as Laya.MeshSprite3D;

        switch (otherOwner.name) {
            case 'Hairline':
                // 当前头发的实际长度
                let length = otherOwnerParent.transform.localScaleY * 2 * otherOwner.transform.localScaleY;
                // 实际高度，带有角度后的高度必定短于实际长度 
                let HairlineH = lwg.Tools.dotRotateXY(otherOwnerParent.transform.position.x, otherOwnerParent.transform.position.y, otherOwnerParent.transform.position.x, otherOwnerParent.transform.position.y + length, otherOwnerParent.transform.localRotationEulerZ).y - otherOwnerParent.transform.position.y;
                // console.log(HairlineH, HairlineH1);
                // 剃刀和头发的距离
                let diffY = Math.abs((this.selfTransform.position.y - this.self.transform.localScaleY / 2) - otherOwnerParent.transform.position.y);
                //被截掉头发的高度
                let cutH = HairlineH - diffY;
                // 被截取头发高度和总高度的缩放比例scale，减去的头发并不是长度，而是高度
                let cutRatio = cutH / HairlineH;
                // console.log('截取比例', ratio);
                // 截取
                otherOwnerParent.transform.localScaleY -= otherOwnerParent.transform.localScaleY * cutRatio;
                // ['HairLen']为我们自己赋值的属性
                if (otherOwnerParent['HairLen']) {
                    otherOwnerParent['HairLen'].setValue = otherOwnerParent.transform.localScaleY;
                }
                // 三分之一概率不生成
                if (Math.floor(Math.random() * 5) === 1) {
                    // 过短则不生成，否则太多太碎
                    if (cutH >= 0.01) {
                        // 克隆一个掉落的头发，并且使其掉落
                        let cutHair = otherOwnerParent.clone() as Laya.MeshSprite3D;
                        cutHair.transform.localScaleY = cutHair.transform.localScaleY * cutRatio;
                        let CutHairParent = GSene3D.Head.getChildByName('CutHairParent') as Laya.MeshSprite3D;
                        cutHair.name = 'cutHair';
                        CutHairParent.addChild(cutHair);
                        cutHair.transform.position = this.self.transform.position;

                        let cutHairline = cutHair.getChildAt(0);
                        cutHairline.name = 'cutHairline';
                        let rig3D = cutHairline.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
                        rig3D.isKinematic = false;
                        rig3D.gravity = (new Laya.Vector3(0, -0.5, -0.3));
                        rig3D.rollingFriction = 0;
                        rig3D.restitution = 0;
                    }
                }

                break;
            case 'standard':
                console.log('碰到线了，游戏失败！');
                EventAdmin.notify(EventAdmin.EventType.defeated);
                break;
            default:
                break;
        }
    }

    lwgOnUpdate(): void {
    }
    lwgDisable(): void {

    }
}