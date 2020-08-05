import { lwg, Animation2D, PalyAudio, EventAdmin, Admin, Loding, Task, Shop } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GSene3D } from "../Lwg_Template/Global";
export default class UILoding extends Loding.LodeScene {

    lodingOnAwake(): void {
        Loding.lodingList_2D = [
            "res/atlas/Frame/Effects.png",
            "res/atlas/Frame/UI.png",
            "res/atlas/UI/GameStart.png",
            "res/atlas/UI/Common.png",
            "res/atlas/UI/Shop/Skin.png",
            "res/atlas/UI/Shop/Props.png",
            "res/atlas/UI/Shop/Other.png",
        ];
        Loding.lodingList_3D = [
            "3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls"
        ];
        Loding.lodingList_Data = [
            "GameData/Shop/Other.json",
            "GameData/Shop/Props.json",
            "GameData/Shop/Skin.json",
            'GameData/Task/everydayTask.json',
            "GameData/VictoryBox/VictoryBox.json"
        ];
    }

    lodingPhaseComplete(): void {
        // console.log(Loding.currentProgress.value);
    }

    lodingComplete(): void {
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

    lodingTaskEventReg(): void {
        EventAdmin.reg(Task.EventType.useSkins, Task, () => {
            let num = Shop.setUseSkinType();
            let name = Task.TaskName.每日使用5种皮肤;
            let num1 = Task.getTaskProperty(Task.TaskClass.everyday, name, Task.TaskProperty.resCondition);
            if (num > num1) {
                Task.doDetectionTask(Task.TaskClass.everyday, name, num - num1);
            }
        });
        EventAdmin.reg(Task.EventType.victory, Task, () => {
            let name = Task.TaskName.每日服务10位客人;
            Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
        })
        EventAdmin.reg(Task.EventType.adsTime, Task, () => {
            let name = Task.TaskName.每日观看两个广告;
            Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
        })
        EventAdmin.reg(Task.EventType.victoryBox, Task, () => {
            let name = Task.TaskName.每日开启10个宝箱;
            Task.doDetectionTask(Task.TaskClass.everyday, name, 1);
        })
    }

    lwgAdaptive(): void {
        this.self['Bg'].height = Laya.stage.height;
        this.self['Logo'].y = Laya.stage.height * 0.174;
        this.self['Progress'].y = Laya.stage.height * 0.763;
        this.self['FCM'].y = Laya.stage.height * 0.910;
        this.self['FCM'].y = Laya.stage.height * 0.910;
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

    lwgOnDisable(): void {
        if (PalyAudio._voiceSwitch) {
            lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 1000);
        }
    }
}

