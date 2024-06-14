import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes as Switch, Route, json } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";
import { io } from "socket.io-client";
import DetailJob from "./component/DetailJob";
import ListCv from "./component/ListCv";
// import { Popover } from "@material-ui/core";
import { Popover } from "antd";
import ChatPopup from "./component/ChatPopup";
import ChatWindow from "./component/ChatWindow";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [socket, setSocket] = useState();
  const [chatFeature, setChatFeature] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [openListMessage, setOpenListMessage] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:4444");
    setSocket(socket);
  }, []);

  useEffect(() => {
    setChatFeature(false);
  }, []);

  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar setChatFeature={setChatFeature}/>
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/" element={<Login setChatFeature={setChatFeature}/>} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/applications" element={<Applications />} />
              <Route exact path="/detailJob/:id" element={<DetailJob />} />
              <Route
                exact
                path="/profile"
                element={
                  userType() === "recruiter" ? (
                    <RecruiterProfile />
                  ) : (
                    <Profile />
                  )
                }
              />
              <Route exact path="/addjob" element={<CreateJobs />} />
              <Route exact path="/myjobs" element={<MyJobs />} />
              <Route exact path="/listcv" element={<ListCv />} />
              <Route
                exact
                path="/job/applications/:jobId"
                element={<JobApplications />}
              />
              <Route exact path="/employees" element={<AcceptedApplicants />} />
              <Route element={<ErrorPage />} />
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
        {chatFeature && (
          <div className=" fixed bottom-10 right-10">
            <Popover
              open={openListMessage}
              trigger={"click"}
              content={
                <ChatPopup
                  setOpenMessage={setOpenMessage}
                  openMessage={openMessage}
                  setOpenListMessage={setOpenListMessage}
                />
              }
              onOpenChange={(value) => setOpenListMessage(value)}
            >
              <div onClick={() => setOpenListMessage(!openListMessage)}>
                <img
                  width={50}
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/4138/4138138.png"
                />
              </div>
            </Popover>
            <Popover
              open={openMessage}
              content={<ChatWindow socket={socket} />}
              onOpenChange={(value) => setOpenMessage(value)}
              trigger={"click"}
            ></Popover>
          </div>
        )}
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
