import React from "react";
import {FTUComponent} from "../../component/FTUComponent";
import 'antd/dist/antd.css';
import './LayoutCustom.scss';
import {Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class LayoutCustom extends FTUComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    componentDidMount() {
    }

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        const {children,laybleHeader,
            ...props
        } = this.props;
        return (
            // eslint-disable-next-line react/jsx-no-undef
            <div>

                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined/>}>
                                Option 1
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined/>}>
                                Option 2
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                                <Menu.Item key="3">Tom</Menu.Item>
                                <Menu.Item key="4">Bill</Menu.Item>
                                <Menu.Item key="5">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                                <Menu.Item key="6">Team 1</Menu.Item>
                                <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined/>}>
                                Files
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{padding: 0}}/>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                {laybleHeader}
                            </Breadcrumb>
                            <div className="site-layout-background" style={{padding: 24, minHeight: 360}} {...props}>
                                {children}
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>

                            @Subject: Phát triển phần mềm hướng dịch vụ , instructors: Nguyễn Thị Mỹ Bình
                            <br/>
                            @Created by Trần Khương Duy, Phan Văn Huy
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default LayoutCustom;
