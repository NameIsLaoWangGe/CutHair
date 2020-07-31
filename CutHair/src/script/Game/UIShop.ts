import { lwg, Gold, Game, EventAdmin, Click, Admin, Shop } from "../Lwg_Template/lwg";
import { GVariate, GEnum } from "../Lwg_Template/Global";

export default class UIShop extends Shop.ShopScene {
    MyTap: Laya.Tab;
    MyList: Laya.List;
    Dispaly: Laya.Image;
    shopOnAwake(): void {
        Gold.goldVinish(100);
        GVariate._stageClick = false;

        Shop.allSkin = ['','']
    }

    lwgNodeDec(): void {
        this.MyTap = this.self['MyTap'];
        this.MyList = this.self['MyList'];
        this.Dispaly = this.self['Dispaly'];
    }

    shopOnEnable(): void {
        this.createMyList();
    };

    /**创建list*/
    createMyList(): void {
        this.MyList.selectEnable = true;
        this.MyList.vScrollBarSkin = "";
        // this.MyList.scrollBar.elasticBackTime = 0;//设置橡皮筋回弹时间。单位为毫秒。
        // this.MyList.scrollBar.elasticDistance = 500;//设置橡皮筋极限距离。
        this.MyList.selectHandler = new Laya.Handler(this, this.onSelect_List);
        this.MyList.renderHandler = new Laya.Handler(this, this.updateList);
        this.refreshListData();
    }

    /**
     * 刷新list列表数据,如果需要更新list列表数据，更新此方法即可
     * 有9个皮肤，但是给予10个位置，第一个和最后一个是空位，为了使第二个和倒数第二个能排到中间
     * */
    refreshListData(): void {
        var data: Array<Object> = [];
        for (var m: number = 0; m < 10; m++) {

            // push全部信息
            data.push({

            });
        }
        // 重制array信息列表
        this.MyList.array = data;
        console.log(data);
    }

    /**当前触摸的box监听*/
    onSelect_List(index: number): void {
        // console.log("当前选择的索引：" + index);
    }

    /**信息刷新，只用listData里面的信息进行赋值，不用其他信息进行赋值*/
    updateList(cell, index: number): void {
        // let dataSource = cell.dataSource;
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