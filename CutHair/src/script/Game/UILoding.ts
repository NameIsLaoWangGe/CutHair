import { lwg, Animation, PalyAudio, EventAdmin, Admin } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
export default class UILoding extends lwg.Admin.Scene {
    constructor() { super(); }

    /**需要加载的图片资源列表,一般是界面的图片*/
    lodingList_2D: Array<any> = [];
    /**3D场景的加载*/
    lodingList_3D: Array<any> = [];
    /**数据表的加载*/
    lodingList_Data: Array<any> = [];

    /**事件类型*/
    LodingType = {
        Loding3D: 'Loding3D',
        Loding2D: 'Loding2D',
        LodingData: 'LodingData',
        complete: 'complete',
    }

    lwgOnAwake() {
        this.lodingList_2D = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
            "res/atlas/UI/GameStart.png",
            "res/atlas/UI/Common.png",
        ];
        this.lodingList_3D = [
            "3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls"
        ];
        this.lodingList_Data = [
        ];
    }

    adaptive(): void {
        this.self['Bg'].height = Laya.stage.height;
        this.self['Logo'].y = Laya.stage.height * 0.174;
        this.self['Progress'].y = Laya.stage.height * 0.763;
        this.self['FCM'].y = Laya.stage.height * 0.910;
        this.self['FCM'].y = Laya.stage.height * 0.910;
    }

    lwgOnEnable(): void {
        EventAdmin.notify(this.LodingType.Loding3D);
    }

    lwgEventReg(): void {
        EventAdmin.reg(this.LodingType.Loding3D, this, () => { this.lodeScene3D() });
        EventAdmin.reg(this.LodingType.Loding2D, this, () => { this.loding2D() });
        EventAdmin.reg(this.LodingType.LodingData, this, () => { this.lodingData() });
        EventAdmin.reg(this.LodingType.complete, this, () => { this.completeLode() });
    }

    /**加载3D场景*/
    lodeScene3D(): void {
        if (this.lodingList_3D.length === 0) {
            console.log('没有3D场景');
            EventAdmin.notify(this.LodingType.Loding2D);
            return;
        }
        Laya.Scene3D.load(this.lodingList_3D[0], Laya.Handler.create(this, (scene: Laya.Scene3D) => {
            Laya.stage.addChildAt(scene, 0);
            scene[Admin.SceneName.GameMain3D] = scene.addComponent(GameMain3D);
            lwg.Admin._sceneControl[Admin.SceneName.GameMain3D] = scene;

            console.log('3D场景加载完成！');
            EventAdmin.notify(this.LodingType.Loding2D);
        }));
    }

    /**加载2D图片列表*/
    loding2D(): void {
        if (this.lodingList_2D.length === 0) {
            console.log('没有需要加载的2D资源！');
            EventAdmin.notify(this.LodingType.LodingData);
            return;
        }
        // 加载多张png类型资源
        Laya.loader.load(
            this.lodingList_2D,
            Laya.Handler.create(this, f => {

                console.log('2D资源加载完成！');
                EventAdmin.notify(this.LodingType.LodingData);
            }));
    }

    /**加载数据表*/
    lodingData(): void {
        if (this.lodingList_Data.length === 0) {
            console.log('没有数据表需要加载！');
            EventAdmin.notify(this.LodingType.complete);
            return;
        }
        /**优先加载数据表*/
        Laya.loader.load(this.lodingList_Data, Laya.Handler.create(this, () => {
            console.log('数据表加载完成！通过 Laya.loader.getRes("Data/levelsData.json")["RECORDS"]获取');
            EventAdmin.notify(this.LodingType.complete);
        }), null, Laya.Loader.JSON);
    }

    /**加载完成回调,每个游戏不一样*/
    completeLode(): void {
        this.self['Mask'].x = 0;
        this.self['Shear'].x = this.self['Mask'].width;
        this.self['Per'].text = 100 + '%';
        Laya.timer.once(500, this, () => {
            lwg.Admin._openScene(lwg.Admin.SceneName.UIStart);
            this.self.close();
        })
    }

    /**进度条动画开关*/
    maskMoveSwitch: boolean = true;
    /**剪刀修剪速度*/
    shearSpeed: number = 10;
    /**剪刀修剪开关*/
    shearSwitch: boolean = true;
    lwgOnUpdate(): void {
        // 模拟加载进度
        if (this.maskMoveSwitch) {
            if (this.self['Mask'].x < -  this.self['Mask'].width * 1 / 5) {
                this.self['Mask'].x += this.self['Mask'].width / 25;
                this.self['Shear'].x += this.self['Mask'].width / 25;
                // 百分比数字
                let str: string = ((- this.self['Mask'].width - this.self['Mask'].x) / - this.self['Mask'].width * 100).toString().substring(0, 2);
                this.self['Per'].text = str + '%';
            }
        }

        // 剪刀动画
        if (this.self['Shear_02'].rotation > 15) {
            this.self['Shear_02']['dir'] = 'up';
        } else if (this.self['Shear_02'].rotation <= 0) {
            this.self['Shear_02']['dir'] = 'down';
        }
        if (this.self['Shear_02']['dir'] === 'up') {
            this.self['Shear_02'].rotation -= this.shearSpeed;
            this.self['Shear_01'].rotation += this.shearSpeed;
        } else if (this.self['Shear_02']['dir'] === 'down') {
            this.self['Shear_02'].rotation += this.shearSpeed;
            this.self['Shear_01'].rotation -= this.shearSpeed;
        }
    }

    lwgDisable(): void {
        if (PalyAudio._voiceSwitch) {
            lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 1000);
        }
    }
}

