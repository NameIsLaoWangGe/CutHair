import { lwg, Click, Admin, EventAdmin, Gold, Hint, Game, Animation2D, Effects } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate, GSene3D } from "../Lwg_Template/Global";
import RecordManager from "../TJ/RecordManager";

export default class UIShare extends lwg.Admin.Scene {

    lwgOnEnable(): void {
        this.endPhoto();

        let url = 'UI/Share/Photo/photo_' + Game._gameLevel.value + '.png'
        this.self['SmallPhoto'].skin = url;
    }


    lwgOpenAni(): number {
        this.aniTime = 100;
        this.aniDelayde = 100;

        this.self['SmallFram'].x -= 500;
        this.self['Logo'].y -= 500;
        this.self['BtnShare'].alpha = 0;
        Animation2D.rotate_Scale(this.self['BigFrame'], 45, 0, 0, 600, 1, 1, this.aniTime * 4.5, this.aniDelayde * 1, () => {
            Animation2D.move_Simple_01(this.self['SmallFram'], this.self['SmallFram'].x, this.self['SmallFram'].y, this.self['SmallFram'].x += 500, this.self['SmallFram'].y, this.aniTime * 2, Laya.Ease.cubicOut, this.aniDelayde);

            Animation2D.move_Simple_01(this.self['Logo'], this.self['Logo'].x, this.self['Logo'].y, this.self['Logo'].x, this.self['Logo'].y += 500, this.aniTime * 2, Laya.Ease.cubicOut, this.aniDelayde * 2);

            Animation2D.bombs_Appear(this.self['BtnShare'], 0, 1, 1.2, 0, this.aniTime * 2, this.aniTime * 1, this.aniDelayde * 4);


            let hotAddNum = Math.floor(Math.random() * 100 + 900);
            Laya.timer.frameLoop(1, this, () => {
                if (Number(this.self['HotNum'].text) < hotAddNum) {
                    this.self['HotNum'].text = Number(this.self['HotNum'].text) + 6;
                }
            });

            Laya.timer.once(this.aniDelayde * 7, this, () => { this.self['Icon_hand'].skin = 'UI/Share/tubiao_1-2.png'; })
            // Animation2D.simple_Rotate(this.self['Icon_hand'], -15, 0, this.aniTime * 2, this.aniDelayde * 0);
            Animation2D.rotate_Scale(this.self['Icon_hand'], -10, 2, 2, 0, 1, 1, this.aniTime * 4, this.aniDelayde * 7);

        })

        this.self['BtnNoShare'].alpha = 0;
        Animation2D.fadeOut(this.self['BtnNoShare'], 0, 1, this.aniTime, this.aniDelayde * 20);

        Effects.createExplosion_Rotate(this.self['SceneContent'], 40, this.self['SceneContent'].width / 2, this.self['SceneContent'].height / 2 - 100, Effects.SkinStyle.star, 20, 15);

        return this.aniTime * 5;
    }

    EndCamera: Laya.Sprite3D;
    /**渲染到大照片上*/
    endPhoto(): void {
        this.EndCamera = GSene3D.MainCamera.clone() as Laya.Sprite3D;
        GSene3D.GameMain3D.addChild(this.EndCamera);
        this.EndCamera.transform.position = GSene3D.PhotoCameraMark.transform.position;
        this.EndCamera.transform.localRotationEuler = GSene3D.PhotoCameraMark.transform.localRotationEuler;
        //渲染到纹理的相机
        let renderTargetCamera: Laya.Camera = this.EndCamera.getChildAt(0) as Laya.Camera;
        //选择渲染目标为纹理
        renderTargetCamera.renderTarget = new Laya.RenderTexture(this.self['BigPhoto'].width, this.self['BigPhoto'].height);
        //渲染顺序
        renderTargetCamera.renderingOrder = -1;
        //清除标记
        renderTargetCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        var rtex = new Laya.Texture(((<Laya.Texture2D>(renderTargetCamera.renderTarget as any))), Laya.Texture.DEF_UV);
        var sp1 = new Laya.Sprite();
        this.self['BigPhoto'].addChild(sp1);
        sp1.graphics.drawTexture(rtex);

        // let mt = new Laya.BlinnPhongMaterial();
        // GSene3D.TouchScreen.meshRenderer.material = mt;
        // mt.albedoTexture = renderTargetCamera.renderTarget;

    }


    // /**渲染开始的照片*/
    // CopyLevel: Laya.Sprite3D = new Laya.Sprite3D;
    // StartCamara: Laya.Sprite3D = new Laya.Sprite3D;
    // startPhoto(): void {

    //     this.CopyLevel = GSene3D.LevelTem.clone() as Laya.Sprite3D;
    //     this.CopyLevel.transform.position = new Laya.Vector3(GSene3D.Level.transform.position.x, GSene3D.Level.transform.position.y, GSene3D.Level.transform.position.z + 20);
    //     GSene3D.GameMain3D.addChild(this.CopyLevel);

    //     this.StartCamara = GSene3D.MainCamera.clone() as Laya.Sprite3D;
    //     GSene3D.GameMain3D.addChild(this.StartCamara);
    //     this.StartCamara.transform.position = new Laya.Vector3(GSene3D.PhotoCameraMark.transform.position.x, GSene3D.PhotoCameraMark.transform.position.y, GSene3D.PhotoCameraMark.transform.position.z + 20);
    //     this.StartCamara.transform.localRotationEuler = GSene3D.PhotoCameraMark.transform.localRotationEuler;
    //     //渲染到纹理的相机
    //     let renderTargetCamera: Laya.Camera = this.StartCamara.getChildAt(0) as Laya.Camera;
    //     //选择渲染目标为纹理
    //     renderTargetCamera.renderTarget = new Laya.RenderTexture(this.self['SmallPhoto'].width, this.self['SmallPhoto'].height);
    //     //渲染顺序
    //     renderTargetCamera.renderingOrder = -1;
    //     //清除标记
    //     renderTargetCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
    //     var rtex = new Laya.Texture(((<Laya.Texture2D>(renderTargetCamera.renderTarget as any))), Laya.Texture.DEF_UV);
    //     var sp1 = new Laya.Sprite();
    //     this.self['SmallPhoto'].addChild(sp1);
    //     sp1.graphics.drawTexture(rtex);
    // }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, this.self['SmallFram'], this, null, null, this.btnShareUp, null);
        Click.on(Click.Type.noEffect, this.self['BigFrame'], this, null, null, this.btnShareUp, null);
        Click.on(Click.Type.largen, this.self['BtnShare'], this, null, null, this.btnShareUp, null);

        Click.on(Click.Type.largen, this.self['BtnNoShare'], this, null, null, this.btnNoShareUp, null);

    }

    btnShareUp(): void {
        RecordManager._share('award', () => {
            this.shareFunc()
        })
    }

    btnNoShareUp(): void {
        this.shareFunc()
    }

    shareFunc(): void {
        this.self.close();
        Admin._openScene(Admin.SceneName.UIVictoryBox);
    }

    lwgOnDisable(): void {
        this.EndCamera.removeSelf();
        // this.CopyLevel.removeSelf();
        // this.StartCamara.removeSelf();
    }

}