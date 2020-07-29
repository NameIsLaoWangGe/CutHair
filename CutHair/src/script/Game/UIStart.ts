import { lwg, Gold, Game, EventAdmin } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIStart extends lwg.Admin.Scene {

    LevelDisplay: Laya.Sprite;
    LevelStyle: Laya.Sprite;

    selfNode(): void {
        this.LevelDisplay = this.self['LevelDisplay'];
        this.LevelStyle = this.self['LevelStyle'];
    }

    lwgOnEnable(): void {
        GVariate._stageClick = false;
        Laya.timer.frameOnce(30, this, () => { GVariate._stageClick = true })
        Gold._createGoldNode(Laya.stage);
        this.levelStyleDisplay();

        EventAdmin.notify(GEnum.EventType.cameraMove, GEnum.TaskType.sideHair);


        console.log(window);
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
    onStageMouseUp(): void {
        if (GVariate._stageClick) {
            lwg.Admin._openScene(lwg.Admin.SceneName.UIOperation, null, null, f => {
                console.log('开始游戏');
                this.self.close();
            });
        }

    }
    lwgDisable(): void {
        Gold.GoldNode.visible = false;
    }
}