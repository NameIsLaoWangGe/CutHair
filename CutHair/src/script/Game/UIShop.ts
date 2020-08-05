import { lwg, Gold, Game, EventAdmin, Click, Admin, Shop, Tools, Hint, Effects } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";
import ADManager from "../TJ/Admanager";

export default class UIShop extends Shop.ShopScene {
    shopOnAwake(): void {
        GVariate._stageClick = false;

        /**设置品类顺序*/
        Shop.goodsClassArr = [Shop.allOther, Shop.allProps, Shop.allSkin];
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

        //根据排序值进行数组排序
        Tools.objPropertySort(Shop.allSkin, 'arrange');
        Tools.objPropertySort(Shop.allProps, 'arrange');
        Tools.objPropertySort(Shop.allOther, 'arrange');

        // 设置默认选中的商品
        if (!Shop._currentSkin.name) {
            Shop._currentSkin.name = SkinName.anquanmao;
        }
        if (!Shop._currentProp.name) {
            Shop._currentProp.name = PropsName.jiandao;
        }
        if (!Shop._currentOther.name) {
            Shop._currentOther.name = OtherName.tixudao;
        }

        // 设置通过关卡获取的显示,目前就一个
        let condition = Shop.getGoodsProperty(Shop.GoodsClass.Skin, SkinName.xiaochoumao, Shop.GoodsProperty.condition);
        if (Game._gameLevel.value >= condition) {
            Shop.setGoodsProperty(Shop.GoodsClass.Skin, SkinName.xiaochoumao, Shop.GoodsProperty.have, true);
        } else {
            Shop.setGoodsProperty(Shop.GoodsClass.Skin, SkinName.xiaochoumao, Shop.GoodsProperty.resCondition, Game._gameLevel.value);
        }
    }

