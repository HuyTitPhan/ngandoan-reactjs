import React from 'react';
import {Redirect, Route} from 'react-router-dom';
//import {AuthenticationService} from "../services/access/AuthenticationService";

const PrivateRoute = ({component: Component, ...rest}) => {

    // Add your own authentication on the below line.
    //const isLoggedIn = AuthenticationService.isLogin()
    return (
        <Route
            {...rest}
            render={
                <Redirect to={{pathname: '/home'}}/>
                // props =>
                /*isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )*/
            }
        />
    )
}

export default PrivateRoute
