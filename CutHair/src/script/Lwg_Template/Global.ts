import { EventAdmin } from "./lwg";

/**全局方法,全局变量，每个游戏不一样*/
export module Global {
    /**游戏中用到的枚举*/
    export module GEnum {
        /**任务类型*/
        export enum TaskType {
            sideHair = 'sideHair',
            leftBeard = 'leftBeard',
            rightBeard = 'rightBeard',
            middleBeard = 'middleBeard',
            upLeftBeard = 'upLeftBeard',
            upRightBeard = 'upRightBeard',
        }

        /**剃须刀的状态*/
        export enum RazorState {
            move = 'move',
        }

        /**事件*/
        export enum EventType {
            leftBeard = 'leftBeard',
            rightBeard = 'rightBeard',
            middleBeard = 'middleBeard',
            upLeftBeard = 'upLeftBeard',
            upRightBeard = 'upRightBeard',
            taskProgress = 'taskProgress',
        }
    }
    /**控制游戏的全局变量*/
    export module GVariate {
        export let _gameLevel: number = 1;
        export let _execution: number = 10;
        export let _goldNum: number = 10;
        /**当前关卡中的任务顺序集合*/
        export let _taskArr: Array<string> = [];
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

    /**3D场景中节点的一些引用，方便在2D场景中直接操作,Vector3可以初始化，其他不可以，因为当前脚本中没有Scrip3D，需要在3D脚本中声明*/
    export module GSene3D {
        /**当前3D主场景*/
        export let GameMain3D: Laya.Scene3D;
        /**场景摄像机的父节点*/
        export let MainCamera: Laya.MeshSprite3D;
        /**剃刀*/
        export let Razor: Laya.MeshSprite3D;
        export let razorFPos: Laya.Vector3 = new Laya.Vector3();
        export let razorFEulerY: number;

        /**刮脸的刮刀*/
        export let knife: Laya.MeshSprite3D;
        export let knifeFPos: Laya.Vector3 = new Laya.Vector3();
        export let knifeFEulerY: number;

        /**头*/
        export let Head: Laya.MeshSprite3D;
        export let headFPos: Laya.Vector3 = new Laya.Vector3();
        export let headFEulerY: number;
        /**毛发的父节点*/
        export let HairParent: Laya.MeshSprite3D;
        export let RightBeard: Laya.MeshSprite3D;
        export let LeftBeard: Laya.MeshSprite3D;
        export let MiddleBeard: Laya.MeshSprite3D;
        export let UpRightBeard: Laya.MeshSprite3D;
        export let UpLeftBeard: Laya.MeshSprite3D;

        /**当前关卡节点*/
        export let LevelTem: Laya.MeshSprite3D;
        export let Level: Laya.MeshSprite3D;
        export let LevelFpos: Laya.Vector3 = new Laya.Vector3();;

        /**地板*/
        export let Floor: Laya.MeshSprite3D;

        /**头部碰撞框*/
        export let Headcollision: Laya.MeshSprite3D;
        export let HingeMiddle:Laya.MeshSprite3D; 
        export let HingeUp:Laya.MeshSprite3D; 
        export let HingeDown:Laya.MeshSprite3D; 

        /**头部操作范围*/
        export let HeadSimulate: Laya.MeshSprite3D;
        export let HingeMiddle_H:Laya.MeshSprite3D; 
        export let HingeUp_H:Laya.MeshSprite3D; 
        export let HingeDown_H:Laya.MeshSprite3D; 

        /**标记摄像机移动到任务的方位*/
        export let Landmark_Left: Laya.MeshSprite3D;
        export let Landmark_Right: Laya.MeshSprite3D;
        export let Landmark_Side: Laya.MeshSprite3D;
        export let Landmark_Middle: Laya.MeshSprite3D;
        export let Landmark_UpLeft: Laya.MeshSprite3D;
        export let Landmark_UpRight: Laya.MeshSprite3D;

        /**触摸屏，用于移动剃刀，坐标必须和头部碰撞体一样,方向和摄像机一样*/
        export let TouchScreen: Laya.MeshSprite3D;

        /**标记刮刀的位置的一些节点*/
        export let LeftSignknife: Laya.MeshSprite3D;
        export let MiddleSignknife: Laya.MeshSprite3D;
        export let RightSignknife: Laya.MeshSprite3D;
        export let UpRightKnife: Laya.MeshSprite3D;
        export let UpLeftKnife: Laya.MeshSprite3D;

    }
}
export default Global;
export let GVariate = Global.GVariate;
export let GEnum = Global.GEnum;
export let GData = Global.GData;
export let GSene3D = Global.GSene3D;



