import { lwg, Animation2D, PalyAudio, EventAdmin, Admin, Loding } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GSene3D } from "../Lwg_Template/Global";
export default class UILoding extends Loding.Lode {
    constructor() { super(); }
    lwgOnAwake() {
        Loding.lodingList_2D = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
            "res/atlas/UI/GameStart.png",
            "res/atlas/UI/Common.png",
        ];
        Loding.lodingList_3D = [
            "3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls"
        ];
        Loding.lodingList_Data = [
        ];
    }

    lwgOnEnable(): void {
        EventAdmin.notify(Loding.LodingType.Loding3D);
    }

    lwgAdaptive(): void {
        this.self['Bg'].height = Laya.stage.height;
        this.self['Logo'].y = Laya.stage.height * 0.174;
        this.self['Progress'].y = Laya.stage.height * 0.763;
        this.self['FCM'].y = Laya.stage.height * 0.910;
        this.self['FCM'].y = Laya.stage.height * 0.910;
    }

    lwgLodeComplete(): void {
        this.self['Mask'].x = 0;
        this.self['Shear'].x = this.self['Mask'].width;
        this.self['Per'].text = 100 + '%';

        this.maskMoveSwitch = false;
        // 获取场景
        let Scene3D = Laya.loader.getRes("3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls") as Laya.Scene3D;
        Laya.stage.addChildAt(Scene3D, 0);
        Admin._sceneControl[Admin.SceneName.GameMain3D] = Scene3D;
        Scene3D.addComponent(GameMain3D);

        Laya.timer.once(500, this, () => {
            lwg.Admin._openScene(lwg.Admin.SceneName.UIStart);
            this.self.close();
        })
    }

    /**进度条动画开关*/
    maskMoveSwitch: boolean = true;
    /**剪刀修剪速度*/
    shearSpeed: number = 5;
    /**剪刀修剪开关*/
    shearSwitch: boolean = true;

    lwgOnUpdate(): void {
        // 模拟加载进度,非真实进度，最后为1时为真实进度
        if (this.maskMoveSwitch) {
            if (this.self['Mask'].x < -20) {
                this.self['Mask'].x += 10;
                this.self['Shear'].x += 10;
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

