export default class shake extends Laya.Script {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0
    
    constructor() { super(); }
    
    onEnable(): void {
    }

    onDisable(): void {
    }
}

class Shake extends Laya.EventDispatcher {
    private throushold:any;
		private shakeInterval:any;
		private callback:any;
		private lastX:any;
		private lastY:any;
		private lastZ:any;
		private lastMillSecond:any;

		private static _instance:any;
		static readonly instance: Shake=new Shake();;
    constructor() {
        super();
    }
 
    start(throushold, interval) {
        this.throushold = throushold;
        this.shakeInterval = interval;
        this.lastX = this.lastY = this.lastZ = NaN;
        Accelerator.instance.on(Laya.Event.CHANGE, this, this.onShake);
    }
    stop() {
        Accelerator.instance.off(Laya.Event.CHANGE, this, this.onShake);
    }
    onShake(acceleration, accelerationIncludingGravity, rotationRate, interval) {
        if (isNaN(this.lastX)) {
            this.lastX = accelerationIncludingGravity.x;
            this.lastY = accelerationIncludingGravity.y;
            this.lastZ = accelerationIncludingGravity.z;
            this.lastMillSecond = Laya.ILaya.Browser.now();
            return;
        }
        var deltaX = Math.abs(this.lastX - accelerationIncludingGravity.x);
        var deltaY = Math.abs(this.lastY - accelerationIncludingGravity.y);
        var deltaZ = Math.abs(this.lastZ - accelerationIncludingGravity.z);
        if (this.isShaked(deltaX, deltaY, deltaZ)) {
            var deltaMillSecond = Laya.ILaya.Browser.now() - this.lastMillSecond;
            if (deltaMillSecond > this.shakeInterval) {
                this.event(Laya.Event.CHANGE);
                this.lastMillSecond = Laya.ILaya.Browser.now();
            }
        }
        this.lastX = accelerationIncludingGravity.x;
        this.lastY = accelerationIncludingGravity.y;
        this.lastZ = accelerationIncludingGravity.z;
    }
    isShaked(deltaX, deltaY, deltaZ) {
        return (deltaX > this.throushold && deltaY > this.throushold) ||
            (deltaX > this.throushold && deltaZ > this.throushold) ||
            (deltaY > this.throushold && deltaZ > this.throushold);
    }
}