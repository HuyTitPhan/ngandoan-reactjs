import React from "react";
import {FTUComponent} from "../../component/FTUComponent";
import LayoutCustom from "../layoutCustom/LayoutCustom";
import {HOMEService} from '../../services/home/HomeService'
class Home extends FTUComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            text :'1111',
        }
        this.service= new HOMEService ();
    }
    componentDidMount() {
        this.service.loadForm().then(res => {
           console.log("res: ",res);
        });
    this.setState({
        text:'22222'
    })
    }

    onclicklogin =()=>{
    window.location.href='/product-login'
    }

    onclicksignin =()=>{
        window.location.href='/product-sign-in'
        }
    render() {
        return (
            <div>
            <LayoutCustom laybleHeader = 'home' >
                <div >
                    <label>{this.state.text}</label>
                <button onClick={this.onclicklogin}>Login</button>
                <br></br>
                <button onClick={this.onclicksignin}>Sign In</button>
                </div>
            </LayoutCustom>

            </div>
        )
    }
}

export default Home;
