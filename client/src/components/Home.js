import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button, makeStyles } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh",
  },
}));

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIdRef = useRef(props.user.id);
    if (props.user.id !== userIdRef.current) {
      setIsLoggedIn(true);
    }
  }, [props.user]);

  useEffect(() => {
    props.fetchConversations();
  }, []);

  const handleLogout = async () => {
    await props.logout(props.user.id);
  };

  const classes = useStyles();

  if (!props.user.id) {
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }

  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
