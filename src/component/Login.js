import { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { Link as Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import { useNavigate as useHistory } from "react-router-dom";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
}));

const Login = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleLogin = (role) => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    const email =
      role === "recruiter" ? "quangceo@gmail.com" : "quang@gmail.com";
    if (verified) {
      const details = {
        email: email,
        password: "123456",
      };
      axios
        .post(apiList.login, details)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          userType() === "recruiter"
            ? history("/listcv")
            : history("/applications");
            props.setChatFeature(true);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
  }, []);

  return (
    // <Paper elevation={3} className={classes.body}>
    //   <Grid container direction="column" spacing={4} alignItems="center">
    //     {/* <Grid item>
    //       <Typography variant="h3" component="h2">
    //         Login
    //       </Typography>
    //     </Grid> */}
    //     <Grid item>
    //       <EmailInput
    //         label="Email"
    //         value={loginDetails.email}
    //         onChange={(event) => handleInput("email", event.target.value)}
    //         inputErrorHandler={inputErrorHandler}
    //         handleInputError={handleInputError}
    //         className={classes.inputBox}
    //       />
    //     </Grid>
    //     {/* <Grid item>
    //       <PasswordInput
    //         label="Password"
    //         value={loginDetails.password}
    //         onChange={(event) => handleInput("password", event.target.value)}
    //         className={classes.inputBox}
    //       />
    //     </Grid> */}
    //     <Grid item>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         onClick={() => handleLogin()}
    //         className={classes.submitButton}
    //       >
    //         Login
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </Paper>
    <>
      <Button onClick={() => handleLogin("applicant")}>applicant</Button>
      <Button onClick={() => handleLogin("recruiter")}>recruiter</Button>
    </>
  );
};

export default Login;
