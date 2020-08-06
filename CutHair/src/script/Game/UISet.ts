import { lwg, Click, Setting } from "../Lwg_Template/lwg";

export default class UISet extends lwg.Admin.Scene {
    lwgOnAwake(): void {
        this.audioOnOff();
        this.bgmOnOff();
    }


    /**音效*/
    audioOnOff(): void {
        console.log(Setting._sound.switch);
        if (Setting._sound.switch) {
            this.self['AudioOff'].visible = false;
        } else {
            this.self['AudioOff'].visible = true;
        }
    }

    /**背景音乐*/
    bgmOnOff(): void {
        console.log(Setting._bgMusic.switch);
        if (Setting._bgMusic.switch) {
            this.self['BgmOff'].visible = false;
        } else {
            this.self['BgmOff'].visible = true;
        }
    }

    lwgBtnClick(): void {
        Click.on(Click.Type.largen, this.self['BtnAudio'], this, null, null, this.btnAudioUp, null);
        Click.on(Click.Type.largen, this.self['BtnBgm'], this, null, null, this.btnBgmUp, null);
        Click.on(Click.Type.largen, this.self['BtnClose'], this, null, null, this.btnCloseUp, null);
    }

    btnAudioUp(): void {
        if (Setting._sound.switch) {
            Setting._sound.switch = false;
        } else {
            Setting._sound.switch = true;
        }
        this.audioOnOff();
    }
    btnBgmUp(): void {
        if (Setting._bgMusic.switch) {
            Setting._bgMusic.switch = false;
        } else {
            Setting._bgMusic.switch = true;
        }
        this.bgmOnOff();
    }

    btnCloseUp(): void {
        this.self.close();
    }

}