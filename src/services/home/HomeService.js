import {Utils} from "../common/utils";
import {LOAD_FORM} from "../../constants/AppPath";

export class HOMEService {
    loadForm (){
        return Utils.get(LOAD_FORM, null, null, true);
    }
}
