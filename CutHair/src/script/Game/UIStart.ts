import { lwg, Gold, EventAdmin, Click, Admin, Shop, CheckIn, SkinXD, Setting, Dialog, Skin, Animation2D } from "../Lwg_Template/lwg";
import { GVariate, GEnum, GSene3D } from "../Lwg_Template/Global";
import { Game } from "../Lwg_Template/Game";

export default class UIStart extends lwg.Admin.Scene {

    LevelDisplay: Laya.Sprite;
    LevelStyle: Laya.Sprite;

    lwgNodeDec(): void {
        this.LevelDisplay = this.self['LevelDisplay'];
        this.LevelStyle = this.self['LevelStyle'];
    }

    lwgEventReg(): void {
        EventAdmin.reg(SkinXD.EventType.acquisition, this, () => {
            this.self['BtnXDSkin'].visible = false;
        })
        EventAdmin.reg(CheckIn.EventType.removeCheckBtn, this, () => {
            this.self['BtnCheck'].visible = false;
        })
    }

    lwgOnEnable(): void {
        Skin._currentEye.name = null;
        Skin._currentHead.name = null;
        EventAdmin.notify(GEnum.EventType.changeHeadDecoration);
        EventAdmin.notify(GEnum.EventType.changeEyeDecoration);

        this.levelStyleDisplay();

        if (Shop.getGoodsProperty(Shop.GoodsClass.Other, 'xiandanren', Shop.GoodsProperty.have)) {
            this.self['BtnXDSkin'].visible = false;
        }

        // EventAdmin.notify(GEnum.EventType.cameraMove, GEnum.TaskType.sideHair);
        CheckIn.openCheckIn();

        Dialog.createVoluntarilyDialogue(150, 334, Dialog.UseWhere.scene1, 1000, 2000, this.self);
    }

    /**关卡列表*/
    levelStyleDisplay(): void {
        let location = Game._gameLevel.value % this.LevelStyle.numChildren;

        for (let index = 0; index < this.LevelStyle.numChildren; index++) {
            const element = this.LevelStyle.getChildAt(index);
            let location0 = Number(element.name.substring(element.name.length - 1, element.name.length));

            if (Game._gameLevel.value < 5) {
                location0 += 1;
            }

            let Num = element.getChildByName('Num') as Laya.FontClip;

            if (location0 === location) {

                Num.value = Game._gameLevel.value.toString();
            } else if (location0 < location) {

                Num.value = (Game._gameLevel.value - (location - location0)).toString();
            } else if (location0 > location) {

                Num.value = (Game._gameLevel.value + (location0 - location)).toString();
                let Pic = element.getChildByName('Pic') as Laya.Image;
                Pic.skin = 'UI/GameStart/jindu_hui.png';

                let Color = element.getChildByName('Color') as Laya.Image;
                if (Color !== null) {
                    Color.visible = false;
                }
                Num.skin = 'UI/Common/shuzi3.png';
            }
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnSkin'], this, null, null, () => {
            lwg.Admin._openScene(Admin.SceneName.UISkin);
        });

        Click.on(Click.Type.noEffect, this.self['Guide'], this, null, null, () => {
            Admin._openScene(lwg.Admin.SceneName.UISkinTry, null, this.self);
        });

        Click.on(Click.Type.largen, this.self['BtnTask'], this, null, null, () => {
            Admin._openScene(lwg.Admin.SceneName.UITask, null, this.self);
        });

        Click.on(Click.Type.largen, this.self['BtnCheck'], this, null, null, () => {
            lwg.Admin._openScene(Admin.SceneName.UICheckIn);

        });

        Click.on(Click.Type.largen, this.self['BtnXDSkin'], this, this.btnXDSkinDown, null, this.btnXDSkinUp);
    }

    easterEgg_AotumanSwitch: boolean = false;
    btnXDSkinDown(): void {
        this.easterEgg_AotumanSwitch = true;
    }

    btnXDSkinUp(): void {
        lwg.Admin._openScene(Admin.SceneName.UISkinXD);
    }

    onStageMouseMove(event: Laya.Event): void {
        if (this.easterEgg_AotumanSwitch) {
            this.self.addChild(this.self['Aotuman']);
            this.self['Aotuman'].x = event.stageX;
            this.self['Aotuman'].y = event.stageY;
            let point: Laya.Point = new Laya.Point(this.self['EasterEgg_Aotuman'].x, this.self['EasterEgg_Aotuman'].y);
            if (point.distance(event.stageX, event.stageY) < 50) {
                this.aotumanBack();
                let time = 100;
                let delayed = 100;

                let fxClamp = this.self['Clamp'].x;
                let fyClamp = this.self['Clamp'].y;
                let frRightClamp = this.self['RightClamp'].rotation;
                let frLeftClamp = this.self['LeftClamp'].rotation;
                let fxPicAotuman = this.self['PicAotuman'].x;
                let fyPicAotuman = this.self['PicAotuman'].y;
                let frPicAotuman = this.self['PicAotuman'].rotation;

                Animation2D.simple_Rotate(this.self['RightClamp'], 0, -19, time * 0.5);

                Animation2D.simple_Rotate(this.self['LeftClamp'], 0, 19, time * 0.5, 0, () => {

                    Animation2D.move_Simple(this.self['Clamp'], this.self['Clamp'].x, this.self['Clamp'].y - 200, time * 2, delayed * 4);

                    Animation2D.drop_KickBack(this.self['PicAotuman'], 1, this.self['PicAotuman'].y, this.self['PicAotuman'].y + 600, 50, time * 6, 0, () => {
                        this.self['Clamp'].x = fxClamp;
                        this.self['Clamp'].y = fyClamp;
                        this.self['RightClamp'].rotation = frRightClamp;
                        this.self['LeftClamp'].rotation = frLeftClamp;
                        this.self['PicAotuman'].x = fxPicAotuman;
                        this.self['PicAotuman'].y = fyPicAotuman;
                        this.self['PicAotuman'].rotation = frPicAotuman;
                    });
                    Animation2D.simple_Rotate(this.self['PicAotuman'], 0, 360, time * 5, 0, () => {
                        Admin._openScene(Admin.SceneName.UIEasterEgg);
                    });
                });
            }
        }
    }

    onStageMouseUp(): void {
        this.aotumanBack();
    }

    /**凹凸曼回到原位*/
    aotumanBack(): void {
        this.easterEgg_AotumanSwitch = false;
        this.self['BtnXDSkin'].addChild(this.self['Aotuman']);
        this.self['Aotuman'].x = 77;
        this.self['Aotuman'].y = 63;
    }

    lwgOnDisable(): void {
        Gold.GoldNode.visible = false;
        Setting.setBtnVinish();
    }
}