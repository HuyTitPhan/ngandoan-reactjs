import React from "react";
import { FTUComponent } from "../../component/FTUComponent";
import 'antd/dist/antd.css';
import { Layout, Menu, Row, Col } from 'antd';
import LayoutCustom from "../layoutCustom/LayoutCustom";
import './style.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SignIn extends FTUComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    componentDidMount() {
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <div>
                <LayoutCustom laybleHeader='home/product' >
                    <div >
                        <form >
                            <label htmlFor="email">Id</label>
                            <input name="email" type="text" placeholder="id" />
                            <label htmlFor="email">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                            <button type="submit" >
                                Login
                            </button>
                        </form>
                    </div>
                </LayoutCustom>
            </div>
        )
    }
}

export default SignIn;
