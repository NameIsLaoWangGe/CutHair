import { Skin, Shop } from "./lwg";

/**
 * 所有框架中的脚本初始化，以及配置都将在此模块中添加，最终将会在加载界面结束后，开始游戏界面前执行
 * 每个游戏都不一样
 * 与场景模块名称一一对应
*/
export module lwgInit {
    export function init(): void {
        Skin._currentEye.name = null;
        Skin._currentHead.name = null;
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
    export function gameInit(): void {

    }
    /**商店初始化*/
    export function shopInit(): void {

    }
    /**任务始化*/
    export function taskInit(): void {

    }
    /**彩蛋始化*/
    export function easterEggInit(): void {

    }
}