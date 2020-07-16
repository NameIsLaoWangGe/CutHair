import { lwg } from "../Lwg_Template/lwg";
import { G, GEnum } from "../Lwg_Template/Global";

export default class UIOperation extends lwg.Admin.Scene {

    /**大圆空间*/
    Scope: Laya.Sprite;
    /**摇杆*/
    Rocker: Laya.Sprite;
    /**摇杆移动半径*/
    radius: number;

    BtnAgain: Laya.Sprite;

    /**剃须刀*/
    Razor: Laya.Sprite3D;
    /**引导*/
    Guide: Laya.MeshSprite3D;
    /**3D场景内的摄像机*/
    MainCamera: Laya.Sprite3D;


    /**四个节点代表摄像机移动到四个任务的方位*/
    Landmark_Left: Laya.Sprite3D = new Laya.Sprite3D();
    Landmark_Right: Laya.Sprite3D = new Laya.Sprite3D();
    Landmark_Side: Laya.Sprite3D = new Laya.Sprite3D();
    Landmark_Top: Laya.Sprite3D = new Laya.Sprite3D();

    selfNode(): void {
        this.Rocker = this.self['Rocker'];
        this.Razor = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Razor;
        this.MainCamera = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].MainCamera;

        this.Landmark_Left = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Left;
        this.Landmark_Right = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Right;
        this.Landmark_Side = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Side;
        this.Landmark_Top = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Top;
    }

    /**摄像机和刀片的坐标差值*/
    cameraAndRazorPos: Laya.Vector3 = new Laya.Vector3();
    lwgInit(): void {
    }

    btnOnClick(): void {
        lwg.Click.on(lwg.Click.ClickType.largen, null, this.self['BtnLast'], this, this.btnAgainDown, null, this.btnAgainUp, null);
    }
    btnAgainDown(e: Laya.Event): void {
        e.stopPropagation();
    }
    btnAgainUp(e: Laya.Event): void {
        e.stopPropagation();
        G._taskNum++;
        this.mainCameraMove();
    }

    /**移动时间*/
    moveTime = 1000;
    /**
     * 摄像机的移动规则
     * */
    mainCameraMove(): void {
        if (G._taskNum > G._taskArr.length) {
            return;
        }
        switch (G._taskArr[G._taskNum]) {

            case GEnum.TaskType.leftBeard:
                this.setCamera(this.Landmark_Left.transform.position, this.Landmark_Left.transform.localRotationEuler, this.moveTime);
                break;

            case GEnum.TaskType.rightBeard:
                this.setCamera(this.Landmark_Right.transform.position, this.Landmark_Right.transform.localRotationEuler, this.moveTime);
                break;

            case GEnum.TaskType.sideHair:
                this.setCamera(this.Landmark_Side.transform.position, this.Landmark_Side.transform.localRotationEuler, this.moveTime);
                break;

            case GEnum.TaskType.topHead:
                this.setCamera(this.Landmark_Top.transform.position, this.Landmark_Top.transform.localRotationEuler, this.moveTime);
                break;

            default:
                break;
        }
    }

    /**
     * 缓动摄像机
     * @param z z轴移动到的位置
     * @param time 移动速度
     */
    public setCamera(v3_Pos: Laya.Vector3, v3_Rotate, time: number) {
        //创建一个Tween的属性对像
        let moveTarget = this.MainCamera.transform.position;

        Laya.Tween.to(moveTarget, {
            x: v3_Pos.x, y: v3_Pos.y, z: v3_Pos.z, update: new Laya.Handler(this, f => {
                this.MainCamera.transform.position = (new Laya.Vector3(moveTarget.x, moveTarget.y, moveTarget.z));
                //移动灯光位置
            })
        }, time, null);

        let rotateTarget = this.MainCamera.transform.localRotationEuler;
        Laya.Tween.to(rotateTarget, {
            x: v3_Rotate.x, y: v3_Rotate.y, z: v3_Rotate.z, update: new Laya.Handler(this, f => {
                this.MainCamera.transform.localRotationEulerX = (new Laya.Vector3(rotateTarget.x, rotateTarget.y, rotateTarget.z)).x;
                this.MainCamera.transform.localRotationEulerY = (new Laya.Vector3(rotateTarget.x, rotateTarget.y, rotateTarget.z)).y;
                this.MainCamera.transform.localRotationEulerZ = (new Laya.Vector3(rotateTarget.x, rotateTarget.y, rotateTarget.z)).z;
                //移动灯光位置
            })
        }, time, null);
    }


    /**触摸位置*/
    touchPosX: number;
    touchPosY: number;
    moveSwitch: boolean = false;
    onStageMouseDown(e: Laya.Event): void {
        this.moveSwitch = true;
        this.touchPosX = e.stageX;
        this.touchPosY = e.stageY;
    }

    onStageMouseMove(e: Laya.Event) {
        if (this.moveSwitch) {
            let diffX = e.stageX - this.touchPosX;
            let diffY = e.stageY - this.touchPosY;

            this.Rocker.x += diffX;
            this.Rocker.y += diffY;

            this.touchPosX = e.stageX;
            this.touchPosY = e.stageY;

            this.Razor.transform.localPositionX -= diffX * 0.01;
            this.Razor.transform.localPositionY -= diffY * 0.01;
        }
    }

    onStageMouseUp(e: Laya.Event) {
        this.moveSwitch = false;
    }

    /**指引图标的移动速度，也表现为灵敏度*/
    speed: number = 0.09;
    /**剃须刀跟随指引节点*/
    RazorFellowGuide(): void {
        let p = lwg.Tools.twoSubV3_3D(this.Razor.transform.position, this.Guide.transform.position);
        let normalizP = new Laya.Vector3();
        Laya.Vector3.normalize(p, normalizP);
        this.Razor.transform.localPositionX -= normalizP.x * this.speed;
        this.Razor.transform.localPositionZ -= normalizP.z * this.speed;
    }

    /**摄像机跟随着剃须刀*/
    cameraFellowRazor(): void {
        this.MainCamera.transform.localPositionX = this.Razor.transform.position.x - this.cameraAndRazorPos.x;
        this.MainCamera.transform.localPositionZ = this.Razor.transform.position.z - this.cameraAndRazorPos.z;
    }

    lwgOnUpdate(): void {
    }

}