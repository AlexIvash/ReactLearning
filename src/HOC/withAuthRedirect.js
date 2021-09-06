import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    // isAuth: state.auth.isAuth временно сделаю true, так как функция логина не работает из-за платной подписки
    isAuth: true
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to='/login' />

            return <Component {...this.props} />

        }
    }
    let ConnectedAuthRedirectComponent = connect (mapStateToPropsForRedirect) (RedirectComponent);

return ConnectedAuthRedirectComponent;
}