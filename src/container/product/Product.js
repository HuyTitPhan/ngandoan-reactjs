import React from "react";
import {FTUComponent} from "../../component/FTUComponent";

import Home from '../home/Home'
import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Product extends FTUComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
    }
    onclick = ()=>{
        window.location.href = "/product-detail"
    }
    render() {
        return (
            <div>
            <Home>
                qưeqw
            </Home>
            </div>
        )}
}
export default Product;
