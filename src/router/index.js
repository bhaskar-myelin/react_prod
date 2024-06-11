import React from "react";
import { Route, Redirect, Navigate, Routes } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({
  component: Component,
  isAuthenticated,
  registerLevel,
  isVerified,
  ...rest
}) {
  const activatedRoute = `/login?to=${
    window.location.pathname + encodeURIComponent(window.location.search)
  }`;

  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Navigate
              to={`/login?to=${
                window.location.pathname +
                encodeURIComponent(window.location.search)
              }`}
            />
          )
        }
      />
    </Routes>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token || false,
  };
};

export default connect(mapStateToProps, {})(PrivateRoute);
