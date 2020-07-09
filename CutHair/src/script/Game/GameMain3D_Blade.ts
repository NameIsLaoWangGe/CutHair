import { lwg } from "../Lwg_Template/lwg";

export default class GameMain3D_Blade extends lwg.Admin.Object3D {

    lwgInit(): void {

    }
    onTriggerEnter(other): void {
        let otherOwner = other.owner as Laya.Sprite3D;
        let otherParent = otherOwner.parent as Laya.Sprite3D;

        switch (otherOwner.name) {
            case 'Hairline':
                let posY1 = this.selfTransform.position.y;
                let posY2 = otherParent.transform.position.y + otherParent.transform.localScaleY;
                let diffY = Math.abs(posY1 - posY2);
                console.log('posY2:', posY2);
                console.log('posY1:', posY1);

                console.log('距离差值:', otherParent.transform.localScaleY - diffY / 10);
                // otherParent.transform.localScaleY -= 0.01;
                // return;


                if (diffY <= 0.01) {
                    otherParent.transform.localScaleY -= 0.01;
                } else {
                    otherParent.transform.localScaleY -= diffY;
                }
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