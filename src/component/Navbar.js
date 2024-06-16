import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useNavigate as useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    props.setChatFeature(false);
    window.location.href = location;
  };

  return (
    <div className="appbar-navbar">
      <Toolbar>
        <Typography
          style={{ cursor: "pointer" }}
          variant="h6"
          className={classes.title}
          onClick={() => {
            props.setChatFeature(true);
            userType() === "recruiter"
              ? history("/listcv")
              : history("/applications");
          }}
        >
          {!isAuth()
            ? ""
            : userType() === "recruiter"
            ? "Recruiter"
            : "Applicant"}
        </Typography>
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit" onClick={() => handleClick("/")}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Job
              </Button>
              <Button color="inherit" onClick={() => handleClick("/")}>
                Logout
              </Button>
            </>
          )
        ) : (
          <></>
        )}
      </Toolbar>
    </div>
  );
};

export default Navbar;
