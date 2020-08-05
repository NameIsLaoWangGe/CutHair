import { lwg, Click, Admin, EventAdmin, Gold, Hint, Game, Animation2D, Shop, Task } from "../Lwg_Template/lwg";
import GameMain3D from "./GameMain3D";
import { GEnum, GVariate, GSene3D } from "../Lwg_Template/Global";
import ADManager from "../TJ/Admanager";

export default class UIVictory extends lwg.Admin.Scene {
    constructor() { super(); }

    GlodNum: Laya.Sprite;
    /**本关应该给予多少金币*/
    getGoldNum: number;
    lwgNodeDec(): void {
        this.GlodNum = this.self['GlodNum'];
    }

    lwgOnEnable(): void {
        this.getGoldNum = 50;
        this.getGoldDisPlay();
        Gold.goldAppear(500);
        Game._gameLevel.value++;

        this.self['BtnAdv'].visible = true;
        this.self['BtnNormal'].visible = false;
        this.self['Dot'].visible = true;

        lwg.Effects.createFireworks(Laya.stage, 40, 430, 200);
        lwg.Effects.createFireworks(Laya.stage, 40, 109, 200);

        lwg.Effects.createLeftOrRightJet(Laya.stage, 'right', 40, 720, 300);
        lwg.Effects.createLeftOrRightJet(Laya.stage, 'left', 40, 0, 300);

        EventAdmin.notify(Task.TaskType.victory);
    }

    lwgOpenAni(): number {
        this.self['Multiply10'].alpha = 0;
        this.self['GlodNum'].alpha = 0;
        this.self['BtnAdv'].alpha = 0;
        this.self['Select'].alpha = 0;
        Animation2D.move_Simple(this.self['Logo'], this.self['Logo'].x, this.self['Logo'].y - 500, this.self['Logo'].x, this.self['Logo'].y, this.aniTime * 5, this.aniDelayde * 0, Laya.Ease.cubicOut, () => {
            Animation2D.scale_Alpha(this.self['Multiply10'], 0, 0, 0, 1, 1, 1, this.aniTime * 3);

            Animation2D.bombs_Appear(this.self['GlodNum'], 0, 1, 1.2, 0, this.aniTime * 2, this.aniTime * 1, this.aniDelayde * 3);
            Animation2D.bombs_Appear(this.self['BtnAdv'], 0, 1, 1.2, 0, this.aniTime * 2, this.aniTime * 1, this.aniDelayde * 5);
            Animation2D.fadeOut(this.self['Select'], 0, 1, this.aniTime * 2, this.aniDelayde * 7);
        });

        return 0;
    }

    /**本关获得金币显示*/
    getGoldDisPlay(): void {
        let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
        Num.text = (this.getGoldNum * 10).toString();
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, null, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
        Click.on(Click.Type.largen, null, this.self['BtnAdv'], this, null, null, this.btnAdvUp, null);
        Click.on(Click.Type.largen, null, this.self['BtnNormal'], this, null, null, this.btnNormalUp, null);
    }

    offClick(): void {
        Click.off(Click.Type.noEffect, null, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
        Click.off(Click.Type.largen, null, this.self['BtnAdv'], this, null, null, this.btnAdvUp, null);
        Click.off(Click.Type.largen, null, this.self['BtnNormal'], this, null, null, this.btnNormalUp, null);
    }

    addOrSub: string = 'add';
    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            // 按钮格式
            this.self['Dot'].visible = false;
            this.self['BtnAdv'].visible = false;
            this.self['BtnNormal'].visible = true;
            this.addOrSub = 'sub';

            // 图片消失动画
            let Multiply10 = this.self['Multiply10'] as Laya.Image;
            Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 0, 0, 0, 100)
            // 金币下降动画
            let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
            Laya.timer.loop(30, this, () => {

                if (this.addOrSub == 'sub') {
                    if (Number(Num.text) < this.getGoldNum) {
                        Num.text = (this.getGoldNum).toString();
                        this.addOrSub = null;
                    } else {
                        Num.text = (Number(Num.text) - 30).toString();
                    }
                }
            })

        } else {
            // 按钮格式
            this.self['Dot'].visible = true;
            this.self['BtnAdv'].visible = true;
            this.self['BtnNormal'].visible = false;
            this.addOrSub = 'add';

            // 图片出现动画
            let Multiply10 = this.self['Multiply10'] as Laya.Image;
            Animation2D.scale_Alpha(Multiply10, Multiply10.alpha, Multiply10.scaleX, Multiply10.scaleY, 1, 1, 1, 100)
            // 金币上涨动画
            let Num = this.GlodNum.getChildByName('Num') as Laya.Label;
            Laya.timer.loop(30, this, () => {
                if (this.addOrSub == 'add') {
                    if (Number(Num.text) > this.getGoldNum * 10) {
                        Num.text = (this.getGoldNum * 10).toString();
                        this.addOrSub = null;
                    } else {
                        Num.text = (Number(Num.text) + 30).toString();
                    }
                }
            })
        }
    }

    btnNormalUp(): void {
        this.offClick();
        Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
            this.advFunc();
        });
    }

    btnAdvUp(): void {
        ADManager.ShowReward(() => {
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                this.advFunc();
            });
        })
    }

    advFunc(): void {
        if (this.self['Dot'].visible) {
            Gold.addGold(this.getGoldNum * 10);
        } else {
            Gold.addGold(this.getGoldNum);
        }
        EventAdmin.notify(EventAdmin.EventType.scene3DRefresh);
        Admin._openScene(Admin.SceneName.UIStart, null, null, () => { console.log(Laya.stage) })
        this.self.close();
    }

    lwgOnDisable(): void {

    }
}