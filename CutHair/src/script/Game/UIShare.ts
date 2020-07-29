import { lwg, Click, Admin, EventAdmin, Gold, Hint, Game } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate, GSene3D } from "../Lwg_Template/Global";
import RecordManager from "../TJ/RecordManager";

export default class UIShare extends lwg.Admin.Scene {



    lwgOnEnable(): void {
        this.renderPhoto();
    }
    /**渲染到照片上*/
    renderPhoto(): void {
        let PhotoCamera = GSene3D.MainCamera.clone() as Laya.Sprite3D;
        GSene3D.GameMain3D.addChild(PhotoCamera);
        PhotoCamera.transform.position = GSene3D.Landmark_Middle.transform.position;
        PhotoCamera.transform.localRotationEuler = GSene3D.Landmark_Middle.transform.localRotationEuler;
        //渲染到纹理的相机
        let renderTargetCamera: Laya.Camera = PhotoCamera.getChildAt(0) as Laya.Camera;
        //选择渲染目标为纹理
        renderTargetCamera.renderTarget = new Laya.RenderTexture(472, 422);
        //渲染顺序
        renderTargetCamera.renderingOrder = -1;
        //清除标记
        renderTargetCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        var rtex = new Laya.Texture(((<Laya.Texture2D>(renderTargetCamera.renderTarget as any))), Laya.Texture.DEF_UV);
        var sp1 = new Laya.Sprite();
        this.self['BigPhoto'].addChild(sp1);
        sp1.graphics.drawTexture(rtex);

    }



    btnOnClick(): void {
        Click.on(Click.Type.largen, null, this.self['BtnShare'], this, null, null, this.btnShareUp, null);
        Click.on(Click.Type.largen, null, this.self['BtnNoShare'], this, null, null, this.btnNoShareUp, null);
    }

    btnShareUp(): void {
        // RecordManager._share('award', () => {
        this.shareFunc()
        // })
    }

    btnNoShareUp(): void {
        this.shareFunc()
    }

    shareFunc(): void {
        this.self.close();
        Admin._openScene(Admin.SceneName.UIVictory);
    }

}