import { lwg, Click, Animation, Animation3D, Tools, EventAdmin, Admin } from "../Lwg_Template/lwg";
import { GVariate, GEnum, GSene3D } from "../Lwg_Template/Global";

export default class UIOperation extends lwg.Admin.Scene {
    /** @prop {name:TaskProgress, tips:"每个任务的进度条", type:Prefab}*/
    public TaskProgress: Laya.Prefab;
    /**摇杆*/
    Rocker: Laya.Sprite;
    /**角色对话框*/
    Dialogue: Laya.Sprite;
    /**任务进度条父节点*/
    TaskBar: Laya.Sprite;
    /**下一个任务按钮*/
    BtnLast: Laya.Sprite;
    /**任务所需修剪的毛发数量对象顺序*/
    _numZoder: Array<any> = [];
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
                console.log('剩余左侧胡须', this.value);
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
                console.log('剩余剩余右侧胡须', this.value);
                if (this.value <= 3) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**中间胡子的数量*/
    _middleBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余中间胡子', this.value);
                if (this.value <= 3) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**右上角毛发*/
    _upRightBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余右上角', this.value);
                if (this.value <= 3) {
                    console.log('任务完成了！');
                    this.switch = false;
                    EventAdmin.notify(EventAdmin.EventType.taskReach);
                }
            }
            EventAdmin.notify(GEnum.EventType.taskProgress);
        }
    }

    /**左上角毛发*/
    _upLeftBeardNum = {
        index: 0,
        sum: 0,
        switch: true,
        value: 0,
        set setValue(vals) {
            this.value = vals;
            if (this.switch) {
                console.log('剩余左上角', this.value);
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
        this.TaskBar = this.self['TaskBar'];
        this.BtnLast = this.self['BtnLast'];
        this.Dialogue = this.self['Dialogue'];
    }

    lwgOnEnable(): void {
        GVariate._taskNum = 0;
        lwg.Admin._gameStart = true;
        GVariate._taskArr = [GEnum.TaskType.sideHair, GEnum.TaskType.rightBeard, GEnum.TaskType.middleBeard, GEnum.TaskType.leftBeard, GEnum.TaskType.upRightBeard, GEnum.TaskType.upLeftBeard];
        this.createProgress();
        this.BtnLast.visible = false;
        this.createTaskContent();
        this.mainCameraMove();
        this.dialogueSet();
    }

    lwgEventReg(): void {
        // 胜利
        EventAdmin.reg(EventAdmin.EventType.taskReach, this, () => {
            if (GVariate._taskNum >= GVariate._taskArr.length - 1) {

                Laya.timer.frameOnce(60, this, () => {
                    Admin._openScene(Admin.SceneName.UIVictory, null, null, () => { });
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

        // 右上角胡子修剪
        EventAdmin.reg(GEnum.EventType.upRightBeard, this, () => {
            this._upRightBeardNum.setValue = this._upRightBeardNum.value - 0.5;
        })

        // 左上角胡子修剪
        EventAdmin.reg(GEnum.EventType.upLeftBeard, this, () => {
            this._upLeftBeardNum.setValue = this._upLeftBeardNum.value - 0.5;
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
                case GEnum.TaskType.upRightBeard:
                    value = this._upRightBeardNum.value;
                    sum = this._upRightBeardNum.sum;

                    break;
                case GEnum.TaskType.upLeftBeard:
                    value = this._upLeftBeardNum.value;
                    sum = this._upLeftBeardNum.sum;

                    break;
                default:
                    break;
            }
            Bar.mask.x = (sum - value) * Bar.width / sum - Bar.mask.width;
            // 不超过最大值
            if (Bar.mask.x > 0) {
                Bar.mask.x = 0;
            }
        })
    }

    dialogueSet(): void {
        this.Dialogue.visible = false;
        Laya.timer.once(3000, this, () => {
            this.Dialogue.visible = true;
            Laya.timer.once(2000, this, () => {
                let Dec = this.Dialogue.getChildByName('Dec') as Laya.Label;
                Dec.text = ' 理发剃须看广告!';

                Laya.timer.once(2000, this, () => {
                    this.Dialogue.visible = false;
                })
            })
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
                    this._sideHairNum.setValue = GSene3D.HairParent.numChildren;
                    this._sideHairNum.sum = GSene3D.HairParent.numChildren;
                    this._sideHairNum.index = index;
                    this.monitorHiarLen();
                    this._numZoder.push(this._sideHairNum);

                    break;
                case GEnum.TaskType.leftBeard:
                    this._leftBeardNum.setValue = GSene3D.LeftBeard.numChildren;
                    this._leftBeardNum.sum = GSene3D.LeftBeard.numChildren;
                    this._leftBeardNum.index = index;
                    this._numZoder.push(this._leftBeardNum);

                    break;
                case GEnum.TaskType.rightBeard:
                    this._rightBeardNum.setValue = GSene3D.RightBeard.numChildren;
                    this._rightBeardNum.sum = GSene3D.RightBeard.numChildren;
                    this._rightBeardNum.index = index;
                    this._numZoder.push(this._rightBeardNum);

                    break;
                case GEnum.TaskType.middleBeard:
                    this._middleBeardNum.setValue = GSene3D.RightBeard.numChildren;
                    this._middleBeardNum.sum = GSene3D.RightBeard.numChildren;
                    this._middleBeardNum.index = index;
                    this._numZoder.push(this._middleBeardNum);

                    break;

                case GEnum.TaskType.upRightBeard:
                    this._upRightBeardNum.setValue = GSene3D.UpRightBeard.numChildren;
                    this._upRightBeardNum.sum = GSene3D.UpRightBeard.numChildren;
                    this._upRightBeardNum.index = index;
                    this._numZoder.push(this._upRightBeardNum);

                    break;

                case GEnum.TaskType.upLeftBeard:
                    this._upLeftBeardNum.setValue = GSene3D.UpLeftBeard.numChildren;
                    this._upLeftBeardNum.sum = GSene3D.UpLeftBeard.numChildren;
                    this._upLeftBeardNum.index = index;
                    this._numZoder.push(this._upLeftBeardNum);

                    break;
                default:
                    break;
            }
        }
        console.log(this._numZoder);
    }

    /**监听每根头发的长度*/
    monitorHiarLen(): void {
        let _sideHairNum = this._sideHairNum;
        for (let index = 0; index < GSene3D.HairParent.numChildren; index++) {
            const element = GSene3D.HairParent.getChildAt(index) as Laya.MeshSprite3D;
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
    moveSpeed = 1000;
    /**
     * 摄像机的移动规则
     * */
    mainCameraMove(): void {
        if (GVariate._taskNum > GVariate._taskArr.length) {
            return;
        }
        switch (GVariate._taskArr[GVariate._taskNum]) {

            case GEnum.TaskType.sideHair:

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Side.transform.position, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Side.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Side.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.rightBeard:

                GSene3D.knife.transform.position = GSene3D.RightSignknife.transform.position
                GSene3D.knife.transform.localRotationEuler = GSene3D.RightSignknife.transform.localRotationEuler

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.position, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.leftBeard:

                GSene3D.knife.transform.position = GSene3D.LeftSignknife.transform.position
                GSene3D.knife.transform.localRotationEuler = GSene3D.LeftSignknife.transform.localRotationEuler

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.position, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.middleBeard:

                GSene3D.knife.transform.position = GSene3D.MiddleSignknife.transform.position
                GSene3D.knife.transform.localRotationEuler = GSene3D.MiddleSignknife.transform.localRotationEuler

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Middle.transform.position, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Middle.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Middle.transform.localRotationEuler, this.moveSpeed, this);

                break;
            case GEnum.TaskType.upLeftBeard:

                GSene3D.knife.transform.position = GSene3D.UpLeftKnife.transform.position
                GSene3D.knife.transform.localRotationEuler = GSene3D.UpLeftKnife.transform.localRotationEuler

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_UpLeft.transform.position, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_UpLeft.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_UpLeft.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.upRightBeard:

                GSene3D.knife.transform.position = GSene3D.UpRightKnife.transform.position
                GSene3D.knife.transform.localRotationEuler = GSene3D.UpRightKnife.transform.localRotationEuler

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_UpRight.transform.position, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_UpRight.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_UpRight.transform.localRotationEuler, this.moveSpeed, this);

                break;

            default:
                break;
        }
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
        if (this._numZoder[GVariate._taskNum].value <= 3) {
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
        this.lastPosX = null;
        this.lastPosY = null;
        this.lastPosZ = null;

        if (GVariate._taskArr[GVariate._taskNum] === GEnum.TaskType.sideHair) {
            return;
        }
        let Camera = GSene3D.MainCamera.getChildByName('MainCamera') as Laya.Camera;
        // 求出刀片投到屏幕上的位置
        let pointknife = Tools.transitionScreenPointfor3D(GSene3D.knife.transform.position, Camera);
        // 求出头部投到屏幕上的位置
        let pointHead = Tools.transitionScreenPointfor3D(GSene3D.Headcollision.transform.position, Camera);
        // 计算出他们在屏幕上的差值
        let diffX = pointknife.x - pointHead.x;
        let diffY = pointknife.y - pointHead.y;

        // 通过触摸点设置一个和上面差值一样的偏差点
        let touchDiffX = this.touchPosX - diffX;
        let touchDiffY = this.touchPosY - diffY;

        // 偏差点发射射线到投屏，把偏差点设置成模拟的头部HeadSimulate的坐标
        // 这样我们在模拟的头部上面操作，此时手指的位置是模拟刀片的相对位置
        let hitResult_Diff = Tools.rayScanning(Camera, GSene3D.GameMain3D, new Laya.Vector2(touchDiffX, touchDiffY), GSene3D.TouchScreen.name) as Laya.HitResult;
        if (hitResult_Diff) {
            GSene3D.HeadSimulate.transform.position = hitResult_Diff.point;
        }

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
                    GSene3D.Razor.transform.localPositionX -= diffX * 0.01;
                    GSene3D.Razor.transform.localPositionY -= diffY * 0.01;
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
                case GEnum.TaskType.upRightBeard:
                    this.leftAndRightShaving();

                    break;

                case GEnum.TaskType.upLeftBeard:
                    this.leftAndRightShaving();
                    break;
                default:
                    break;
            }
        }
    }

    /**上一帧触摸点发射线到的位置对比两次的差值，，用于刀片的移动*/
    lastPosX: number;
    lastPosY: number;
    lastPosZ: number;

    /**左右刮刀的移动规则*/
    leftAndRightShaving(): void {
        let hitResult = Tools.rayScanning(GSene3D.MainCamera.getChildByName('MainCamera') as Laya.Camera, GSene3D.GameMain3D, new Laya.Vector2(this.touchPosX, this.touchPosY), GSene3D.HeadSimulate.name) as Laya.HitResult;
        if (hitResult) {
            if (this.lastPosX === null || this.lastPosY === null || this.lastPosZ === null) {
                this.lastPosX = hitResult.point.x;
                this.lastPosY = hitResult.point.y;
                this.lastPosZ = hitResult.point.z;
            } else {
                // 求出两次触摸的位置偏移
                let diffX = hitResult.point.x - this.lastPosX;
                let diffY = hitResult.point.y - this.lastPosY;
                let diffZ = hitResult.point.z - this.lastPosZ;

                // 剃刀加上这些位置偏移
                let v3 = new Laya.Vector3(GSene3D.knife.transform.position.x + diffX, GSene3D.knife.transform.position.y + diffY, GSene3D.knife.transform.position.z + diffZ)
                // 设置最大范围值
                let p = Tools.twoSubV3_3D(v3, GSene3D.Headcollision.transform.position, true);
                let len = Tools.twoObjectsLen_3D(GSene3D.knife, GSene3D.Headcollision);
                let unit: number = 0.1 * (1.05 - len);
                GSene3D.knife.transform.position = new Laya.Vector3(v3.x + p.x * unit, v3.y + p.y * unit, v3.z + p.z * unit);
                GSene3D.knife.transform.lookAt(GSene3D.Headcollision.transform.position, new Laya.Vector3(0, 1, 0));


                this.lastPosX = hitResult.point.x;
                this.lastPosY = hitResult.point.y;
                this.lastPosZ = hitResult.point.z;

            }
        } else {
            console.log('出屏了！');
            this.lastPosX = null;
            this.lastPosY = null;
            this.lastPosY = null;
        }
    }

    onStageMouseUp(e: Laya.Event) {
        this.lastPosX = null;
        this.lastPosY = null;
        this.lastPosY = null;
        this.touchPosX = null;
        this.touchPosY = null;
        this.moveSwitch = false;
    }
}