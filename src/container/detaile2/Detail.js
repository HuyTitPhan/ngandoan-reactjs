import React from "react";
import {FTUComponent} from "../../component/FTUComponent";
import 'antd/dist/antd.css';
import {Layout, Menu, Row,Col} from 'antd';
import LayoutCustom from "../layoutCustom/LayoutCustom";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Detail extends FTUComponent {
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
        this.setState({collapsed});
    };

    render() {
        return (
            <div>
                <LayoutCustom laybleHeader = 'home/product' >
                    <div >
                        detail 2
                        <Row>
                            <Col md={3} style={{background:'blue',height:'10px'}}>

                            </Col>
                            <Col md={3} style={{background:'red'}}>

                            </Col>
                        </Row>
                    </div>
                </LayoutCustom>
            </div>
        )
    }
}

export default Detail;
