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
            cameraMove = 'cameraMove',
        }
    }

    /**控制游戏的全局变量*/
    export module GVariate {
        /**第一个任务名称，方便找到开始游戏时候的位置*/
        export let _firstTask: string = null;
        /**点击屏幕的开关*/
        export let _stageClick: boolean = false;
        /**当前关卡中的任务顺序集合*/
        export let _taskArr: Array<string> = [];
        /**进行到第几个任务了*/
        export let _taskNum: number = 0;
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
        export let knifeParent: Laya.MeshSprite3D;
        export let knife: Laya.MeshSprite3D;
        export let knifeParentFPos: Laya.Vector3 = new Laya.Vector3();
        export let knifeParentFEulerY: number;

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
        export let HingeMiddle: Laya.MeshSprite3D;
        export let HingeUp: Laya.MeshSprite3D;
        export let HingeDown: Laya.MeshSprite3D;

        /**头部操作范围*/
        export let HeadSimulate: Laya.MeshSprite3D;


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
export let GSene3D = Global.GSene3D;



