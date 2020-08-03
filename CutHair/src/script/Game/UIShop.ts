import { lwg, Gold, Game, EventAdmin, Click, Admin, Shop, Tools } from "../Lwg_Template/lwg";
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

        Shop._currentSkin.name = SkinName.anquanmao;
        Shop._currentProp.name = PropsName.jiandao;
        Shop._crrentOther.name = OtherName.tixudao;

        console.log(Shop.allSkin);
        console.log(Shop.allProps);
        console.log(Shop.allOther);
    }

    myTap_Select(index): void {
        switch (index) {
            case 0:
                Shop._MyList.array = Shop.allSkin;
                break;
            case 1:
                Shop._MyList.array = Shop.allProps;
                break;
            case 2:
                Shop._MyList.array = Shop.allOther;
                break;

            default:
                break;
        }
        Shop._MyList.refresh();
    }

    myList_Update(cell, index: number): void {
        let dataSource = cell.dataSource;
        let Pic = cell.getChildByName('Pic') as Laya.Image;

        switch (Shop._MyTap.selectedIndex) {
            case 0:
                Pic.skin = 'UI/Shop/Skin/' + dataSource.name + '.png';
                break;
            case 1:
                Pic.skin = 'UI/Shop/Props/' + dataSource.name + '.png';
                break;
            case 2:
                Pic.skin = 'UI/Shop/Other/' + dataSource.name + '.png';
                break;
            default:
                break;
        }

        // 如果没有获得，根据需求路径进行设置提示
        let NoHave = cell.getChildByName('NoHave') as Laya.Image;
        let Dec = NoHave.getChildByName('Dec') as Laya.Label;
        let Icon = NoHave.getChildByName('Icon') as Laya.Label;
        if (!cell.dataSource[Shop.Property.have]) {
            switch (cell.dataSource[Shop.Property.getway]) {
                case Shop.Getway.ads || Shop.Getway.adsXD:
                    Dec.text = cell.dataSource[Shop.Property.resCondition] + '/' + cell.dataSource[Shop.Property.condition];
                    Dec.x = 88;
                    Dec.fontSize = 30;
                    Icon.visible = true;
                    break;

                case Shop.Getway.customs:
                    Dec.text = '过' + cell.dataSource[Shop.Property.resCondition] + '/' + cell.dataSource[Shop.Property.condition] + '关';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 23;
                    
                    break;

                case Shop.Getway.gold:
                    Dec.text = '金币抽取';
                    Dec.x = NoHave.width / 2;
                    Dec.fontSize = 28;
                    Icon.visible = false;

                    break;

                default:
                    Icon.visible = false;
                    break;
            }
        } else {
            NoHave.visible = false;
        }

        // let pifuImg = cell.getChildByName('PifuImg') as Laya.Image;
        // let select = cell.getChildByName('Select') as Laya.Sprite;
        // // 信息赋值
        // pifuImg.skin = dataSource.pifuUrl;
        // cell.scale(dataSource.scale, dataSource.scale);
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, null, this.self['BtnBuy'], this, null, null, this.btnBuyUp);
        Click.on(Click.Type.largen, null, this.self['BtnGetGold'], this, null, null, this.btnGetGold);
        Click.on(Click.Type.largen, null, this.self['BtnBack'], this, null, null, this.btnBackUp);
    }
    btnBuyUp(): void {

    }
    btnGetGold(): void {

    }
    btnBackUp(): void {
        this.self.close();
    }

    lwgDisable(): void {
        GVariate._stageClick = true;
    }
}