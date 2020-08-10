import { lwg, EventAdmin, Admin, Animation3D, Shop, Skin } from "../Lwg_Template/lwg";
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
        GSene3D.PhotoCameraMark = this.self.getChildByName('PhotoCameraMark') as Laya.MeshSprite3D;
        GSene3D.LevelTem = this.self.getChildByName('Level1') as Laya.MeshSprite3D;
        GSene3D.LevelFpos.x = GSene3D.LevelTem.transform.position.x;
        GSene3D.LevelFpos.y = GSene3D.LevelTem.transform.position.y;
        GSene3D.LevelFpos.z = GSene3D.LevelTem.transform.position.z;
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
        GSene3D.Floor = this.self.getChildByName('Floor') as Laya.MeshSprite3D;
        GSene3D.Razor = this.self.getChildByName('Razor') as Laya.MeshSprite3D;
        GSene3D.razorFPos.x = GSene3D.Razor.transform.position.x;
        GSene3D.razorFPos.y = GSene3D.Razor.transform.position.y;
        GSene3D.razorFPos.z = GSene3D.Razor.transform.position.z;

        GSene3D.knifeParent = this.self.getChildByName('knifeParent') as Laya.MeshSprite3D;
        GSene3D.knife = GSene3D.knifeParent.getChildByName('tixudao') as Laya.MeshSprite3D;

        GSene3D.Role = this.self.getChildByName('Role') as Laya.MeshSprite3D;

        GSene3D.TouchScreen = this.self.getChildByName('TouchScreen') as Laya.MeshSprite3D;

        GSene3D.Headcollision = GSene3D.Role.getChildByName('Headcollision') as Laya.MeshSprite3D;
        let TouchHeadRig = GSene3D.Headcollision.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        TouchHeadRig.restitution = 0;

        GSene3D.HeadSimulate = GSene3D.Role.getChildByName('HeadSimulate') as Laya.MeshSprite3D;

        GSene3D.HingeMiddle = GSene3D.Headcollision.getChildByName('HingeMiddle') as Laya.MeshSprite3D;
        GSene3D.HingeUp = GSene3D.Headcollision.getChildByName('HingeUp') as Laya.MeshSprite3D;
        GSene3D.HingeDown = GSene3D.Headcollision.getChildByName('HingeDown') as Laya.MeshSprite3D;


        GSene3D.HeadDecoration = this.self.getChildByName('HeadDecoration') as Laya.MeshSprite3D;
        GSene3D.EyeDecoration = this.self.getChildByName('EyeDecoration') as Laya.MeshSprite3D;

        GSene3D.DressUpMark = this.self.getChildByName('DressUpMark') as Laya.MeshSprite3D;

        this.createLevel();
    }

    /**产生关卡*/
    createLevel(): void {
        GSene3D.Level = GSene3D.LevelTem.clone() as Laya.MeshSprite3D;
        this.self.addChild(GSene3D.Level)
        GSene3D.LevelTem.removeSelf();
    }

    lwgNodeDec(): void {
        GSene3D.HairParent = GSene3D.Level.getChildByName('HairParent') as Laya.MeshSprite3D;
        GSene3D.LeftBeard = GSene3D.Level.getChildByName('LeftBeard') as Laya.MeshSprite3D;
        GSene3D.RightBeard = GSene3D.Level.getChildByName('RightBeard') as Laya.MeshSprite3D;
        GSene3D.MiddleBeard = GSene3D.Level.getChildByName('MiddleBeard') as Laya.MeshSprite3D;
        GSene3D.UpRightBeard = GSene3D.Level.getChildByName('UpRightBeard') as Laya.MeshSprite3D;
        GSene3D.UpLeftBeard = GSene3D.Level.getChildByName('UpLeftBeard') as Laya.MeshSprite3D;
    }

    lwgEventReg(): void {
        // 重来
        EventAdmin.reg(EventAdmin.EventType.scene3DRefresh, this, () => {
            this.refreshScene();
        })
        //摄像机的移动,参数为方向
        EventAdmin.reg(GEnum.EventType.cameraMove, this, (direction: string) => {
            this.cameraMove(direction);
        })
        //重来
        EventAdmin.reg(EventAdmin.EventType.scene3DResurgence, this, (direction: string) => {
            GSene3D.Razor.transform.position = new Laya.Vector3(GSene3D.razorFPos.x, GSene3D.razorFPos.y, GSene3D.razorFPos.z);
        })

        // 换眼部装饰
        EventAdmin.reg(GEnum.EventType.changeEyeDecoration, this, () => {
            console.log('换眼部装饰');
            for (let index = 0; index < GSene3D.EyeDecoration.numChildren; index++) {
                const element = GSene3D.EyeDecoration.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Skin._currentEye.name) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        });

        // 更换剃刀
        EventAdmin.reg(GEnum.EventType.changeProp, this, () => {
            console.log('换理发刀');
            let name;
            for (let index = 0; index < GSene3D.Razor.numChildren; index++) {
                const element = GSene3D.Razor.getChildAt(index);
                if (element.name !== 'Blade') {
                    if (element.name !== Shop._currentProp.name) {
                        element.active = false;
                    } else {
                        name = element.name;
                        element.active = true;
                    }
                }
            }
            if (!name) {
                GSene3D.Razor.getChildByName('jiandao').active = true;
            }
        });

        //换剃须刀
        EventAdmin.reg(GEnum.EventType.changeOther, this, () => {
            console.log('换剃须刀');
            for (let index = 0; index < GSene3D.knifeParent.numChildren; index++) {
                const element = GSene3D.knifeParent.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Shop._currentOther.name) {
                    element.active = true;
                    GSene3D.knife = element;
                    let script = GSene3D.knife.getComponent(GameMain3D_knife);
                    if (!script) {
                        GSene3D.knife.addComponent(GameMain3D_knife);
                    }
                } else {
                    element.active = false;
                }
            }
        });

        // 换头饰
        EventAdmin.reg(GEnum.EventType.changeHeadDecoration, this, () => {
            console.log('换头部装饰');
            for (let index = 0; index < GSene3D.HeadDecoration.numChildren; index++) {
                const element = GSene3D.HeadDecoration.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Skin._currentHead.name) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        });

        // 换眼部装饰
        EventAdmin.reg(GEnum.EventType.changeEyeDecoration, this, () => {
            console.log('换眼部装饰');
            for (let index = 0; index < GSene3D.EyeDecoration.numChildren; index++) {
                const element = GSene3D.EyeDecoration.getChildAt(index) as Laya.MeshSprite3D;
                if (element.name == Skin._currentEye.name) {
                    element.active = true;
                } else {
                    element.active = false;
                }
            }
        });

        // 皮肤试用
        EventAdmin.reg(GEnum.EventType.changeTrySkin, this, (skinClass, skinName) => {
            console.log(skinClass, skinName);
            let arr;
            if (skinClass == Shop.GoodsClass.Other) {
                arr = GSene3D.knifeParent;
            } else if (skinClass == Shop.GoodsClass.Props) {
                arr = GSene3D.Razor;
            }
            for (let index = 0; index < arr.numChildren; index++) {
                const element = arr.getChildAt(index);
                if (element.name == skinName) {
                    element.active = true;
                } else {
                    if (element.name !== 'Blade') {
                        element.active = false;
                    }
                }
            }
        });
    };

    lwgOnEnable(): void {
        GSene3D.Floor.addComponent(GameMain3D_Floor);
        GSene3D.Razor.addComponent(GameMain3D_Razor);
        EventAdmin.notify(GEnum.EventType.changeProp);
        EventAdmin.notify(GEnum.EventType.changeOther);

    }

    refreshScene(): void {
        GSene3D.Level.removeSelf();
        this.createLevel();
        this.lwgNodeDec();
        GSene3D.Razor.transform.position = new Laya.Vector3(GSene3D.razorFPos.x, GSene3D.razorFPos.y, GSene3D.razorFPos.z);
    }

    /**摄像机移动速度*/
    moveSpeed: number = 1000;
    /**摄像机的移动规则*/
    cameraMove(direction): void {
        switch (direction) {
            case GEnum.TaskType.sideHair:

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Side.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Side.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Side.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.rightBeard:

                GSene3D.knife.transform.position = GSene3D.RightSignknife.transform.position;
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0))

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Right.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.leftBeard:

                GSene3D.knife.transform.position = GSene3D.LeftSignknife.transform.position
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z);
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0))

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Left.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.middleBeard:

                GSene3D.knife.transform.position = GSene3D.MiddleSignknife.transform.position
                GSene3D.HingeMiddle.transform.position = new Laya.Vector3(GSene3D.HingeMiddle.transform.position.x, GSene3D.knife.transform.position.y, GSene3D.HingeMiddle.transform.position.z)
                GSene3D.knife.transform.lookAt(GSene3D.HingeMiddle.transform.position, new Laya.Vector3(0, 1, 0))

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_Middle.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_Middle.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_Middle.transform.localRotationEuler, this.moveSpeed, this);

                break;
            case GEnum.TaskType.upLeftBeard:

                GSene3D.knife.transform.position = GSene3D.UpLeftKnife.transform.position
                GSene3D.knife.transform.lookAt(GSene3D.HingeUp.transform.position, new Laya.Vector3(0, 1, 0))
                let Model2 = GSene3D.knife.getChildAt(0) as Laya.MeshSprite3D
                Model2.transform.localRotationEulerX = -180

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_UpLeft.transform.position, this.moveSpeed, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_UpLeft.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_UpLeft.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.upRightBeard:
                GSene3D.knife.transform.position = GSene3D.UpRightKnife.transform.position
                GSene3D.knife.transform.lookAt(GSene3D.HingeUp.transform.position, new Laya.Vector3(0, 1, 0))
                let Model1 = GSene3D.knife.getChildAt(0) as Laya.MeshSprite3D
                Model1.transform.localRotationEulerX = -180

                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.Landmark_UpRight.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.Landmark_UpRight.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.Landmark_UpRight.transform.localRotationEuler, this.moveSpeed, this);

                break;

            case GEnum.TaskType.movePhotoLocation:
                Animation3D.MoveTo(GSene3D.MainCamera, GSene3D.DressUpMark.transform.position, this.moveSpeed, this, null, () => {
                    Admin._gameStart = true;
                });
                Animation3D.RotateTo(GSene3D.MainCamera, GSene3D.DressUpMark.transform.localRotationEuler, this.moveSpeed, this);
                Animation3D.RotateTo(GSene3D.TouchScreen, GSene3D.DressUpMark.transform.localRotationEuler, this.moveSpeed, this);

                break;

            default:
                break;
        }
    }

}