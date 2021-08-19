import {lazy} from 'react';

//room
const Home = lazy(() => import('../container/home/Home'));
const Product = lazy(() => import('../container/product/Product'));
const ProductDetail = lazy(() => import('../container/productDetail/ProductDetail'));

const routes = [
    //room
    {path: '/home', exact: true, name: 'Home', component: Home},
    {path: '/product', exact: true, name: 'Product', component: Product},
    {path: '/product-detail', exact: true, name: 'ProductDetail', component: ProductDetail},
];

export default routes;
