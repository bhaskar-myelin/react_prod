import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";

function LoginComponent({
  inputHandler,
  formRef,
  submitForm,
  payload,
  classes,
  ...rest
}) {
  return (
    <div className="right">
      <div className="d-flex h-100 auth--container_right">
        <div className="my-auto w-100">
          <h2 className="fsize-28">Get Started</h2>
          <h5 className="fsize-16">Login with your email and password</h5>
          <div className="mt-5">
            <form
              autoComplete={"off"}
              ref={formRef}
              onSubmit={(e) => submitForm(e)}
              className="form"
            >
              <div className="w-100 mb-4 pb-1">
                <TextField
                  name="email"
                  type="email"
                  onChange={inputHandler}
                  required
                  id="email"
                  label="Email"
                  value={payload.email || ""}
                  variant="outlined"
                  className={classes.textField}
                />
              </div>
              <div className="w-100 mb-4">
                <TextField
                  name="password"
                  type="password"
                  onChange={inputHandler}
                  required
                  id="password"
                  label="Password"
                  value={payload.password || ""}
                  variant="outlined"
                  className={classes.textField}
                />
              </div>
              <div className="btn-wrap d-flex justify-content-between w-100">
                <Button
                  type="submit"
                  id="submitFormButton"
                  variant="contained"
                  className={`${classes.themeButton} w-100 py-2 br-2 transform-initial`}
                >
                  Login
                </Button>
              </div>
            </form>
            <div className="text-center mt-2">
              <NavLink
                className={classes.defaultNavLink}
                to={`/forgot-password`}
              >
                <Button
                  className={`${classes.lightThemeButton} my-2 color-1-imp transform-initial fsize-16`}
                >
                  Forgot Password?
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
