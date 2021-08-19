import {GET_BREADCRUMB, GET_COMMON_USER_INFOR, GET_PROFILE_IMG, PATH_GET_MENU} from 'constants/AppPath';
import {Utils} from 'services/common/utils';
import {APP_CODE} from "../../constants/AppProps";
import {PATH_GET_MENU_HIDDEN} from "../../constants/AppPath";

export const UtilService = {
    getMenu,
    getUserInfor,
    getBreadcrumb,
    getProfileImage,
    getMenuHidden
};

async function getMenu() {
    let pMenu = await Utils.get(PATH_GET_MENU, {"appCode": APP_CODE}, null);
    if (pMenu && pMenu.data && pMenu.data[0] && pMenu.data[0].items) {
        return pMenu.data[0].items;
    }
    return null;
}
async function getMenuHidden() {
    let pMenu = await Utils.get(PATH_GET_MENU_HIDDEN, {"appCode": APP_CODE}, null);
    if (pMenu && pMenu.data ) {
        return pMenu.data;
    }
    return null;
}

async function getUserInfor() {
    let uInfor = await Utils.get(GET_COMMON_USER_INFOR, null, null, true);
    if (uInfor && uInfor.data) {
        return uInfor.data;
    }
    return null;
}

async function getBreadcrumb(data) {
    const rs = await Utils.get(GET_BREADCRUMB, data, null, true);
    return rs?.data?.body || [];
}

async function getProfileImage(data) {
    const rs = await Utils.get(GET_PROFILE_IMG, data);
    return rs?.data?.body || "";
}
