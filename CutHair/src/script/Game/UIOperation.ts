import { lwg, Click, Animation, Animation3D } from "../Lwg_Template/lwg";
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
    Razor: Laya.MeshSprite3D;
    /**刮刀*/
    knife: Laya.MeshSprite3D;
    /**引导*/
    Guide: Laya.MeshSprite3D;
    /**3D场景内的摄像机*/
    MainCamera: Laya.MeshSprite3D;

    Capsule: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**四个节点代表摄像机移动到四个任务的方位*/
    Landmark_Left: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Right: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Side: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Top: Laya.MeshSprite3D = new Laya.MeshSprite3D();

    /**射线*/
    _ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));;
    /**射线扫描结果*/
    outs: Array<Laya.HitResult> = new Array<Laya.HitResult>();

    GameMain3D: Laya.Scene3D;

    selfNode(): void {
        this.Rocker = this.self['Rocker'];

        this.GameMain3D = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D];
        this.MainCamera = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].MainCamera;
        this.Razor = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Razor;
        this.knife = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].knife;

        this.Landmark_Left = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Left;
        this.Landmark_Right = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Right;
        this.Landmark_Side = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Side;
        this.Landmark_Top = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Landmark_Top;

        this.Capsule = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D]['GameMain3D'].Capsule;
    }

    /**摄像机和刀片的坐标差值*/
    cameraAndRazorPos: Laya.Vector3 = new Laya.Vector3();
    lwgOnEnable(): void {
        G._taskNum = 0;
        lwg.Admin._gameStart = true;
        G._taskArr = [GEnum.TaskType.sideHair, GEnum.TaskType.rightBeard, GEnum.TaskType.leftBeard];
    }

    btnOnClick(): void {
        lwg.Click.on(Click.ClickType.largen, null, this.self['BtnLast'], this, this.btnAgainDown, null, this.btnAgainUp, null);
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
                // Animation3D.Pos_Euler(this.MainCamera, this.Landmark_Left.transform.position, this.Landmark_Side.transform.localRotationEuler, this.moveTime);
                this.setCamera(this.Landmark_Left.transform.position, this.Landmark_Left.transform.localRotationEuler, this.moveTime);

                break;

            case GEnum.TaskType.rightBeard:
                // Animation3D.Pos_Euler(this.MainCamera, this.Landmark_Right.transform.position, this.Landmark_Side.transform.localRotationEuler, this.moveTime);
                this.setCamera(this.Landmark_Right.transform.position, this.Landmark_Right.transform.localRotationEuler, this.moveTime);
                break;

            case GEnum.TaskType.sideHair:
                // Animation3D.Pos_Euler(this.MainCamera, this.Landmark_Side.transform.position, this.Landmark_Side.transform.localRotationEuler, this.moveTime);

                this.setCamera(this.Landmark_Side.transform.position, this.Landmark_Side.transform.localRotationEuler, this.moveTime);
                break;

            case GEnum.TaskType.topHead:
                // Animation3D.Pos_Euler(this.MainCamera, this.Landmark_Top.transform.position, this.Landmark_Top.transform.localRotationEuler, this.moveTime);
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
    public setCamera(v3_Pos: Laya.Vector3, v3_Rotate: Laya.Vector3, time: number) {
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

            switch (G._taskArr[G._taskNum]) {

                case GEnum.TaskType.sideHair:
                    this.Razor.transform.localPositionX -= diffX * 0.01;
                    this.Razor.transform.localPositionY -= diffY * 0.01;
                    break;

                case GEnum.TaskType.leftBeard:

                    let hitResult1 = this.rayDetection() as Laya.HitResult;
                    if (hitResult1) {
                        let pos = hitResult1.point;
                        this.knife.transform.position = pos;
                        this.knife.transform.lookAt(this.Capsule.transform.position, new Laya.Vector3(0, 1, 0));
                    }

                    break;

                case GEnum.TaskType.rightBeard:
                    let hitResult2 = this.rayDetection() as Laya.HitResult;
                    if (hitResult2) {
                        let pos = hitResult2.point;
                        this.knife.transform.position = pos;
                        this.knife.transform.lookAt(this.Capsule.transform.position, new Laya.Vector3(0, 1, 0));
                    }

                    break;

                case GEnum.TaskType.topHead:
                    break;

                default:
                    break;
            }

        }
    }

    /**射线检测*/
    rayDetection(): any {
        //产生射线
        //射线碰撞到挡屏，用来设置手的初始位置，挡屏的属性isTrigger 要勾上，这样只检测碰撞，不产生碰撞反应
        let Camera = this.MainCamera.getChildByName('MainCamera') as Laya.Camera;
        Camera.viewportPointToRay(new Laya.Vector2(this.touchPosX, this.touchPosY), this._ray);
        this.GameMain3D.physicsSimulation.rayCastAll(this._ray, this.outs);
        //找到挡屏的位置，把手的位置放在投屏位置的上方，也就是触摸点的上方
        if (this.outs.length != 0) {
            let outsChaild = null;
            let Capsule = null;
            for (var i = 0; i < this.outs.length; i++) {
                //找到挡屏
                let hitResult = this.outs[i].collider.owner;
                if (hitResult.name === 'Capsule') {
                    // 开启移动
                    Capsule = hitResult;
                    outsChaild = this.outs[i];
                }
            }
            return outsChaild;
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