import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getSignInAccount } from '../actions';

import DefaultLayout from "../pages/_layouts/default";
import AuthLayout from "../pages/_layouts/auth";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector(getSignInAccount);

  useEffect(() => {
    document.title = `${rest.title || 'Title'}`;
  })

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !signed) {
    return <Redirect to="/signin" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && signed) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? AuthLayout : DefaultLayout;

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return (
    <Route
      {...rest}
      render={ (props) => (
        <Layout title={rest.title|| 'Title'} >
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false
};
