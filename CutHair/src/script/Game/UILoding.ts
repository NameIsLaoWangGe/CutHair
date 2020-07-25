import { lwg } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
export default class UILoding extends lwg.Admin.Scene {
    constructor() { super(); }

    lwgOnEnable(): void {
        this.lodeMianScene3D();
    }

    /**加载游戏内的3D场景，两个场景同时出现*/
    lodeMianScene3D(): void {
        Laya.Scene3D.load("3DScene/LayaScene_SampleScene/Conventional/SampleScene.ls", Laya.Handler.create(this, this.mianSceneComplete));
    }

    private mianSceneOk: boolean = false;
    /**回调函数*/
    mianSceneComplete(scene: Laya.Scene3D): void {
        // 将场景加到舞台上，注意层级
        Laya.stage.addChildAt(scene, 0);
        // 打开开始游戏界面并关闭自己
        this.mianSceneOk = true;
        scene.addComponent(GameMain3D);
        lwg.Admin._sceneControl[lwg.Admin.SceneName.GameMain3D] = scene;
        scene[lwg.Admin.SceneName.GameMain3D] = scene.getComponent(GameMain3D);
        lwg.Admin._openScene(lwg.Admin.SceneName.UIOperation, null, null, null);
    }

    lwgDisable(): void {

    }
}