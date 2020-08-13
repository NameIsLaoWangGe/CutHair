import { EasterEgg } from "../Lwg_Template/EasterEgg";
import { Click, Admin, Setting, Gold, Shop, EventAdmin, Task } from "../Lwg_Template/lwg";
import ADManager from "../TJ/Admanager";

export default class UIEasterEgg extends EasterEgg.EasterEggScene {

    easterEggOnAwake(): void {
        Setting.setBtnVinish();
        Gold.goldVinish();
        this.initDisplay();
        EasterEgg._easterEgg_1.value = true;
    }

    /**初始化*/
    initDisplay(): void {
        for (let index = 0; index < EasterEgg._easterEgg_1Arr.length; index++) {
            const element = EasterEgg._easterEgg_1Arr[index];

            //显示是否完成 
            let name = 'Complete' + (index + 1);
            let complete = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.complete);
            if (complete) {
                this.self[name].skin = 'UI/EasterEgg_Aotoman/Task/wancheng.png';
            } else {
                this.self[name].skin = 'UI/EasterEgg_Aotoman/Task/wancheng2.png';
            }

            // 显示需要展示的进度
            let assemblyName = 'Assembly' + (index + 1);
            let Num = this.self[assemblyName].getChildByName('Num') as Laya.Label;
            if (Num) {
                let condetion = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.condition);
                let resCondetion = EasterEgg.getProperty(EasterEgg.Classify.EasterEgg_01, element.name, EasterEgg.Property.resCondition);
                Num.text = resCondetion + '/' + condetion;
            }

            switch (index) {
                case 0:
                    if (complete !== 1) {
                        Click.on(Click.Type.largen, this.self['BtnGoUp'], this, null, null, () => {
                            Admin._openScene(Admin.SceneName.UISkinXD, null, this.self);
                        });
                    }
                    break;

                case 3:
                    break;
                case 4:
                    if (complete !== 1) {
                        Click.on(Click.Type.largen, this.self['BtnHint'], this, null, null, () => {
                            ADManager.ShowReward(() => {
                                this.self['DialogHint'].x = 0;
                            })
                        });

                        Click.on(Click.Type.largen, this.self['BtnConfirm'], this, null, null, () => {
                            this.self['DialogHint'].x = -800;
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }

    clickNum: number = 0;
    /**显示任务完成状况*/
    easterEggBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnBack'], this, null, null, () => {
            this.self.close();
        });
        Click.on(Click.Type.largen, this.self['BtnAotuman'], this, null, null, () => {
            this.clickNum++;
            console.log(this.clickNum);
        });
        Click.on(Click.Type.largen, this.self['BtnInject'], this, null, null, () => {
            this.self.close();
        });
    };

    easterEggOnDisable(): void {
        Setting.setBtnAppear();
        Gold.goldAppear();
        EventAdmin.notify(EasterEgg.EventType.trigger);
    }

    easu():void{

    }
}