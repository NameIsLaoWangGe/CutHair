import { lwg, EventAdmin, Admin } from "../Lwg_Template/lwg";
import GameMain3D_Razor from "./GameMain3D_Razor";
import GameMain3D_Moustache from "./GameMain3D_Moustache";
import GameMain3D_Floor from "./GameMain3D_Floor";
import { Global, GVariate, GEnum } from "../Lwg_Template/Global";
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

    // 头
    Head: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    headFPos: Laya.Vector3 = new Laya.Vector3();
    headFEulerY: number;
    /**头发父节点*/
    HairParent: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**左侧胡须的父节点*/
    RightBeard: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**右侧须的父节点*/
    LeftBeard: Laya.MeshSprite3D = new Laya.MeshSprite3D();

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

        this.Floor = this.Level.getChildByName('Floor') as Laya.MeshSprite3D;

        this.Head = this.Level.getChildByName('Head') as Laya.MeshSprite3D;
        this.HairParent = this.Head.getChildByName('HairParent') as Laya.MeshSprite3D;
        this.LeftBeard = this.Head.getChildByName('LeftBeard') as Laya.MeshSprite3D;
        this.RightBeard = this.Head.getChildByName('RightBeard') as Laya.MeshSprite3D;

        this.knife = this.Level.getChildByName('knife') as Laya.MeshSprite3D;
        this.Capsule = this.Head.getChildByName('Capsule') as Laya.MeshSprite3D;
        let capsuleRig3D = this.Capsule.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        capsuleRig3D.restitution = 0;

    }

    lwgOnEnable(): void {
        this.Floor.addComponent(GameMain3D_Floor);
        this.Razor.addComponent(GameMain3D_Razor);
        this.knife.addComponent(GameMain3D_knife);
    }

    eventReg(): void {
        // 重来
        EventAdmin.reg(EventAdmin.EventType.scene3DRefresh, this, () => {
            this.refreshScene();
        })
    };

    refreshScene(): void {
        this.Level.removeSelf();

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

        this.Floor = this.Level.getChildByName('Floor') as Laya.MeshSprite3D;

        this.Head = this.Level.getChildByName('Head') as Laya.MeshSprite3D;
        this.HairParent = this.Head.getChildByName('HairParent') as Laya.MeshSprite3D;
        this.LeftBeard = this.Head.getChildByName('LeftBeard') as Laya.MeshSprite3D;
        this.RightBeard = this.Head.getChildByName('RightBeard') as Laya.MeshSprite3D;

        this.knife = this.Level.getChildByName('knife') as Laya.MeshSprite3D;
        this.Capsule = this.Head.getChildByName('Capsule') as Laya.MeshSprite3D;
        let capsuleRig3D = this.Capsule.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        capsuleRig3D.restitution = 0;

        this.lwgOnEnable();
    }

    lwgOnUpDate(): void {

    }

}