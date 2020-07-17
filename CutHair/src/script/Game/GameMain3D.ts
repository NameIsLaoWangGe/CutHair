import { lwg } from "../Lwg_Template/lwg";
import GameMain3D_Razor from "./GameMain3D_Razor";
import GameMain3D_Moustache from "./GameMain3D_Moustache";
import GameMain3D_Floor from "./GameMain3D_Floor";
import { Global, G, GEnum } from "../Lwg_Template/Global";
import GameMain3D_knife from "./GameMain3D_knife";
export default class GameMain3D extends lwg.Admin.Scene3D {
    // 剃刀 
    Razor: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    razorFPos: Laya.Vector3 = new Laya.Vector3();
    razorFEulerY: number;

    // 刮脸的刮刀
    knife: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    knifeFPos: Laya.Vector3 = new Laya.Vector3();
    knifeFEulerY: number;

    Head: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    headFPos: Laya.Vector3 = new Laya.Vector3();
    headFEulerY: number;

    //当前关卡节点
    LevelTem: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Level: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    LevelFpos: Laya.Vector3 = new Laya.Vector3();


    // 地板
    Floor: Laya.MeshSprite3D = new Laya.MeshSprite3D();

    // 头部
    Capsule: Laya.MeshSprite3D = new Laya.MeshSprite3D();


    /**四个节点代表摄像机移动到四个任务的方位*/
    Landmark_Left: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Right: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Side: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Top: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    constructor() { super(); }


    selfNode(): void {

        this.LevelTem = this.self.getChildByName('Level_001') as Laya.MeshSprite3D;
        this.LevelFpos.x = this.LevelTem.transform.position.x;
        this.LevelFpos.y = this.LevelTem.transform.position.y;
        this.LevelFpos.z = this.LevelTem.transform.position.z;

        this.Level = this.LevelTem.clone() as Laya.MeshSprite3D;
        this.self.addChild(this.Level);
        this.LevelTem.removeSelf();

        this.Landmark_Left = this.Level.getChildByName('Landmark_Left') as Laya.MeshSprite3D;
        this.Landmark_Right = this.Level.getChildByName('Landmark_Right') as Laya.MeshSprite3D;
        this.Landmark_Side = this.Level.getChildByName('Landmark_Side') as Laya.MeshSprite3D;
        this.Landmark_Top = this.Level.getChildByName('Landmark_Top') as Laya.MeshSprite3D;

        this.Razor = this.Level.getChildByName('Razor') as Laya.MeshSprite3D;
        this.razorFPos.x = this.Razor.transform.localPositionX;
        this.razorFPos.y = this.Razor.transform.localPositionY;
        this.razorFPos.z = this.Razor.transform.localPositionZ;
        this.razorFEulerY = this.Razor.transform.localRotationEulerY;
        this.Razor.addComponent(GameMain3D_Razor);


        this.Floor = this.Level.getChildByName('Floor') as Laya.MeshSprite3D;
        this.Floor.addComponent(GameMain3D_Floor);

        this.Head = this.Level.getChildByName('Head') as Laya.MeshSprite3D;
        this.knife = this.Head.getChildByName('knife') as Laya.MeshSprite3D;
        this.knife.addComponent(GameMain3D_knife);
        this.Capsule = this.Head.getChildByName('Capsule') as Laya.MeshSprite3D;
        let capsuleRig3D = this.Capsule.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        capsuleRig3D.restitution = 0;

    }

    lwgOnEnable(): void {
    }


    /**重制整个场景，包括物体的位置和大小*/
    refresh3DScene(): void {
        this.Razor.transform.localPositionX = this.razorFPos.x;
        this.Razor.transform.localPositionY = this.razorFPos.y;
        this.Razor.transform.localPositionZ = this.razorFPos.z;
        this.Razor.transform.localRotationEulerY = this.razorFEulerY;

        this.Head.transform.localPositionX = this.headFPos.x;
        this.Head.transform.localPositionY = this.headFPos.y;
        this.Head.transform.localPositionZ = this.headFPos.z;
        this.Head.transform.localRotationEulerY = this.headFEulerY;

        this.MainCamera.transform.localPositionX = this.mainCameraFpos.x;
        this.MainCamera.transform.localPositionY = this.mainCameraFpos.y;
        this.MainCamera.transform.localPositionZ = this.mainCameraFpos.z;

        if (this.Level.parent) {
            this.Level.removeSelf();
            this.Level = this.LevelTem.clone() as Laya.MeshSprite3D;
            this.self.addChild(this.Level);
            let MustacheParent = this.Level.getChildByName('MustacheParent') as Laya.MeshSprite3D;
            for (let index = 0; index < MustacheParent.numChildren; index++) {
                const element = MustacheParent.getChildAt(index);
                let script = element.getComponent(GameMain3D_Moustache);
                if (script === null) {
                    element.addComponent(GameMain3D_Moustache);
                }
            }
        }

        lwg.Global._gameStart = true;
    }

    lwgOnUpDate(): void {

    }

}