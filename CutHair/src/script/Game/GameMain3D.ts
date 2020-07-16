import { lwg } from "../Lwg_Template/lwg";
import GameMain3D_Razor from "./GameMain3D_Razor";
import GameMain3D_Moustache from "./GameMain3D_Moustache";
import GameMain3D_Floor from "./GameMain3D_Floor";
import { Global, G, GEnum } from "../Lwg_Template/Global";
export default class GameMain3D extends lwg.Admin.Scene3D {

    Razor: Laya.Sprite3D = new Laya.Sprite3D();
    razorFPos: Laya.Vector3 = new Laya.Vector3();
    razorFEulerY: number;

    Head: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    headFPos: Laya.Vector3 = new Laya.Vector3();
    headFEulerY: number;

    LevelTem: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Level: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    LevelFpos: Laya.Vector3 = new Laya.Vector3();

    mainCameraFpos: Laya.Vector3 = new Laya.Vector3();

    Assembly: Laya.Sprite3D = new Laya.Sprite3D();
    Mustache_RootTem: Laya.Sprite3D = new Laya.Sprite3D();

    Floor: Laya.Sprite3D = new Laya.Sprite3D();

    Capsule: Laya.Sprite3D = new Laya.Sprite3D();

    /**四个节点代表摄像机移动到四个任务的方位*/
    Landmark_Left: Laya.Sprite3D = new Laya.Sprite3D();
    Landmark_Right: Laya.Sprite3D = new Laya.Sprite3D();
    Landmark_Side: Laya.Sprite3D = new Laya.Sprite3D();
    Landmark_Top: Laya.Sprite3D = new Laya.Sprite3D();
    constructor() { super(); }

    lwgInit(): void {
        this.Landmark_Left = this.self.getChildByName('Landmark_Left') as Laya.Sprite3D;
        this.Landmark_Right = this.self.getChildByName('Landmark_Right') as Laya.Sprite3D;
        this.Landmark_Side = this.self.getChildByName('Landmark_Side') as Laya.Sprite3D;
        this.Landmark_Top = this.self.getChildByName('Landmark_Top') as Laya.Sprite3D;


        this.Razor = this.self.getChildByName('Razor') as Laya.Sprite3D;
        this.razorFPos.x = this.Razor.transform.localPositionX;
        this.razorFPos.y = this.Razor.transform.localPositionY;
        this.razorFPos.z = this.Razor.transform.localPositionZ;
        this.razorFEulerY = this.Razor.transform.localRotationEulerY;
        this.Razor.addComponent(GameMain3D_Razor);

        this.Floor = this.self.getChildByName('Floor') as Laya.Sprite3D;
        this.Floor.addComponent(GameMain3D_Floor);

        this.Head = this.self.getChildByName('Head') as Laya.MeshSprite3D;
        this.Capsule = this.Head.getChildByName('Capsule') as Laya.MeshSprite3D;
        let capsuleRig3D = this.Capsule.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        capsuleRig3D.restitution = 0;

        G._taskArr = [GEnum.TaskType.sideHair, GEnum.TaskType.rightBeard, GEnum.TaskType.leftBeard];

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

    lwgUpDate(): void {

    }

}