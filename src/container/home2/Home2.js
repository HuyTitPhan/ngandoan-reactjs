import React from "react";
import { FTUComponent } from "../../component/FTUComponent";
import LayoutCustom from "../layoutCustom/LayoutCustom";
import { Layout, Menu, Row, Col } from 'antd';
import { HOMEService } from '../../services/home/HomeService'
class Home extends FTUComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            text: '1111',
        }
        this.service = new HOMEService();
    }
    componentDidMount() {
        this.service.loadForm().then(res => {
            console.log("res: ", res);
        });
        this.setState({
            text: '22222'
        })
    }

    onclicklogin = () => {
        window.location.href = '/product-login'
    }

    onclicksignin = () => {
        window.location.href = '/product-sign-in'
    }
    render() {
        return (
            <div>
                <LayoutCustom laybleHeader='home' >
                    <Row>
                        <Col md={6}>
                            <img src="https://hanoicomputercdn.com/media/product/250_60159_laptop_lenovo_ideapad_3_14alc6_82kt004dvn_xam_4.png" />
                            <h3>macbook pro 2021</h3>
                        </Col>

                        <Col md={6}>
                            <img src="https://hanoicomputercdn.com/media/product/250_60159_laptop_lenovo_ideapad_3_14alc6_82kt004dvn_xam_4.png" />
                            <h3>macbook pro 2021</h3>
                        </Col>

                        <Col md={6}>
                            <img src="https://hanoicomputercdn.com/media/product/250_60159_laptop_lenovo_ideapad_3_14alc6_82kt004dvn_xam_4.png" />
                            <h3>macbook pro 2021</h3>
                        </Col>

                        <Col md={6} >
                            <img src="https://hanoicomputercdn.com/media/product/250_60159_laptop_lenovo_ideapad_3_14alc6_82kt004dvn_xam_4.png" />
                            <h3>macbook pro 2021</h3>
                        </Col>
                    </Row>
                </LayoutCustom>

            </div>
        )
    }
}

export default Home;
