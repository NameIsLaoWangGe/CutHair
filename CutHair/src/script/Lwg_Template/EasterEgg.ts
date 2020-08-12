import { Admin, Tools } from "./lwg";
/**对游戏总的一些彩蛋进行管理*/
export module EasterEgg {
    /**所有彩蛋集合*/
    export let easterEggArr: Array<any> = [];

    /**初始化彩蛋模块*/
    export function easterEggInit(): void {
        easterEggArr = Tools.dataCompare("GameData/EasterEgg/EasterEgg.json", EasterEggClass.EasterEgg, EasterEggProperty.name);
    }

    /**
      * 通过彩蛋名称或者描述获取当前某个彩蛋的所有信息
      * @param describe 第几个彩蛋
       */
    export function getSingleData(describe: string): any {
        let obj;
        for (let index = 0; index < easterEggArr.length; index++) {
            if (easterEggArr[index]['describe'] === describe) {
                obj = easterEggArr[index];
            }
        }
        if (obj) {
            return obj;
        } else {
            console.log('获取彩蛋信息失败！');
        }
    }

    /**
     * 获取一个彩蛋中的某个属性信息
     * @param className 彩蛋种类
     * @param describe 彩蛋描述
     * @param property 属性名
     * */
    export function getProperty(className: string, describe: string, property: string): any {
        let obj = getSingleData(describe);
        let arr;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === property) {
                    arr = obj[key]
                }
            }
        }
        if (arr) {
            return arr;
        } else {
            console.log('获取属性失败！');
        }
    }

    /**
     * 设置某个彩蛋的某个属性，并且返回这个值
     * @param className 彩蛋种类
     * @param describe 彩蛋描述
     * @param property 彩蛋属性
     * @param value 属性值
    */
    export function setProperty(className: string, describe: string, property: string, value: any): void {
        let obj = getSingleData(describe);
        if (!obj) {
            console.log('设置属性值失败！');
            return;
        }
        let arr;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key === property) {
                    obj[key] = value;
                }
            }
        }
        let data = {};
        data[className] = arr;
        Laya.LocalStorage.setJSON(className, JSON.stringify(data));
    }

    /**
     * 通过resCondition/condition，检测彩蛋任务完成的总进度,并且设置成完成状态,返回0表示任务没有完成，1代表完成
     * @param describe 彩蛋描述
     * @param conditionNum condition的那个部分，conditionNum为数组下标
     * */
    export function doDetection(className: string, describe: string, conditionNum: number): number {
        let resCondition = getProperty(className, describe, EasterEggProperty.resCondition);
        resCondition[conditionNum] = 1;
        setProperty(className, describe, EasterEggProperty.resCondition, resCondition);
        let num;
        for (let index = 0; index < resCondition.length; index++) {
            const element = resCondition[index];
            if (element === 1) {
                num++;
            }
        }
        if (!num) {
            console.log('任务完成错误！');
        }
        if (num >= resCondition.length) {
            return 1;
        } else {
            return 0;
        }
    }

    /**奖励类型*/
    export enum rewardType {
        gold = 'gold',
        diamond = 'diamond',
        /**部件*/
        assembly = 'assembly',
    }

    /**
     * 彩蛋中通用属性
     */
    export enum EasterEggProperty {
        /**名称*/
        name = 'name',
        /**彩蛋描述*/
        describe = 'describe',
        /**需要完成任务的总数*/
        condition = 'condition',
        /**根据获取途径，剩余需要条件的数量，会平凡改这个数量*/
        resCondition = 'resCondition',
        /**奖励类型*/
        rewardType = 'rewardType',
        /**奖励数量*/
        rewardNum = 'rewardNum',
        /**奖励领取状况*/
        getReward = 'getReward',
    }

    /**彩蛋列表种类*/
    export enum EasterEggClass {
        EasterEgg = 'EasterEgg',
    }


    /**彩蛋场景继承类*/
    export class EasterEggScene extends Admin.Scene {
        lwgOnAwake(): void {
            this.initData();
            this.easterEggOnAwake();
        }
        /**初始化json数据*/
        initData(): void {
        }
        lwgEventReg(): void {
            this.easterEggEventReg();
        }
        /**任务中注册的一些事件*/
        easterEggEventReg(): void { }

        /**初始化前执行一次*/
        easterEggOnAwake(): void { }
        lwgNodeDec(): void {
            this.easterEggNodeDec();
        }
        /**节点声明*/
        easterEggNodeDec(): void { }

        lwgOnEnable(): void {
            this.easterEggOnEnable();
        }
        /**开始后执行*/
        easterEggOnEnable(): void { }
        lwgOpenAni(): number { return this.easterEggOpenAin(); }
        /**开场动画*/
        easterEggOpenAin(): number { return 0; }
        /**按钮点击事件*/
        lwgBtnClick(): void { this.easterEggBtnClick() }
        easterEggBtnClick(): void { };

        lwgOnDisable(): void {
            this.easterEggOnDisable();
        }
        /**页面关闭后执行*/
        easterEggOnDisable(): void { }
    }
}