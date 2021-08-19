import React from "react";
import {ModalFooter} from "reactstrap";
import {Modal} from 'antd';
import {FTUTrans} from "./FTUComponent";
import {Button} from "primereact/button";

export let showMessageBox = async function (
    _message,
    _title = <FTUTrans ns="common" name="msg.title"/>,
    _func
) {
    await this.setState({
        visible: true,
        modalClassName: "",
        showConfirmBtn: false,
        showIgnoreBtn: false,
        title: _title,
        message: _message,
        onClose: _func
    });
}

export let hideMessageBox = function () {
    if (this.state.visible) {
        this.setState({visible: false})
    }
}

export let showWarningBox = async function (
    _message,
    _title = <FTUTrans ns="common" name="msg.title"/>,
    _func
) {
    await this.setState({
        visible: true,
        modalClassName: "modal-warning",
        showConfirmBtn: false,
        showIgnoreBtn: false,
        title: _title,
        message: _message,
        onClose: _func
    });
}

export let showErrorBox = async function (
    _message,
    _title = <FTUTrans ns="common" name="msg.title"/>,
    _func
) {
    await this.setState({
        visible: true,
        modalClassName: "modal-danger",
        showConfirmBtn: false,
        showIgnoreBtn: false,
        title: _title,
        message: _message,
        onClose: _func
    });
}

export let showConfirm = async function (
    _message,
    _onConfirm,
    _title = <FTUTrans ns="common" name="msg.confirm"/>,
    _onClose,
    msgbtnYes = <FTUTrans ns="common" name="msg.btnYes"/>,
    msgbtnNo = <FTUTrans ns="common" name="msg.btnNo"/>
) {
    await this.setState({
        visible: true,
        modalClassName: "",
        showConfirmBtn: true,
        showIgnoreBtn: false,
        title: _title,
        message: _message,
        onConfirm: _onConfirm,
        onClose: _onClose,
        msgbtnYes: msgbtnYes,
        msgbtnNo: msgbtnNo
    });
}

export let showConfirmIgnore = async function (
    _message,
    _onConfirm,
    _onClose,
    _title = <FTUTrans ns="common" name="msg.confirm"/>,
    msgbtnYes = <FTUTrans ns="common" name="msg.btnYes"/>,
    msgbtnNo = <FTUTrans ns="common" name="msg.btnNo"/>,
    onIgnore,
) {
    await this.setState({
        visible: true,
        modalClassName: "",
        showConfirmBtn: true,
        showIgnoreBtn: true,
        title: _title,
        message: _message,
        onConfirm: _onConfirm,
        onClose: _onClose,
        msgbtnYes: msgbtnYes,
        msgbtnNo: msgbtnNo,
        onIgnore: onIgnore,
    });
}

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showConfirmBtn: false,
            showIgnoreBtn: false,
            msgbtnYes: <FTUTrans ns="common" name="button.btnYes"/>,
            msgbtnNo: <FTUTrans ns="common" name="button.btnNo"/>
        };
        showMessageBox = showMessageBox.bind(this);
        hideMessageBox = hideMessageBox.bind(this);
        showErrorBox = showErrorBox.bind(this);
        showWarningBox = showWarningBox.bind(this);
        showConfirm = showConfirm.bind(this);
        showConfirmIgnore = showConfirmIgnore.bind(this);
    }

    onClose = () => {
        this.setState({visible: false});
        if (this.state.onClose) {
            this.state.onClose();
        }
    };

    onConfirm = () => {
        this.setState({visible: !this.state.visible});
        this.state.onConfirm();
    };

    onIgnore = () => {
        this.setState({visible: false});
        if (!this.state.showIgnoreBtn && this.state.showConfirmBtn && this.state.onClose) {
            this.state.onClose();
        } else if (this.state.onIgnore) {
            this.state.onIgnore();
        } else if (!this.state.showIgnoreBtn && this.state.onClose) {
            this.state.onClose();
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.visible && !prevState.visible) {
            this.activeEl = document.activeElement;
            setTimeout(() => {
                (document.getElementById("btnConfirmYes") || document.getElementById("btnCloseMessage"))?.focus();
            }, 0);
        } else if (!this.state.visible && prevState.visible) {
            this.activeEl?.focus();
        }
    }

    render() {
        return (
            <div>
                <Modal style={{width: "30%"}} bodyStyle={{padding: 0}} centered
                       footer={null} closable maskClosable={false}
                       id={"messageBox"} destroyOnClose
                       visible={this.state.visible} maskTransitionName={""}
                       onCancel={this.onIgnore} title={this.state.title}
                       className={this.state.modalClassName}>
                    <p style={{wordBreak: "break-word", whiteSpace: "pre-wrap", margin: 0, padding: 10}}>
                        {this.state.message}
                    </p>
                    <ModalFooter>
                        {
                            this.state.showConfirmBtn ?
                                <Button id={"btnConfirmYes"} onClick={this.onConfirm}>
                                    {this.state.msgbtnYes}
                                </Button> : <></>
                        }
                        <Button onClick={this.onClose}
                                hidden={!this.state.showConfirmBtn}>
                            {this.state.msgbtnNo}
                        </Button>
                        <Button id={"btnCloseMessage"}
                                onClick={this.onClose}
                                hidden={this.state.showConfirmBtn}>
                            {<FTUTrans ns="common" name="button.btnClose"/>}
                        </Button>
                        <Button id={"btnIgnore"}
                                onClick={this.onIgnore}
                                hidden={!this.state.showIgnoreBtn}>
                            {<FTUTrans ns="common" name="button.btnIgnore"/>}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default (MessageBox);
