import ADManager, { TaT } from "../TJ/Admanager";
import { Task, lwg, Animation2D, CheckIn, Gold } from "../Lwg_Template/lwg";

export default class UICheckIn extends CheckIn.CheckInScene {


    checkInOnEnable(): void {

        let ChinkTip = this.self['BtnSeven'].getChildByName('ChinkTip') as Laya.Image;
        ChinkTip.visible = false;
    }

    checkList_Update(cell: Laya.Box, index: number): void {
        let dataSource = cell.dataSource;

        let Pic_Board = cell.getChildByName('Pic_Board') as Laya.Image;
        let Pic_Gold = cell.getChildByName('Pic_Gold') as Laya.Image;
        let Num = cell.getChildByName('Num') as Laya.Label;
        let ChinkTip = cell.getChildByName('ChinkTip') as Laya.Label;
        let DayNum = cell.getChildByName('DayNum') as Laya.Label;

        if (dataSource[CheckIn.CheckProPerty.checkInState]) {
            Pic_Gold.visible = false;
            Num.visible = false;
            ChinkTip.visible = true;
            Pic_Board.skin = 'UI/Common/kuang1.png'
        } else {
            Pic_Gold.visible = true;
            Num.visible = true;
            Num.text = dataSource[CheckIn.CheckProPerty.rewardNum];
            ChinkTip.visible = false;
            Pic_Board.skin = 'UI/Common/kuang2.png'
        }

        switch (dataSource[CheckIn.CheckProPerty.name]) {
            case 'day1':
                DayNum.text = '第一天';
                break;
            case 'day2':
                DayNum.text = '第二天';

                break;
            case 'day3':
                DayNum.text = '第三天';

                break;
            case 'day4':
                DayNum.text = '第四天';

                break;
            case 'day5':
                DayNum.text = '第五天';

                break;
            case 'day6':
                DayNum.text = '第六天';

                break;
            case 'day7':
                DayNum.text = '第七天';

                break;
            default:
                break;
        }

    }

    checkInBtnClick(): void {
        lwg.Click.on('largen', null, this.self['BtnGet'], this, null, null, this.btnGetUp, null);
        lwg.Click.on('largen', null, this.self['BtnSelect'], this, null, null, this.btnSelectUp, null);
        lwg.Click.on('largen', null, this.self['BtnBack'], this, null, null, this.btnBackUp, null);
    }

    btnBackUp(event): void {
        this.self.close();
    }

    btnGetUp(event): void {
        if (this.self['Dot'].visible) {
            ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_sign');
            ADManager.ShowReward(() => {
                this.btnGetUpFunc(3);
            })
        } else {
            this.btnGetUpFunc(1);
        }
    }

    btnGetUpFunc(number): void {
        let rewardNum = CheckIn.todayCheckIn_7Days();
        Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
            Gold.addGold(rewardNum * number);
            this.self.close();
        });
    }

    btnSelectUp(): void {
        if (this.self['Dot'].visible) {
            this.self['Dot'].visible = false;
        } else {
            this.self['Dot'].visible = true;
        }
    }

    checkInOnUpdate(): void {
        lwg.Global._stageClick = false;
    }
    checkInOnDisable(): void {
        lwg.Global._stageClick = true;
    }
}