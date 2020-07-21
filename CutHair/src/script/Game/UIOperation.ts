import { lwg, Click, Animation, Animation3D, Tools, EventAdmin, Admin } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIOperation extends lwg.Admin.Scene {
    /** @prop {name:TaskProgress, tips:"每个任务的进度条", type:Prefab}*/
    public TaskProgress: Laya.Prefab;

    /**摇杆*/
    Rocker: Laya.Sprite;
    /**剃须刀*/
    Razor: Laya.MeshSprite3D;
    /**刮刀*/
    knife: Laya.MeshSprite3D;
    /**3D场景内的摄像机*/
    MainCamera: Laya.MeshSprite3D;

    Capsule: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**节点代表摄像机移动到四个任务的方位*/
    Landmark_Left: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Right: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Side: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Top: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    Landmark_Middle: Laya.MeshSprite3D = new Laya.MeshSprite3D();

    /**射线*/
    _ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
    /**射线扫描结果*/
    outs: Array<Laya.HitResult> = new Array<Laya.HitResult>();

    /**当前3D主场景*/
    GameMain3D: Laya.Scene3D;
    /**任务进度条父节点*/
    TaskBar: Laya.Sprite;
    /**下一个任务按钮*/
    BtnLast: Laya.Sprite;

    /**头发父节点*/
    HairParent: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**左侧胡须的父节点*/
    RightBeard: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**右侧须的父节点*/
    LeftBeard: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**中间胡须父节点*/
    MiddleBeard: Laya.MeshSprite3D = new Laya.MeshSprite3D();
    /**任务父节点集合*/
    taskArr: Array<any> = [];

    /**侧面所需理发的数量*/
    _sideHairNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余需要修理的头发', this.value);
                if (this.value <= 3) {
                    this.switch = false;
                    console.log('任务完成了！');
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    };

    /**左侧胡子的数量*/
    _leftBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余需要修理胡须的数量', this.value);
                if (this.value <= 3) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**右侧胡子的数量*/
    _rightBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余需要修理胡须的数量', this.value);
                if (this.value <= 3) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**右侧胡子的数量*/
    _middleBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余需要修理胡须的数量', this.value);
                if (this.value <= 3) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    selfNode(): void {
        this.Rocker = this.self['Rocker'];
        this.GameMain3D = lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D];
        this.MainCamera = this.GameMain3D['GameMain3D'].MainCamera;
        this.Razor = this.GameMain3D['GameMain3D'].Razor;
        this.knife = this.GameMain3D['GameMain3D'].knife;

        this.Landmark_Left = this.GameMain3D['GameMain3D'].Landmark_Left;
        this.Landmark_Right = this.GameMain3D['GameMain3D'].Landmark_Right;
        this.Landmark_Middle = this.GameMain3D['GameMain3D'].Landmark_Middle;
        this.Landmark_Side = this.GameMain3D['GameMain3D'].Landmark_Side;
        this.Landmark_Top = this.GameMain3D['GameMain3D'].Landmark_Top;

        this.Capsule = this.GameMain3D['GameMain3D'].Capsule;

        this.HairParent = this.GameMain3D['GameMain3D'].HairParent;
        this.LeftBeard = this.GameMain3D['GameMain3D'].LeftBeard;
        this.RightBeard = this.GameMain3D['GameMain3D'].RightBeard;
        this.MiddleBeard = this.GameMain3D['GameMain3D'].MiddleBeard;

        this.TaskBar = this.self['TaskBar'];

        this.BtnLast = this.self['BtnLast'];
    }

    lwgOnEnable(): void {
        GVariate._taskNum = 0;
        lwg.Admin._gameStart = true;
        GVariate._taskArr = [GEnum.TaskType.sideHair, GEnum.TaskType.rightBeard, GEnum.TaskType.middleBeard, GEnum.TaskType.leftBeard];
        this.createProgress();
        this.BtnLast.visible = false;
        this.createTaskContent();
        this.mainCameraMove();
    }

    lwgEventReg(): void {
        // 胜利
        EventAdmin.reg(EventAdmin.EventType.taskReach, this, () => {
            if (GVariate._taskNum >= GVariate._taskArr.length - 1) {
                Admin._openScene(Admin.SceneName.UIVictory, null, null, f => {
                });
            } else {
                //刷新一下属性 
                this.BtnLast.visible = true;
            }
        })

        // 失败
        EventAdmin.reg(EventAdmin.EventType.defeated, this, () => {
            Admin._gameStart = false;
            Admin._openScene(Admin.SceneName.UIDefeated, null, null, f => { });
        })

        // 重来
        EventAdmin.reg(EventAdmin.EventType.operrationRefresh, this, () => {
            lwg.Admin._openScene(Admin.SceneName.UIOperation, null, this.self, () => { })
        })

        // 左侧胡子修剪
        EventAdmin.reg(GEnum.EventType.leftBeard, this, () => {
            this._leftBeardNum.setValue = this._leftBeardNum.value - 0.5;
        })

        // 右侧胡子修剪
        EventAdmin.reg(GEnum.EventType.rightBeard, this, () => {
            this._rightBeardNum.setValue = this._rightBeardNum.value - 0.5;
        })

        // 中间的胡子修剪
        EventAdmin.reg(GEnum.EventType.middleBeard, this, () => {
            this._middleBeardNum.setValue = this._middleBeardNum.value - 0.5;
        })

        // 进度条的变化
        EventAdmin.reg(GEnum.EventType.taskProgress, this, () => {
            /**进度条*/
            let TaskBar = this.TaskBar.getChildAt(GVariate._taskNum) as Laya.Sprite;
            let Bar = TaskBar.getChildByName('Bar') as Laya.Image;
            let sum;
            let value;
            switch (GVariate._taskArr[GVariate._taskNum]) {
                case GEnum.TaskType.sideHair:
                    value = this._sideHairNum.value;
                    sum = this._sideHairNum.sum;
                    break;
                case GEnum.TaskType.leftBeard:
                    value = this._leftBeardNum.value;
                    sum = this._leftBeardNum.sum;

                    break;
                case GEnum.TaskType.rightBeard:
                    value = this._rightBeardNum.value;
                    sum = this._rightBeardNum.sum;

                    break;
                case GEnum.TaskType.middleBeard:
                    value = this._middleBeardNum.value;
                    sum = this._middleBeardNum.sum;

                    break;
                default:
                    break;
            }
            Bar.mask.x = (sum - value) * Bar.width / sum - Bar.mask.width;
        })
    }

    /**
     * 创建任务进度条,并且居中
     */
    createProgress(): void {
        let spacing = 100;
        for (let index = 0; index < GVariate._taskArr.length; index++) {
            const TaskPro = Laya.Pool.getItemByCreateFun('TaskPro', this.TaskProgress.create, this.TaskProgress) as Laya.Sprite;
            this.TaskBar.addChild(TaskPro);
            TaskPro.pos(index * spacing, 0);
            let Bar = TaskPro.getChildByName('Bar') as Laya.Image;
        }
        this.TaskBar.width = GVariate._taskArr.length * spacing;
        this.TaskBar.pivotX = this.TaskBar.width / 2;
        this.TaskBar.x = Laya.stage.width / 2;
    }

    /**
     * 创建每个任务需要的修剪内容,一般是头发的数量
     * */
    createTaskContent(): void {
        for (let index = 0; index < GVariate._taskArr.length; index++) {
            switch (GVariate._taskArr[index]) {
                case GEnum.TaskType.sideHair:
                    this._sideHairNum.setValue = this.HairParent.numChildren;
                    this._sideHairNum.sum = this.HairParent.numChildren;
                    this._sideHairNum.index = index;
                    this.monitorHiarLen();
                    this.taskArr.push(this._sideHairNum);
                    break;
                case GEnum.TaskType.leftBeard:
                    this._leftBeardNum.setValue = this.LeftBeard.numChildren;
                    this._leftBeardNum.sum = this.LeftBeard.numChildren;
                    this._leftBeardNum.index = index;
                    this.taskArr.push(this._leftBeardNum);

                    break;
                case GEnum.TaskType.rightBeard:
                    this._rightBeardNum.setValue = this.RightBeard.numChildren;
                    this._rightBeardNum.sum = this.RightBeard.numChildren;
                    this._rightBeardNum.index = index;
                    this.taskArr.push(this._rightBeardNum);

                    break;

                case GEnum.TaskType.middleBeard:
                    this._middleBeardNum.setValue = this.RightBeard.numChildren;
                    this._middleBeardNum.sum = this.RightBeard.numChildren;
                    this._middleBeardNum.index = index;
                    this.taskArr.push(this._middleBeardNum);


                    break;
                default:
                    break;
            }
        }

    }

    /**监听每根头发的长度*/
    monitorHiarLen(): void {
        let _sideHairNum = this._sideHairNum;
        for (let index = 0; index < this.HairParent.numChildren; index++) {
            const element = this.HairParent.getChildAt(index) as Laya.MeshSprite3D;
            let len = element.transform.localPositionY;
            element['HairLen'] = {
                detection: true,
                value: len,
                get getValue(): number {
                    return this.value
                },
                set setValue(v: number) {
                    if (this.detection) {
                        if (v < 0.13) {
                            // console.log('这根头发理完了！');
                            this.detection = false;
                            _sideHairNum.setValue = _sideHairNum.value - 1;
                        }
                        this.value = v;
                        // console.log('当前头发长度', this.value);
                    } else {
                        // console.log('抱歉!,这根头发已经检测过了');
                    }
                }
            }
        }
    }

    /**移动时间*/
    moveTime = 1000;
    /**
     * 摄像机的移动规则
     * */
    mainCameraMove(): void {
        if (GVariate._taskNum > GVariate._taskArr.length) {
            return;
        }
        switch (GVariate._taskArr[GVariate._taskNum]) {

            case GEnum.TaskType.leftBeard:
                this.knife.transform.localPosition = new Laya.Vector3(0.02, 0.132, 1.321);
                this.knife.transform.localRotationEuler = new Laya.Vector3(0, 325.577 + 90, 0);
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

            case GEnum.TaskType.middleBeard:
                // Animation3D.Pos_Euler(this.MainCamera, this.Landmark_Top.transform.position, this.Landmark_Top.transform.localRotationEuler, this.moveTime);
                this.setCamera(this.Landmark_Middle.transform.position, this.Landmark_Middle.transform.localRotationEuler, this.moveTime);

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

    btnOnClick(): void {
        lwg.Click.on(Click.ClickType.largen, null, this.BtnLast, this, null, null, this.btnLastUp, null);
    }

    btnLastUp(e: Laya.Event): void {
        this.BtnLast.visible = false;
        this.moveSwitch = false;
        e.stopPropagation();
        GVariate._taskNum++;
        this.mainCameraMove();
        EventAdmin.notify(GEnum.EventType.taskProgress);
        if (this.taskArr[GVariate._taskNum].value <= 3) {
            EventAdmin.notify(EventAdmin.EventType.taskReach);
        }
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
        if (!Admin._gameStart) {
            return;
        }

        if (this.moveSwitch) {

            let diffX = e.stageX - this.touchPosX;
            let diffY = e.stageY - this.touchPosY;

            this.Rocker.x += diffX;
            this.Rocker.y += diffY;

            this.touchPosX = e.stageX;
            this.touchPosY = e.stageY;

            switch (GVariate._taskArr[GVariate._taskNum]) {

                case GEnum.TaskType.sideHair:
                    this.Razor.transform.localPositionX -= diffX * 0.01;
                    this.Razor.transform.localPositionY -= diffY * 0.01;
                    break;

                case GEnum.TaskType.leftBeard:
                    this.leftAndRightShaving();

                    break;

                case GEnum.TaskType.rightBeard:
                    this.leftAndRightShaving();

                    break;

                case GEnum.TaskType.middleBeard:
                    this.leftAndRightShaving();

                    break;

                case GEnum.TaskType.topHead:
                    break;

                default:
                    break;
            }

        }
    }

    leftAndRightShaving(): void {
        let hitResult = this.rayDetection() as Laya.HitResult;
        if (hitResult) {
            let p = Tools.twoSubV3_3D(hitResult.point, this.Capsule.transform.position, true);
            let len = Tools.twoObjectsLen_3D(this.knife, this.Capsule);
            let unit: number = 0.1 * (1.05 - len);
            this.knife.transform.position = new Laya.Vector3(hitResult.point.x + p.x * unit, hitResult.point.y + p.y * unit, hitResult.point.z + p.z * unit);
            this.knife.transform.lookAt(this.Capsule.transform.position, new Laya.Vector3(0, 1, 0));
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


    lwgOnUpdate(): void {
    }
}