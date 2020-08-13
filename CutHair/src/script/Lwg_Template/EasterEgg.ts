import { Admin, Tools } from "./lwg";
/**对游戏总的一些彩蛋进行管理*/
export module EasterEgg {
    /**彩蛋1任务集合*/
    export let _easterEgg_1Arr: Array<any> = [];

    /**彩蛋1是否已经被触发*/
    export let _easterEgg_1 = {
        get value(): boolean {
            if (Laya.LocalStorage.getItem('_easterEgg_01') == null) {
                return false;
            } else {
                return true;
            }
        },
        set value(val: boolean) {
            Laya.LocalStorage.setItem('_easterEgg_01', val.toString());
        }
    };
    /**彩蛋1是否达成*/
    export let _easterEgg_1Complete: boolean;

    /**初始化彩蛋模块*/
    export function initEasterEgg(): void {
        _easterEgg_1Arr = Tools.dataCompare("GameData/EasterEgg/EasterEgg.json", Classify.EasterEgg_01, Property.name);
    }

    /**
     * 获取一个彩蛋中的某个属性信息
     * @param className 彩蛋种类
     * @param name 某个任务名称
     * @param property 属性名
     * */
    export function getProperty(classify: string, name: string, property: string): any {
        let pro = null;
        let arr = getClassify(classify);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element['name'] === name) {
                pro = element[property];
                break;
            }
        }
        if (pro !== null) {
            return pro;
        } else {
            console.log(name + '找不到属性:' + property, pro);
            return null;
        }
    }

    /**
     * 设置某个彩蛋的某个属性，并且返回这个值
     * @param classify 彩蛋种类
     * @param name 彩蛋中某个任务名称
     * @param property 彩蛋属性
     * @param value 属性值
    */
    export function setProperty(classify: string, name: string, property: string, value: any): void {
        let arr = getClassify(classify);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element['name'] === name) {
                element[property] = value;
                break;
            }
        }
        let data = {};
        data[classify] = arr;
        Laya.LocalStorage.setJSON(classify, JSON.stringify(data));
    }

    /**
     * 通过名称获取任务的一个属性值
     * @param ClassName 任务类型名称
     * @param name 任务名称
     * @param property 任务属性
     * */
    export function getTaskProperty(classify: string, name: string, property: string): any {
        let pro = null;
        let arr = getClassify(classify);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element['name'] === name) {
                pro = element[property];
                break;
            }
        }
        if (pro !== null) {
            return pro;
        } else {
            console.log(name + '找不到属性:' + property, pro);
            return null;
        }
    }

    /**根据彩蛋类型返回一个彩蛋的所有任务*/
    export function getClassify(classify: string): Array<any> {
        let arr = [];
        switch (classify) {
            case Classify.EasterEgg_01:
                arr = _easterEgg_1Arr;
                break;
            default:
                break;
        }
        return arr;
    }

    /** 
     * 通过resCondition/condition，做任务并且完成了这次任务，然后检总进度是否完成,返回是否完成
    * @param classify 任务种类
    * @param name 任务名称
    * @param number 做几次任务，不传则默认为0次，不传则是检测完成状况
    */
    export function doDetection(classify: string, name: string, number?: number): number {
        if (!number) {
            number = 0;
        }
        let resCondition = getProperty(classify, name, Property.resCondition);
        let condition = getProperty(classify, name, Property.condition);
        if (!getProperty(classify, name, Property.complete)) {
            if (condition <= resCondition + number) {
                setProperty(classify, name, Property.resCondition, condition);
                setProperty(classify, name, Property.complete, true);
                return 1;
            } else {
                setProperty(classify, name, Property.resCondition, resCondition + number);

                return 0;
            }
        } else {
            return 1;
        }
    }

    /**
     * 检测所有彩蛋任务是否完成,完成则返回1，没有完成则返回0
     * @param classify 哪一个彩蛋
     * */
    export function detectAllTasks(classify: string): number {
        let num = 1;
        let arr = getClassify(classify);
        for (const key in arr) {
            if (arr.hasOwnProperty(key)) {
                const element = arr[key];
                let resCondition = getProperty(classify, name, Property.resCondition);
                let condition = getProperty(classify, name, Property.condition);
                if (condition > resCondition) {
                    num = 0;
                }
            }
        }
        return num;
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
    export enum Property {
        /**名称*/
        name = 'name',
        /**彩蛋描述*/
        explain = 'explain',
        /**需要完成任务的总数*/
        condition = 'condition',
        /**根据获取途径，剩余需要条件的数量，会平凡改这个数量*/
        resCondition = 'resCondition',
        /**是否完成*/
        complete = 'complete',
    }

    /**彩蛋列表种类*/
    export enum Classify {
        EasterEgg_01 = 'EasterEgg_01',
    }

    /**彩蛋名称*/
    export enum Name {
        easterEgg_1 = 'easterEgg_1',
        easterEgg_2 = 'easterEgg_2',
        easterEgg_3 = 'easterEgg_3',
        easterEgg_4 = 'easterEgg_4',
        easterEgg_5 = 'easterEgg_5',
    }

    /**彩蛋模块事件类型*/
    export enum EventType {
        /**触发彩蛋*/
        trigger = 'trigger',
    }

    /**彩蛋场景继承类*/
    export class EasterEggScene extends Admin.Scene {
        lwgOnAwake(): void {
            this.easterEggInitData();
            this.easterEggOnAwake();
        }
        /**初始化json数据*/
        easterEggInitData(): void {
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