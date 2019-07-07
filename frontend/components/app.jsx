import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import Protected from './protected';
import { AuthRoute, ProtectedRoute } from "../util/route_util";

// ??? study this shit

export default () => (
    <div>
        <Switch>
            <AuthRoute exact path="/login" component={LoginContainer} />
            <AuthRoute exact path="/signup" component={SignupContainer} />
            <AuthRoute path="/" component={SignupContainer} />
            <Redirect to="/signup" />
        </Switch>
        <ProtectedRoute path="/:workspaceId" component={Protected} />
    </div>
);