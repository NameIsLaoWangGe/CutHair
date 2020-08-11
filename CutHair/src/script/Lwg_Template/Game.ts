import { Admin } from "./lwg";

/**游戏中的一些基础数值,例如等级、体力等*/
export module GameControl {
    /**游戏控制开关*/
    export let _gameSwitch: boolean = false;
    /**等级*/
    export let _gameLevel = {
        get value(): number {
            return Laya.LocalStorage.getItem('_gameLevel') !== null ? Number(Laya.LocalStorage.getItem('_gameLevel')) : 1;
        },
        set value(val) {
            Laya.LocalStorage.setItem('_gameLevel', val.toString());
        }
    };

    /**当前实际打开后者停留的关卡数，而非真实的关卡等级*/
    export let _practicalLevel = {
        get value(): number {
            return Laya.LocalStorage.getItem('_practicalLevel') !== null ? Number(Laya.LocalStorage.getItem('_practicalLevel')) : _gameLevel.value;
        },
        set value(val) {
            Laya.LocalStorage.setItem('_practicalLevel', val.toString());
        }
    };

    /**
     * 获取当前关卡的信息
     * @param levelNum 关卡数
    */
    export function getLevelData(levelNum?: number): Array<any> {
        let dataArr: Array<any> = Laya.loader.getRes("GameData/Game/GameLevel.json")['RECORDS'];
        let level;
        let num;
        if (levelNum) {
            num = levelNum;
        } else {
            num = _gameLevel.value;
        }
        for (let index = 0; index < dataArr.length; index++) {
            const element = dataArr[index];
            if (element['name'] === 'level' + num) {
                level = element;
                break;
            }
        }
        if (level) {
            return level;
        } else {
            return dataArr[num - 1];
        }
    }

    /**
     * 获取当前关卡的任务描述数组
     * @param levelNum 关卡数，默认为当前关卡数
    */
    export function getLevelData_Condition(levelNum?: number): Array<any> {
        let level: Object = getLevelData(levelNum ? levelNum : _gameLevel.value);
        let arr0;
        for (const key in level) {
            if (level.hasOwnProperty(key)) {
                if (key === 'condition') {
                    arr0 = level[key];
                }
            }
        }
        if (arr0) {
            return arr0;
        } else {
            console.log('获取关卡描述失败');
        }
    }

    /**关卡属性*/
    export enum gameProperty {
        /**关卡名称，必须有*/
        name = 'name',
        /**过关条件*/
        condition = 'condition',
        /**过关完成状态*/
        resCondition = 'resCondition',
        /**过关奖励类型*/
        rewardType = 'rewardType',
        /**过关奖励数量*/
        rewardNum = 'rewardNum',
    }

    /**奖励类型*/
    export enum rewardType {
        gold = 'gold',
        diamond = 'diamond',
    }

    /**等级的显示节点*/
    export let LevelNode: Laya.Sprite;
    /**
     * 创建一个等级的显示节点
     * @param parent 父节点
     * @param x x位置
     * @param y y位置
     */
    export function _createLevel(parent, x, y): void {
        let sp: Laya.Sprite;
        Laya.loader.load('prefab/LevelNode.json', Laya.Handler.create(this, function (prefab: Laya.Prefab) {
            let _prefab = new Laya.Prefab();
            _prefab.json = prefab;
            sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
            parent.addChild(sp);
            sp.pos(x, y);
            sp.zOrder = 0;
            let level = sp.getChildByName('level') as Laya.Label;
            // level.text = 'NO.' + lwg.Global._gameLevel;
            LevelNode = sp;
        }));
    }

    /**体力*/
    export let _execution = {
        get value(): number {
            return this.val = Laya.LocalStorage.getItem('_execution') !== null ? Number(Laya.LocalStorage.getItem('_execution')) : 15;
        },
        set value(val) {
            this.val = val;
            Laya.LocalStorage.setItem('_execution', val.toString());
        }
    };
    /**游戏进行时候的场景*/
    export class GameScene extends Admin.Scene {
        lwgOnAwake(): void {
            this.initData();
            this.gameOnAwake();
        }
        /**初始化json数据*/
        initData(): void {
        }
        lwgEventReg(): void {
            this.gameEventReg();
        }
        /**任务中注册的一些事件*/
        gameEventReg(): void { }

        /**初始化前执行一次*/
        gameOnAwake(): void { }
        lwgNodeDec(): void {
            this.gameNodeDec();
        }
        /**节点声明*/
        gameNodeDec(): void { }

        lwgOnEnable(): void {
            this.gameOnEnable();
        }
        /**开始后执行*/
        gameOnEnable(): void { }
        lwgOpenAni(): number { return this.gameOpenAin(); }
        /**开场动画*/
        gameOpenAin(): number { return 0; }
        /**按钮点击事件*/
        lwgBtnClick(): void { this.gameBtnClick() }
        gameBtnClick(): void { };

        lwgOnDisable(): void {
            this.gameOnDisable();
        }
        /**页面关闭后执行*/
        gameOnDisable(): void { }
    }
}
export let Game = GameControl;
export let GameScene = GameControl.GameScene;