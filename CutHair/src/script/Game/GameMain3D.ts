import { lwg, EventAdmin, Admin } from "../Lwg_Template/lwg";
import GameMain3D_Razor from "./GameMain3D_Razor";
import GameMain3D_Moustache from "./GameMain3D_Moustache";
import GameMain3D_Floor from "./GameMain3D_Floor";
import { Global, GVariate, GEnum, GSene3D } from "../Lwg_Template/Global";
import GameMain3D_knife from "./GameMain3D_knife";
export default class GameMain3D extends lwg.Admin.Scene3D {

    constructor() { super(); }

    lwgOnAwake(): void {
        GSene3D.GameMain3D = this.self;
        GSene3D.MainCamera = this.MainCamera;
        console.log(GSene3D.MainCamera);
        GSene3D.LevelTem = this.self.getChildByName('Level_001') as Laya.MeshSprite3D;
        GSene3D.LevelFpos.x = GSene3D.LevelTem.transform.position.x;
        GSene3D.LevelFpos.y = GSene3D.LevelTem.transform.position.y;
        GSene3D.LevelFpos.z = GSene3D.LevelTem.transform.position.z;
        this.createLevel();
    }

    /**产生关卡*/
    createLevel(): void {
        GSene3D.Level = GSene3D.LevelTem.clone() as Laya.MeshSprite3D;
        this.self.addChild(GSene3D.Level)
        GSene3D.LevelTem.removeSelf();
    }
    selfNode(): void {

        GSene3D.Head = GSene3D.Level.getChildByName('Head') as Laya.MeshSprite3D;
        GSene3D.Headcollision = GSene3D.Head.getChildByName('Headcollision') as Laya.MeshSprite3D;
        let TouchHeadRig = GSene3D.Headcollision.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        TouchHeadRig.restitution = 0;

        GSene3D.HairParent = GSene3D.Head.getChildByName('HairParent') as Laya.MeshSprite3D;
        GSene3D.LeftBeard = GSene3D.Head.getChildByName('LeftBeard') as Laya.MeshSprite3D;
        GSene3D.RightBeard = GSene3D.Head.getChildByName('RightBeard') as Laya.MeshSprite3D;
        GSene3D.MiddleBeard = GSene3D.Head.getChildByName('MiddleBeard') as Laya.MeshSprite3D;
        GSene3D.UpRightBeard = GSene3D.Head.getChildByName('UpRightBeard') as Laya.MeshSprite3D;
        GSene3D.UpLeftBeard = GSene3D.Head.getChildByName('UpLeftBeard') as Laya.MeshSprite3D;

        GSene3D.HeadSimulate = GSene3D.Head.getChildByName('HeadSimulate') as Laya.MeshSprite3D

        GSene3D.Landmark_Side = this.self.getChildByName('Landmark_Side') as Laya.MeshSprite3D;
        GSene3D.Landmark_Right = this.self.getChildByName('Landmark_Right') as Laya.MeshSprite3D;
        GSene3D.Landmark_Middle = this.self.getChildByName('Landmark_Middle') as Laya.MeshSprite3D;
        GSene3D.Landmark_Left = this.self.getChildByName('Landmark_Left') as Laya.MeshSprite3D;
        GSene3D.Landmark_UpRight = this.self.getChildByName('Landmark_UpRight') as Laya.MeshSprite3D;
        GSene3D.Landmark_UpLeft = this.self.getChildByName('Landmark_UpLeft') as Laya.MeshSprite3D;

        GSene3D.LeftSignknife = this.self.getChildByName('LeftSignknife') as Laya.MeshSprite3D;
        GSene3D.MiddleSignknife = this.self.getChildByName('MiddleSignknife') as Laya.MeshSprite3D;
        GSene3D.RightSignknife = this.self.getChildByName('RightSignknife') as Laya.MeshSprite3D;
        GSene3D.UpRightKnife = this.self.getChildByName('UpRightKnife') as Laya.MeshSprite3D;
        GSene3D.UpLeftKnife = this.self.getChildByName('UpLeftKnife') as Laya.MeshSprite3D;

        GSene3D.TouchScreen = this.self.getChildByName('TouchScreen') as Laya.MeshSprite3D;

        GSene3D.Razor = GSene3D.Level.getChildByName('Razor') as Laya.MeshSprite3D;
        GSene3D.razorFPos.x = GSene3D.Razor.transform.localPositionX;
        GSene3D.razorFPos.y = GSene3D.Razor.transform.localPositionY;
        GSene3D.razorFPos.z = GSene3D.Razor.transform.localPositionZ;
        GSene3D.razorFEulerY = GSene3D.Razor.transform.localRotationEulerY;

        GSene3D.Floor = GSene3D.Level.getChildByName('Floor') as Laya.MeshSprite3D;

        GSene3D.knife = GSene3D.Level.getChildByName('knife') as Laya.MeshSprite3D;

    }

    lwgOnEnable(): void {
        GSene3D.Floor.addComponent(GameMain3D_Floor);
        GSene3D.Razor.addComponent(GameMain3D_Razor);
        GSene3D.knife.addComponent(GameMain3D_knife);
    }

    lwgEventReg(): void {
        // 重来
        EventAdmin.reg(EventAdmin.EventType.scene3DRefresh, GSene3D, () => {
            this.refreshScene();
        })
    };

    refreshScene(): void {
        GSene3D.Level.removeSelf();
        this.createLevel();
        this.selfNode();
        this.lwgOnEnable();
    }

    lwgOnUpDate(): void {

    }

}