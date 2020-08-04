import { lwg, Click, EventAdmin, Hint, Admin, Game, Task } from "../Lwg_Template/lwg";
import ADManager from "../TJ/Admanager";
import { GVariate } from "../Lwg_Template/Global";

export default class UITask extends lwg.Task.TaskScene {

    taskOnAwake(): void {
        GVariate._stageClick = false;
    }

    taskList_Update(cell: Laya.Box, index: number): void {
        let dataSource = cell.dataSource;
        let Name = cell.getChildByName('Name') as Laya.Label;
        Name.text = dataSource.name;

        let BtnGet = cell.getChildByName('BtnGet') as Laya.Image;
        if (dataSource.get === 0) {
            BtnGet.skin = 'UI/Task/jinxing.png';
        } else if (dataSource.get === 1) {
            BtnGet.skin = 'UI/Task/linqu.png';
        } else if (dataSource.get === -1) {
            BtnGet.skin = 'UI/Task/yilingqu.png';
        }

        let ProgressBar = cell.getChildByName('ProgressBar') as Laya.Image;
        ProgressBar.width = dataSource.resCondition / dataSource.condition * 169;
        let AwardNum = cell.getChildByName('AwardNum') as Laya.Label;
        AwardNum.text = dataSource.rewardNum;
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.noEffect, null, this.self['BtnBack'], this, null, null, this.btnBackeUp);

    };
    btnBackeUp(): void {
        this.self.close();
    }

    taskDisable(): void {
        GVariate._stageClick = true;
    }
}