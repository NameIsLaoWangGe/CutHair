import { Skin, Shop, Task, Admin } from "./lwg";
import { EasterEgg } from "./EasterEgg";

export default class Init extends Admin.Scene {
    onEnable(): void {
        console.log('开始初始化');
        this.gameInit();
        this.skinInit();
        this.shopInit();
        this.taskInit();
        this.easterEggInit();
    }
    gameInit(): void { };
    skinInit(): void {
        Skin._currentEye.name = null;
        Skin._currentHead.name = null;
    }
    /**商店初始化*/
    shopInit(): void {
        Shop.initShop();
        if (!Shop._currentOther.name) {
            Shop._currentOther.name = 'tixudao';
        }
        if (!Shop._currentProp.name) {
            Shop._currentProp.name = 'jiandao';
        }
        if (!Shop._currentSkin.name) {
            Shop._currentSkin.name = 'anquanmao';
        }
    }
    /**任务始化*/
    taskInit(): void {
        Task.initTask();
    }
    /**彩蛋始化*/
    easterEggInit(): void {
        EasterEgg.initEasterEgg();
    }
    onDisable(): void {
    }
}