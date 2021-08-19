import {useTranslation} from 'react-i18next';
import React from 'react';
const _ = require('lodash');

export function FTUTrans(props) {
    const {t} = useTranslation(props.ns);
    if (props.vari) {
        return t(props.name, props.vari);
    } else {
        return t(props.name);
    }
}
export const stringNullOrEmpty = (string) => {
    return string === undefined || string === null || string === "" || string === "Invalid date";
};
export class FTUComponent extends React.Component {

    trans(name, vari) {
        let value;
        if (vari) {
            value = this.props.t(name, vari);
        } else {
            value = this.props.t(name);
        }

        return value;
    }

    focusFirstElement = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            return false;
        }
        this.focusEl(element);
    };

    focusInvalidInput = (errors) => {
        const id = Object.keys(errors)[0];
        const element = document.getElementById(id);
        if (element) {
            if (element.tabIndex === -1) {
                this.focusEl(element);
            } else {
                element.focus();
            }
        }
    };

    focusEl = (element) => {
        let listFocus = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        listFocus = _.filter(listFocus, el => !el.disabled && !el.hidden && el.tabIndex !== -1);
        if (listFocus && listFocus.length) {
            listFocus[0].focus();
        }
    };

    focusLater = (id, timeout = 500) => {
        if (stringNullOrEmpty(id)) {
            return;
        }
        setTimeout(() => this.focusInvalidInput({[id]: ''}), timeout);
    };

    formatInput = (str, filter) => {
        if (filter === "number") {
            str = str.toString().trim();
            str = str.replace(/[^0-9]/g, ''); //Loại bỏ ký tự không phải số.
            return str ? (str) : null;
        }
        if (filter.includes("alpha")) {
            // Xóa space
            str = str.replace(/\s+/g, '');
            //Bỏ dấu tiếng Việt.
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            // Combining Diacritical Marks
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng
            str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
            if (filter === "alpha_number")
                //Bỏ ký tự không phải chữ cái và số.
                str = str.replace(/[^0-9a-z_]/gi, '');
            else if (filter === "alpha")
                //Bỏ ký tự không phải chữ cái.
                str = str.replace(/[^a-z]/gi, '');
        }
        return str;
    };

    lpad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    onChangeTxtField = (name, e, filter) => {
        if (!filter && e.target.getAttribute) {
            filter = e.target.getAttribute("filter");
        }
        if (filter)
            e.target.value = this.formatInput(e.target.value, filter);
        this.onChangeValue(this, name, e.target);
    };

    onChangeChkField = (name, e) => {
        this.onChangeValue(this, name, e?.target?.checked ? 1 : 0);
    };

    onChangeNumber = (name, event) => {
        this.onChangeValue(this, name, event);
    };

    onChangeSelect = name => value => {
        this.onChangeValue(this, name, value);
    };

    async onChangeValue(context, name, value) {
        let realValue = "";
        if (!value || typeof value.value === "undefined") {
            if (value === 'null') {
                realValue = "";
            } else {
                realValue = value;
            }
        } else {
            realValue = value.value;
        }

        await context.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: realValue
            },
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
        if (context.props.options) {
            if (context.props.options.dataNew) {
                context.props.options.dataNew = context.state.data;
            }
        }
    }

    onChangeDate = async (name, value) => {
        if (value === undefined || value === "") {
            value = null;
        }
        await this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
        if (this.props.options) {
            if (this.props.options.dataNew) {
                this.props.options.dataNew = this.state.data;
            }
        }
    };

    async onChangeValueCustom(name, object, value, filter) {
        if (value && value.target) {
            if (!filter && value.target.getAttribute) {
                filter = value.target.getAttribute("filter");
            }
            if (filter) {
                value = this.formatInput(value.target.value, filter);
            } else {
                if ("checkbox" === value.target.type) {
                    value = value.target.checked ? "1" : "0";
                } else {
                    value = value.target.value;
                }
            }
        }
        let realValue = "";
        if (!value || typeof value.value === "undefined") {
            if (value === 'null') {
                realValue = "";
            } else {
                realValue = value;
            }
        } else {
            realValue = value.value;
        }
        let objectTmp = _.at(this.state, object)[0];
        objectTmp[name] = realValue;

        await this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [name]: ""
            }
        }));
        if (this.props.options) {
            if (this.props.options.dataNew) {
                this.props.options.dataNew = this.state.data;
            }
        }
    }

    onChangeSelectDetailCustom = async (context, value, option, stateProp, objectName = 'data') => {
        if (option && option.props) {
            await context.setState(prevState => ({
                [objectName]: {
                    ...prevState[objectName],
                    [stateProp]: option.props.ftuitem ? option.props.ftuitem : null
                },
                errors: {
                    ...prevState.errors,
                    [stateProp]: null
                }
            }));
            if (context.props.options) {
                if (context.props.options.dataNew) {
                    context.props.options.dataNew = context.state.data;
                }
            }
        }
    };

    getSelectedData = (dt, data, listKeys) => {
        if (stringNullOrEmpty(listKeys)) {
            listKeys = [];
        } else if (!_.isArray(listKeys)) {
            listKeys = [listKeys];
        }
        let dataSelected = {};
        if (dt && dt.state && dt.processData() && dt.processData().length) {
            const listData = dt.processData();
            if (data && listKeys.length) { // TH thêm bản ghi
                let dataFind = {};
                // eslint-disable-next-line array-callback-return
                listKeys.map(key => {
                    dataFind[key] = data[key];
                });
                const index = _.findIndex(listData, dataFind);
                if (index !== -1) {
                    dataSelected = listData[index];
                    dt.state.first = index - index % dt.state.rows; //set lại trang của table
                } else {
                    dataSelected = listData[0];
                    dt.state.first = 0; //set lại trang của table (nhảy về trang đầu)
                }
            } else { // TH xóa + mặc định khi mở form
                dataSelected = listData[0];
                dt.state.first = 0; //set lại trang của table (nhảy về trang đầu)
            }
        } else if (dt && dt.state) {
            dt.state.first = 0;
        }
        return dataSelected;
    };

    getDataFromAppParam = async (context, service, type, stateName) => {
        service.getAppParam(type).then(async res => {
            await context.setState({
                [stateName]: (res && res.data && res.data.body && res.data.body.lstAppParam) ? res.data.body.lstAppParam : []
            })
        }).catch(e => {
            console.warn("error loading data");
            this.setState({
                [stateName]: []
            })
        })
    };

    _resolveWaitRedux(func) {
        setTimeout(() => {
            if (this.props.user && this.props.user.username && this.props.user.userId) {
                func();
            } else {
                this._resolveWaitRedux(func);
            }
        }, 200);
    }

    waitRedux() {
        return new Promise(resolve => {
            this._resolveWaitRedux(resolve);
        });
    }

    handleDisabledDate = (fieldCmp, funcCmp, current) =>
        current && this.state.data[fieldCmp] && current[funcCmp](this.state.data[fieldCmp], "day");
}
