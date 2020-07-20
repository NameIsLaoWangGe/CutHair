/**全局方法,全局变量，每个游戏不一样*/
export module Global {
    /**游戏中用到的枚举*/
    export module Enum {
        /**任务类型*/
        export enum TaskType {
            topHead = 'topHead',
            sideHair = 'sideHair',
            leftBeard = 'leftBeard',
            rightBeard = 'rightBeard',
        }

        /**剃须刀的状态*/
        export enum RazorState {
            move = 'move',
        }
    }
    /**控制游戏的全局变量*/
    export module GVariate {

        export let _gameLevel: number = 1;
        export let _execution: number = 10;
        export let _goldNum: number = 10;
        /**被剪发型的数量，如果太多则减少创建*/
        export let _haircutNum: number = 0;
        /**当前关卡中的任务顺序集合*/
        export let _taskArr: Array<string> = [];
        /**当前关卡中进行到第几个任务，索引从0开始*/
        export let _taskNum: number = 0;
    }

    /**本地信息存储*/
    export module GData {
        let storageData: any;
        /**上传本地数据到缓存,一般在游戏胜利后和购买皮肤后上传*/
        export function addData(): void {
            storageData = {
                '_gameLevel': GVariate._gameLevel,
                '_execution': GVariate._execution,
                '_goldNum': GVariate._goldNum,
            }
            // 转换成字符串上传
            let data: string = JSON.stringify(storageData);
            Laya.LocalStorage.setJSON('storageData', data);
        }

        /**获取本地数据，在onlode场景获取*/
        export function getData(): any {
            let storageData: string = Laya.LocalStorage.getJSON('storageData');
            if (storageData) {
                // 将字符串转换成json
                let data: any = JSON.parse(storageData);
                return data;
            } else {
                // 如果没有获取到则第一次上传的默认值
                GVariate._gameLevel = 1;
                GVariate._execution = 20;
                GVariate._goldNum = 0;
                return null;
            }
        }

        /**清除本地数据*/
        export function clearData(): void {
            Laya.LocalStorage.clear();
        }
    }
}
export default Global;
export let GVariate = Global.GVariate;
export let GEnum = Global.Enum;
export let GData = Global.GData;

