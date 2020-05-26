import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
    const user = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !!user && user.uid ? (
                    <RouteComponent {...props} />
                ) : (
                    <Redirect to="login" />
                )
            }
        />
    );
};

export default PrivateRoute;
