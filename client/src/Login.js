import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
  TextField,
  Box,
  InputAdornment,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import Layout from "./components/Layout";

const useStyles = makeStyles((theme) => ({
  forgotPassword: {
    fontSize: theme.typography.fontSizeSmall,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

const Login = ({ user, login }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  const handleForgotPassword = () => {
    console.log("Implement forgot password");
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Layout
      title="Welcome back!"
      actionHelper="Don’t have an account?"
      actionLabel="Create account"
      onClick={() => history.push("/register")}
      handleFormSubmit={handleLogin}
      submitBtnLabel="Login">
      <Grid container align="center" justify="center" direction="column">
        <FormControl margin="normal" required>
          <TextField
           label="Username"
            aria-label="Username"
            name="username"
            type="text"
          />
        </FormControl>
        <Box my={2} />
        <FormControl margin="normal" required>
          <TextField
           label="Password"
            aria-label="password"
            type="password"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleForgotPassword}>
                  <span className={classes.forgotPassword}>Forgot?</span>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
