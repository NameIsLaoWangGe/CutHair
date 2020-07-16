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

        export enum CameraPos {
            move = 'move',
        }
    }
    /**控制游戏的全局变量*/
    export module G {
        /**被剪发型的数量，如果太多则减少创建*/
        export let _haircutNum: number = 0;
        /**当前关卡中的任务顺序集合*/
        export let _taskArr: Array<string> = [];
        /**当前关卡中进行到第几个任务，索引从0开始*/
        export let _taskNum: number = 0;

        export let _posArr: Array<Laya.Vector3> = [new Laya.Vector3(0, 94.56, 0), new Laya.Vector3(0, 94.56, 0),new Laya.Vector3(0,94.56,0)];
    }

}
export default Global;
export let G = Global.G;
export let GEnum = Global.Enum;
