import { lwg, Gold, Game, EventAdmin, Click, Admin, Shop, Tools } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIShop extends Shop.ShopScene {

    shopOnAwake(): void {
        Gold.goldVinish(100);
        GVariate._stageClick = false;

        /**结构相关*/
        Shop._MyTap = this.self['MyTap'];
        Shop._MyList = this.self['MyList'];
        Shop.allSkin = Laya.loader.getRes("Data/Shop/Skin.json")['RECORDS'];
        Shop.allProps = Laya.loader.getRes("Data/Shop/Other.json")['RECORDS'];
        Shop.allOther = Laya.loader.getRes("Data/Shop/Other.json")['RECORDS'];


        Tools.objPropertySort(Shop.allSkin, 'arrange');
        Tools.objPropertySort(Shop.allProps, 'arrange');
        Tools.objPropertySort(Shop.allOther, 'arrange');
        
        console.log(Shop.allSkin);
        console.log(Shop.allProps);
        console.log(Shop.allOther);
    }

    shopNodeDec(): void {

    }

    shopOnEnable(): void {

    };

    refreshList(): void {
        Shop._MyList.array = Shop.allSkin;
        console.log(Shop._MyList.array);
    }

    updateList(cell, index: number): void {
        let dataSource = cell.dataSource;
        let Pic = cell.getChildByName('Pic') as Laya.Image;
        Pic.skin = 'UI/Props/Skin/' + dataSource.name + '.png';
        // let pifuImg = cell.getChildByName('PifuImg') as Laya.Image;
        // let select = cell.getChildByName('Select') as Laya.Sprite;
        // // 信息赋值
        // pifuImg.skin = dataSource.pifuUrl;
        // cell.scale(dataSource.scale, dataSource.scale);
        console.log(dataSource);
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