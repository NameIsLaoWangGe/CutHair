import { lwg, Gold } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIStart extends lwg.Admin.Scene {

    LevelDisplay: Laya.Sprite;
    LevelStyle: Laya.Sprite;

    selfNode(): void {
        this.LevelDisplay = this.self['LevelDisplay'];
        this.LevelStyle = this.self['LevelStyle'];
    }

    lwgOnEnable(): void {
        Gold._createGoldNode(Laya.stage);
        this.levelStyleDisplay();
    }

    /**关卡列表*/
    levelStyleDisplay(): void {

        let location = GVariate._gameLevel % this.LevelStyle.numChildren;
        for (let index = 0; index < this.LevelStyle.numChildren; index++) {
            const element = this.LevelStyle.getChildAt(index);
            let location0 = Number(element.name.substring(element.name.length - 1, element.name.length));
            let Num = element.getChildByName('Num') as Laya.FontClip;
            if (location0 === location) {
                Num.value = GVariate._gameLevel.toString();
            } else if (location0 < location) {
                Num.value = (GVariate._gameLevel - (location - location0)).toString();
            } else if (location0 > location) {
                Num.value = (GVariate._gameLevel + (location0 - location)).toString();
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


    onStageClick(): void {
        lwg.Admin._openScene(lwg.Admin.SceneName.UIOperation, null, null, f => {
            this.self.close();
        });
    }
    lwgDisable(): void {
        Gold.GoldNode.visible = false; 
    }
}