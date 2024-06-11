import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Switch, useHistory } from "react-router-dom";
import AuthContainer from "../container/auth";
import DashboardContainer from "../container/dashboard";
// import { loadUser } from "../redux/actions/auth";
import { CONSTANTS } from "../utils/constants";
import { queryParamsToObject } from "../utils/handlers";
import PrivateRoute from "./index";

const Router = ({
  isAuthenticated,
  // loadUser
}) => {
  const history = useHistory();
  const [redirectToReferrer, setRedirection] = useState(
    history.location.search
  );

  // useEffect(() => {
  //   loadUser(() => {});
  // }, [loadUser]);

  useEffect(() => {
    if (isAuthenticated && redirectToReferrer) {
      history.push(
        redirectToReferrer.to || `/${CONSTANTS.routeType.dashboard}`
      );
    }
  }, [isAuthenticated, redirectToReferrer]);

  useEffect(() => {
    if (history.location.search) {
      let queryP = queryParamsToObject(history.location.search);
      setRedirection(queryP);
    }
  }, [history.location.search]);

  return (
    <Switch>
      {/* <PrivateRoute path={`/:routeType(${CONSTANTS.routeType.dashboard})/:scripId/:childRoute(${Object.values(CONSTANTS.childRoutes).join("|")})`} component={DashboardContainer} /> */}
      <PrivateRoute
        path={`/:routeType(${[
          CONSTANTS.routeType.dashboard,
          CONSTANTS.routeType.report,
          CONSTANTS.routeType.analytics,
        ].join("|")})`}
        component={DashboardContainer}
      />
      <PrivateRoute
        path={`/:routeType(${[CONSTANTS.routeType.report].join("|")})/:id`}
        component={DashboardContainer}
      />
      {!isAuthenticated && (
        <Route
          path="/:routeType(login|forgot-password)"
          component={AuthContainer}
        />
      )}
      <Navigate to={`/${CONSTANTS.routeType.dashboard}`} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token || false,
  };
};

export default connect(
  mapStateToProps
  // { loadUser }
)(Router);
