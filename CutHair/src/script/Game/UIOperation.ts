import { lwg } from "../Lwg_Template/lwg";

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


    selfNode(): void {
        // this.Scope = this.self['Scope'];
        this.Rocker = this.self['Rocker'];
        // this.BtnAgain = this.self['BtnAgain'];
        // this.Guide = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Guide;
        // this.MainCamera = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].MainCamera;
        this.Razor = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Razor;

    }

    /**摄像机和刀片的坐标差值*/
    cameraAndRazorPos: Laya.Vector3 = new Laya.Vector3();
    lwgInit(): void {
        // this.radius = this.Scope.width / 2;
        // this.Razor.transform.localRotationEulerY = 180;
        // this.Rocker.x = this.Scope.x;
        // this.Rocker.y = this.Scope.y;
        // lwg.Global._gameStart = true;
        // this.BtnAgain.visible = false;

        // this.cameraAndRazorPos.x = this.Razor.transform.position.x - this.MainCamera.transform.position.x;
        // this.cameraAndRazorPos.y = this.Razor.transform.position.y - this.MainCamera.transform.position.y;
        // this.cameraAndRazorPos.z = this.Razor.transform.position.z - this.MainCamera.transform.position.z;
    }

    btnOnClick(): void {
        // lwg.Click.on(lwg.Click.ClickType.largen, null, this.BtnAgain, this, null, null, this.btnAgainUp, null);
    }
    btnAgainUp(): void {
        // lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].refresh3DScene();
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
    speed: number = 0.08;
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

    lwgUpDate(): void {

    }

}