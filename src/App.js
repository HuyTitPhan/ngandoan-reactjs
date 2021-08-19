import './App.css';
import Home from '../src/container/home/Home';
import Product from '../src/container/product/Product';
import ProductDetail from '../src/container/productDetail/ProductDetail';
import Detail from '../src/container/detaile2/Detail';
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
            <Route path="/product-detail2" component={Detail} />
            <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
