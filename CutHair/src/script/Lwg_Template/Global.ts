/**全局方法,全局变量，每个游戏不一样*/
export module Global {
    /**游戏中用到的枚举*/
    export module Enum {
        /**子弹类型*/
        export enum TaskType {
            yellow = 'yellow',
            bule = 'bule',
            green = 'green',
        }
    }
    /**控制游戏的全局变量*/
    export module G {
        /**子弹发射的数量*/
        export let bulletNum: number = 0;
    }
}
export default Global;
export let G = Global.G;
export let GEnum = Global.Enum;
