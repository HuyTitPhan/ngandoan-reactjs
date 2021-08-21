import './App.css';
import Home from '../src/container/home/Home';
import Product from '../src/container/product/Product';
import ProductDetail from '../src/container/productDetail/ProductDetail';
import Login from './container/login/login';
import SignIn from './container/signin/SignIn';
import Home2 from './container/home2/Home2';
import { Route, Switch } from 'react-router-dom';
import React from 'react'
import ContainerRouter from "./routes/ContainerRouter";
function App() {
  return (
    <div>
        {/*<ContainerRouter/>*/}
        <Switch>
            <Route exact path="/" component={Home}  />
            <Route path="/product" component={Product} />
            <Route path="/product-detail" component={ProductDetail} />
            <Route path="/product-login" component={Login} />
            <Route path="/product-sign-in" component={SignIn} />
            <Route path="/home" component={Home2} />
            <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
