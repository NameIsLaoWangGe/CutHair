import { lwg } from "../Lwg_Template/lwg";

export default class UIStart extends lwg.Admin.Scene {


    lwgOnEnable(): void {

    }

    onStageClick(): void {
        lwg.Admin._openScene(lwg.Admin.SceneName.UIOperation, null, null, f => {
            this.self.close();
        });
    }
}