    shopEventReg(): void {
        //box被选中后出发
        EventAdmin.reg(Shop.EventType.select, this, (dataSource) => {
            console.log(dataSource.have);
            if (dataSource.have) {
                this.sceletDisplay(dataSource, false);
            } else {

                if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ads) {
                    ADManager.ShowReward(() => {
                        this.adsAcquisition(dataSource);
                    })
                } else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.adsXD) {
                    Hint.createHint_Middle(Hint.HintDec["请前往皮肤限定界面获取!"])

                } else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.ineedwin) {
                    Hint.createHint_Middle(Hint.HintDec["通过相应的关卡数达到就可以得到了!"])

                } else if (dataSource[Shop.GoodsProperty.getway] === Shop.Getway.gold) {
                    Hint.createHint_Middle(Hint.HintDec["点击金币抽奖按钮购买!"])
                }
            }
        })
        Shop._ShopList.refresh();
    }

    /**选中并且展示,并且移动到当前的cell*/
    sceletDisplay(dataSource: any, scrollTo: boolean): void {
        switch (Shop._ShopTap.selectedIndex) {
            case 2:
                Shop._currentSkin.name = dataSource.name;
                this.self['Dispaly'].skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                break;
            case 1:
                Shop._currentProp.name = dataSource.name;
                this.self['Dispaly'].skin = 'UI/Shop/Props/' + dataSource.name + '.png';

                break;
            case 0:
                Shop._currentOther.name = dataSource.name;
                this.self['Dispaly'].skin = 'UI/Shop/Other/' + dataSource.name + '.png';

                break;

            default:
                break;
        }
        if (scrollTo) {
            let index = dataSource.arrange - 1;
            Shop._ShopList.scrollTo(index);
        }
    }

    /**看广告获得*/
    adsAcquisition(dataSource): void {
        let claName;
        switch (Shop._ShopTap.selectedIndex) {
            case 2:
                claName = Shop.GoodsClass.Skin;
                break;
            case 1:
                claName = Shop.GoodsClass.Props;
                break;
            case 0:
                claName = Shop.GoodsClass.Other;
                break;

            default:
                break;
        }
        let condition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.condition);
        let resCondition = Shop.getGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition);
        Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.resCondition, resCondition + 1);
        if (condition <= resCondition + 1) {
            Shop.setGoodsProperty(claName, dataSource.name, Shop.GoodsProperty.have, true);
            this.sceletDisplay(dataSource.name, false);
        }
        Shop._ShopList.refresh();
    }

    myTap_Select(index): void {
        switch (index) {
            case 2:
                Shop._ShopList.array = Shop.allSkin;
                this.self['Dispaly'].skin = 'UI/Shop/Skin/' + Shop._currentSkin.name + '.png';

                break;
            case 1:
                Shop._ShopList.array = Shop.allProps;
                this.self['Dispaly'].skin = 'UI/Shop/Props/' + Shop._currentProp.name + '.png';

                break;
            case 0:
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
            case 2:
                Pic.skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                if (cell.dataSource[Shop.GoodsProperty.name] == Shop._currentSkin.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;
            case 1:
                Pic.skin = 'UI/Shop/Props/' + dataSource.name + '.png';
                if (cell.dataSource[Shop.GoodsProperty.name] == Shop._currentProp.name) {
                    Select.visible = true;
                } else {
                    Select.visible = false;
                }
                break;
            case 0:
                Pic.skin = 'UI/Shop/Other/' + dataSource.name + '.png';
                if (cell.dataSource[Shop.GoodsProperty.name] == Shop._currentOther.name) {
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
        NoHave.visible = true;
        let Board = cell.getChildByName('Board') as Laya.Image;
        let Dec = NoHave.getChildByName('Dec') as Laya.Label;
        let Icon = NoHave.getChildByName('Icon') as Laya.Label;
        if (!cell.dataSource[Shop.GoodsProperty.have]) {
            switch (cell.dataSource[Shop.GoodsProperty.getway]) {
                case Shop.Getway.ads:
                    Dec.text = cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition];
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
                    Dec.text = '过' + cell.dataSource[Shop.GoodsProperty.resCondition] + '/' + cell.dataSource[Shop.GoodsProperty.condition] + '关';
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
            case 2:
                noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Skin, false);
                break;
            case 1:
                noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Props, false);
                break;
            case 0:
                noHaveGold = Shop.getwayGoldArr(Shop.GoodsClass.Other, false);
                break;
            default:
                break;
        }
        if (noHaveGold.length <= 0) {
            Hint.createHint_Middle(Hint.HintDec["没有可以购买的皮肤了！"]);
        } else {
            Tools.objPropertySort(noHaveGold, Shop.GoodsProperty.getOder);
            let price = noHaveGold[0][Shop.GoodsProperty.condition];
            if (Gold._goldNum < price) {
                Hint.createHint_Middle(Hint.HintDec["金币不够了！"]);
            } else {
                Hint.createHint_Middle(Hint.HintDec["恭喜获得新皮肤!"]);
                switch (Shop._ShopTap.selectedIndex) {
                    case 2:
                        Shop.setGoodsProperty(Shop.GoodsClass.Skin, noHaveGold[0].name, Shop.GoodsProperty.have, true);
                        break;
                    case 1:
                        Shop.setGoodsProperty(Shop.GoodsClass.Props, noHaveGold[0].name, Shop.GoodsProperty.have, true);
                        break;
                    case 0:
                        Shop.setGoodsProperty(Shop.GoodsClass.Other, noHaveGold[0].name, Shop.GoodsProperty.have, true);
                        break;
                    default:
                        break;
                }
                this.sceletDisplay(noHaveGold[0], true);
            }
            Shop._ShopList.refresh();
        }
    }
    btnGetGold(): void {
        ADManager.ShowReward(() => {
            Gold.getGoldAni_Heap(Laya.stage, 15, 88, 69, 'UI/GameStart/qian.png', new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2), new Laya.Point(Gold.GoldNode.x - 80, Gold.GoldNode.y), null, () => {
                this.advFunc();
            });
        })
    }
    advFunc(): void {
        Gold.addGold(500);
    }


    btnBackUp(): void {
        this.self.close();
    }

    shopOnDisable(): void {
        GVariate._stageClick = true;
    }
}