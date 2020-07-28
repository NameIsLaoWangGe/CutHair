import { lwg, Animation, PalyAudio } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
export default class UILoding extends lwg.Admin.Scene {
    constructor() { super(); }

    /**需要加载的资源列表*/
    LodingList: Array<any> = [];
    /**进度条遮罩*/
    Mask: Laya.Sprite;
    /**进度条动画开关*/
    maskMoveSwitch: boolean = false;
    /**剪刀修剪速度*/
    shearSpeed: number = 10;
    /**剪刀修剪开关*/
    shearSwitch: boolean = false;
    lwgOnAwake() {
        this.LodingList = [];
    }

    selfNode(): void {
        this.Mask = this.self['Mask'];
    }

    lwgOnEnable(): void {
        this.lodeMianScene3D();
        this.shearSpeed = 10;
        this.shearSwitch = true;
        this.maskMoveSwitch = true;
    }

    adaptive(): void {
        this.self['Background'].height = Laya.stage.height;
    }

    /**加载游戏内的3D场景，两个场景同时出现*/
    lodeMianScene3D(): void {
        Laya.Scene3D.load("3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls", Laya.Handler.create(this, this.mianSceneComplete));
    }

    /**回调函数*/
    mianSceneComplete(scene: Laya.Scene3D): void {
        // 将场景加到舞台上，注意层级
        Laya.stage.addChildAt(scene, 0);
        scene[lwg.Admin.SceneName.GameMain3D] = scene.addComponent(GameMain3D);
        lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D] = scene;
        this.Mask.x = 0;
        this.shearSpeed = 3;
        this.self['Shear'].x = this.Mask.width;
        this.self['Per'].text = 100 + '%';
        Laya.timer.once(500, this, () => {
            lwg.Admin._openScene(lwg.Admin.SceneName.UIStart);
            this.self.close()
        });
    }


    lwgOnUpdate(): void {
        // 模拟加载进度
        if (this.maskMoveSwitch) {
            if (this.Mask.x < - this.Mask.width * 1 / 5) {
                this.Mask.x += this.Mask.width / 25;
                this.self['Shear'].x += this.Mask.width / 25;
                // 百分比数字
                let str: string = ((-this.Mask.width - this.Mask.x) / -this.Mask.width * 100).toString().substring(0, 2);
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

