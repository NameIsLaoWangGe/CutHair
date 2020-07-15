import { lwg } from "../Lwg_Template/lwg";

export default class GameMain3D_Blade extends lwg.Admin.Object3D {

    lwgInit(): void {

    }
    onTriggerEnter(other): void {
        let otherOwner = other.owner as Laya.Sprite3D;
        let otherParent = otherOwner.parent as Laya.Sprite3D;

        switch (otherOwner.name) {
            case 'Hairline':


                // 当前头发的真实长度
                let HairlineH = otherParent.transform.localScaleY * 2 * otherOwner.transform.localScaleY;
                // 剃刀和头发的距离
                let diffY = Math.abs((this.selfTransform.position.y - this.self.transform.localScaleY / 2) - otherParent.transform.position.y);
                //被截掉头发的长度
                let cutH = HairlineH - diffY;
                // 被截取头发长度和总长度的比例
                let ratio = cutH / HairlineH;
                // console.log('截取比例', ratio);
                // 截取
                otherParent.transform.localScaleY -= otherParent.transform.localScaleY * ratio;
                break;
            default:
                break;
        }
    }

    Rotate2(x1, y1, alpha, x2, y2)  {
        x2 = x1 * Math.cos(alpha) - y1 * Math.sin(alpha);
        y2 = x1 * Math.sin(alpha) + y1 * Math.cos(alpha);

        // x2 = a + (x0-a) * cos(angle * M_PI / 180) - (y0-b) * sin(angle * M_PI / 180);
        // y2 = b + (x0-a) * sin(angle * M_PI / 180) + (y0-b) * cos(angle * M_PI / 180);
  
    }

    lwgOnUpdate(): void {
    }
    lwgDisable(): void {

    }
}