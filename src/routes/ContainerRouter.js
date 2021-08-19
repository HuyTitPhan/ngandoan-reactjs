import React from 'react';
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";

function ContainerRouter() {
    return (
        <>
            {routes.map((route, idx) => {
                return route.component ? (
                    <PrivateRoute
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ) : null;
            })}
        </>
    );
}

export default ContainerRouter
