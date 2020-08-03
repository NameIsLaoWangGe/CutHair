import { lwg, Gold, Game, EventAdmin, Click, Admin, Shop, Tools, Hint } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIShop extends Shop.ShopScene {

    shopOnAwake(): void {
        GVariate._stageClick = false;
        // 列举皮肤的名称
        enum SkinName {
            anquanmao = 'anquanmao',
            yuanyanjing = 'yuanyanjing',
            jiemao_01 = 'jiemao_01',
            hamajing = 'hamajing',
            yanshemao_gangtie = 'yanshemao_gangtie',
            yanshemao = 'yanshemao',
            jiemao_02 = 'jiemao_02',
            xiaochoumao = 'xiaochoumao',
            xingxingyanjing = 'xingxingyanjing',
            yanshemao_shijie = 'yanshemao_shijie',
            maomaozi = 'maomaozi',
        }
        // 列举道具的名称
        enum PropsName {
            yingguangbang = 'yingguangbang',
            lifadao = 'lifadao',
            jiandao = 'jiandao',
            dianjupian = 'dianjupian',
            dianju = 'dianju',
        }
        // 列举其他道具的名称
        enum OtherName {
            xiangsudao = 'xiangsudao',
            tixudao = 'tixudao',
            ruwu = 'ruwu',
            lifadao = 'lifadao',
            jundao = 'jundao',
            tulongdao = 'tulongdao'
        }

        /**根据排序值进行排序*/
        Tools.objPropertySort(Shop.allSkin, 'arrange');
        Tools.objPropertySort(Shop.allProps, 'arrange');
        Tools.objPropertySort(Shop.allOther, 'arrange');

        if (!Shop._currentSkin.name) {
            Shop._currentSkin.name = SkinName.anquanmao;
        }
        if (!Shop._currentProp.name) {
            Shop._currentProp.name = PropsName.jiandao;
        }
        if (Shop._currentOther.name) {
            Shop._currentOther.name = OtherName.tixudao;
        }
        console.log(Shop.allSkin);
        console.log(Shop.allProps);
        console.log(Shop.allOther);
    }

    shopEventReg(): void {
        //box被选中后出发
        EventAdmin.reg(Shop.EventType.select, this, (dataSource) => {
            if (dataSource.have) {
                switch (Shop._ShopTap.selectedIndex) {
                    case 0:
                        Shop._currentSkin.name = dataSource.name;
                        this.self['Dispaly'].skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                        break;
                    case 1:
                        Shop._currentProp.name = dataSource.name;
                        this.self['Dispaly'].skin = 'UI/Shop/Props/' + dataSource.name + '.png';

                        break;
                    case 2:
                        Shop._currentOther.name = dataSource.name;
                        this.self['Dispaly'].skin = 'UI/Shop/Other/' + dataSource.name + '.png';

                        break;

                    default:
                        break;
                }
                Shop._ShopList.refresh();
            } else {

                console.log(dataSource[Shop.Getway.ads], Shop.Getway.ads);
                if (dataSource[Shop.Property.getway] === Shop.Getway.ads) {
                    Hint.createHint_Middle(Hint.HintDec["暂时没有广告，过会儿再试试吧！"])

                } else if (dataSource[Shop.Property.getway]  === Shop.Getway.adsXD) {
                    Hint.createHint_Middle(Hint.HintDec["请前往皮肤限定界面获取!"])

                } else if (dataSource[Shop.Property.getway]  === Shop.Getway.ineedwin) {
                    Hint.createHint_Middle(Hint.HintDec["通过相应的关卡数达到就可以得到了!"])

                }else if (dataSource[Shop.Property.getway]  === Shop.Getway.gold) {
                    Hint.createHint_Middle(Hint.HintDec["点击金币抽奖按钮购买!"])

                }
            }
        })
    }

    myTap_Select(index): void {
        switch (index) {
            case 0:
                Shop._ShopList.array = Shop.allSkin;
                this.self['Dispaly'].skin = 'UI/Shop/Skin/' + Shop._currentSkin.name + '.png';

                break;
            case 1:
                Shop._ShopList.array = Shop.allProps;
                this.self['Dispaly'].skin = 'UI/Shop/Props/' + Shop._currentProp.name + '.png';

                break;
            case 2:
                Shop._ShopList.array = Shop.allOther;
                this.self['Dispaly'].skin = 'UI/Shop/Other/' + Shop._currentOther.name + '.png';

                break;
            default:
                break;
        }
        Shop._ShopList.refresh();
    }

    myList_Update(cell, index: number): void {
        let dataSource = cell.dataSource;
        let Select = cell.getChildByName('Select') as Laya.Sprite;
        Select.visible = false;
        let Pic = cell.getChildByName('Pic') as Laya.Image;

        switch (Shop._ShopTap.selectedIndex) {
            case 0:
                Pic.skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                if (cell.dataSource[Shop.Property.name] == Shop._currentSkin.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;
            case 1:
                Pic.skin = 'UI/Shop/Props/' + dataSource.name + '.png';
                if (cell.dataSource[Shop.Property.name] == Shop._currentProp.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;
            case 2:
                Pic.skin = 'UI/Shop/Other/' + dataSource.name + '.png';
                if (cell.dataSource[Shop.Property.name] == Shop._currentOther.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;
            default:
                break;
        }

        // 如果没有获得，根据需求路径进行设置提示
        let NoHave = cell.getChildByName('NoHave') as Laya.Image;
        let Board = cell.getChildByName('Board') as Laya.Image;
        let Dec = NoHave.getChildByName('Dec') as Laya.Label;
        let Icon = NoHave.getChildByName('Icon') as Laya.Label;
        if (!cell.dataSource[Shop.Property.have]) {
            switch (cell.dataSource[Shop.Property.getway]) {
                case Shop.Getway.ads:
                    Dec.text = cell.dataSource[Shop.Property.resCondition] + '/' + cell.dataSource[Shop.Property.condition];
                    Dec.x = 88;
                    Dec.fontSize = 30;
                    Icon.visible = true;

                    break;
                case Shop.Getway.adsXD:
                    Dec.text = '限定获取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;

                    break;
                case Shop.Getway.easterEgg:
                    Dec.text = '彩蛋获取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;

                    break;
                case Shop.Getway.ineedwin:
                    Dec.text = '过' + cell.dataSource[Shop.Property.resCondition] + '/' + cell.dataSource[Shop.Property.condition] + '关';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;
                    break;
                case Shop.Getway.gold:
                    Dec.text = '金币抽取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    Icon.visible = false;

                    break;
                default:
                    Icon.visible = false;
                    break;
            }
            Board.skin = 'UI/Common/kuang2.png';
        } else {
            NoHave.visible = false;
            Board.skin = 'UI/Common/kuang1.png';
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, null, this.self['BtnBuy'], this, null, null, this.btnBuyUp);
        Click.on(Click.Type.largen, null, this.self['BtnGetGold'], this, null, null, this.btnGetGold);
        Click.on(Click.Type.largen, null, this.self['BtnBack'], this, null, null, this.btnBackUp);
    }

    btnBuyUp(): void {
        let noHaveGold = [];
        switch (Shop._ShopTap.selectedIndex) {
            case 0:
                noHaveGold = Shop.getNohaveArr_Gold(Shop.GoodsClass.Skin);
                break;
            case 1:
                noHaveGold = Shop.getNohaveArr_Gold(Shop.GoodsClass.Props);
                break;
            case 2:
                noHaveGold = Shop.getNohaveArr_Gold(Shop.GoodsClass.Other);
                break;

            default:
                break;
        }
        if (noHaveGold.length <= 0) {
            Hint.HintDec["没有可以购买的皮肤了！"];
        } else {
            Tools.objPropertySort(noHaveGold, Shop.Property.getOder);
            let price = noHaveGold[0][Shop.Property.condition];
            if (Gold._goldNum < price) {
                Hint.createHint_Middle(Hint.HintDec["金币不够了！"]);
            } else {
                Hint.createHint_Middle(Hint.HintDec["恭喜获得新皮肤!"]);
                switch (Shop._ShopTap.selectedIndex) {
                    case 0:
                        Shop.setGoodsProperty(Shop.GoodsClass.Skin, noHaveGold[0].name, Shop.Property.have, true);
                        break;
                    case 1:
                        Shop.setGoodsProperty(Shop.GoodsClass.Props, noHaveGold[0].name, Shop.Property.have, true);
                        break;
                    case 2:
                        Shop.setGoodsProperty(Shop.GoodsClass.Other, noHaveGold[0].name, Shop.Property.have, true);
                        break;

                    default:
                        break;
                }
            }
            Shop._ShopList.refresh();
        }
    }

    btnGetGold(): void {
        Hint.HintDec["暂时没有广告，过会儿再试试吧！"];
    }

    btnBackUp(): void {
        this.self.close();
    }

    lwgDisable(): void {
        GVariate._stageClick = true;
    }
}