import UILoding from "./UILoding";

export class SubpackController {
    pkgFlag: number;
    completeFunc: Function;
    pkgInfo = [
        { name: "sp1", root: "res" },
        { name: "sp2", root: "3DScene" },
        { name: "sp3", root: "3DPrefab" },
    ];
    init(_completeFunc) {
        this.completeFunc = _completeFunc;
        this.pkgFlag = 0;
        if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
            this.loadPkg_wx();
        } else if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.VIVO_AppRt) {
            this.loadPkg_VIVO();
        } else {
            this.completeFunc();
        }
    }
    loadPkg_VIVO() {
        if (this.pkgFlag == this.pkgInfo.length) {
            if (this.completeFunc) {
                this.completeFunc();
            }
        } else {
            let info = this.pkgInfo[this.pkgFlag];
            let name = info.name;
            Laya.Browser.window.qg.loadSubpackage({
                name: name,
                success: (res) => {
                    this.pkgFlag++;
                    this.loadPkg_VIVO();
                },
                fail: (res) => {
                    console.error(`load ${name} err: `, res);
                },
            })
        }
    }

    loadPkg_wx() {
        if (this.pkgFlag == this.pkgInfo.length) {
            if (this.completeFunc) {
                this.completeFunc();
            }
        } else {
            let info = this.pkgInfo[this.pkgFlag];
            let name = info.name;
            let root = info.root;
            Laya.Browser.window.wx.loadSubpackage({
                name: name,
                success: (res) => {
                    console.log(`load ${name} suc`);
                    Laya.MiniAdpter.subNativeFiles[name] = root;
                    Laya.MiniAdpter.nativefiles.push(root);
                    this.pkgFlag++;
                    console.log("加载次数", this.pkgFlag);
                    this.loadPkg_wx();
                },
                fail: (res) => {
                    console.error(`load ${name} err: `, res);
                },
            });
        }
    }
}