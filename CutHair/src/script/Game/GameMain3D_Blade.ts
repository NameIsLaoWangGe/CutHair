import { lwg } from "../Lwg_Template/lwg";

export default class GameMain3D_Blade extends lwg.Admin.Object3D {

    lwgInit(): void {
    }
    onTriggerEnter(other): void {
        let otherOwner = other.owner as Laya.Sprite3D;
        let otherOwnerParent = otherOwner.parent as Laya.Sprite3D;

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

                // 克隆一个掉落的头发，并且使其掉落
                let cutHairline = otherOwnerParent.clone() as Laya.MeshSprite3D;
                cutHairline.transform.localScaleY -= otherOwnerParent.transform.localScaleY * (1 - cutRatio);
                cutHairline.name = 'cutHairline';
                cutHairline.getChildAt(0).name = 'cutHairline';
                otherOwnerParent.parent.addChild(cutHairline);
                // let rig3D = cutHairline.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
                // rig3D.isKinematic = false;
                // rig3D.restitution = 0.1;
                // rig3D.gravity = (new Laya.Vector3(0, -1, 0));
                // rig3D.mass = 0.1;
                break;
            default:
                break;
        }
    }

    /**
     * 创建一个被剪掉的头发
     * @param len 
     */
    cutHairline(len): void {
    }

    lwgOnUpdate(): void {
    }
    lwgDisable(): void {

    }
}