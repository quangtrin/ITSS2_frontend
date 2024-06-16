import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import EmployersLogo from "../assets/EmployersLogo.png";
import MapPin from "../assets/MapPin.png";
import { useNavigate } from "react-router-dom";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    padding: "30px",
  },
  jobTileOuter: {
    padding: "30px",
    paddingRight: 0,
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    top: 60,
    background: "white",
    paddingLeft: "28px !important",
    paddingRight: "28px !important",
    marginBottom: "20px",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    top: 135,
    background: "white",
    paddingLeft: "28px !important",
    paddingRight: "14px !important",
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { job } = props;
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);

  const handleClose = () => {
    setOpen(false);
  };

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  return (
    <Paper
      className={`${classes.jobTileOuter} cursor-pointer`}
      elevation={3}
      onClick={() => navigate(`/detailjob/${job._id}`)}
      style={{ height: "30vh" }}
    >
      <Grid container>
        <Grid container item xs={12} spacing={1} direction="row">
          <Grid item>
            <Typography variant="h5">{job.title}</Typography>
          </Grid>
          {/* <Grid item>Posted By: {application.recruiter.name}</Grid> */}
          <Grid container item direction="row" alignItems="center">
            <Grid item>
              <div
                style={{
                  padding: "2px 10px",
                  backgroundColor: "#E7F6EA",
                  color: "#0BA02C",
                  marginRight: "5px",
                  borderRadius: "4px",
                }}
              >
                {job.jobType}
              </div>
            </Grid>
            <Grid item style={{ color: "#767F8C" }}>
              Salary: ${job.salary}
            </Grid>
          </Grid>
          <Grid item direction="row" container alignItems="center">
            <Grid item>
              <img
                src={job.image}
                alt="Employers Logo"
                style={{ marginRight: "10px", width: "40px" }}
              />
            </Grid>
            <Grid>
              <Grid item>
                <div style={{ marginBottom: "5px" }}>{job.companyName}</div>
              </Grid>
              <Grid item container direction="row">
                <Grid>
                  <img
                    height={"20px"}
                    src={MapPin}
                    alt="Map Pin"
                    style={{ marginRight: "5px" }}
                  />
                </Grid>
                <Grid>
                  <div style={{ lineHeight: "20px", color: "#767F8C" }}>
                    {job.address}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item>
            Duration :{" "}
            {application.job.duration !== 0
              ? `${application.job.duration} month`
              : `Flexible`}
          </Grid>
          <Grid item>
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid> */}
          {/* {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>Joined On: {joinedOn.toLocaleDateString()}</Grid>
          ) : null} */}
        </Grid>
        {/* <Grid item container direction="column" xs={3}>
          <Grid item xs>
            <Paper
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status],
                color: "#ffffff",
              }}
            >
              {application.status}
            </Paper>
          </Grid>
          {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.statusBlock}
                onClick={() => {
                  fetchRating();
                  setOpen(true);
                }}
              >
                Rate Job
              </Button>
            </Grid>
          ) : null}
        </Grid> */}
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Rating
            name="simple-controlled"
            style={{ marginBottom: "30px" }}
            value={rating === -1 ? null : rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            // onClick={() => changeRating()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [jobs, setJobs] = useState([]);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [contractType, setContractType] = useState("");
  const [salary, setSalary] = useState("");
  const history = useNavigate();

  const handleSearch = () => {
    // Handle search here
  };

  const locations = ["All location", "America", "Japan", "Berlin"];
  const contractTypes = ["Full Time", "Part Time"];
  const salaries = [
    "Under $10000",
    "$10000 - $20000",
    "$20000 - $30000",
    "Over $30000",
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userType() === "recruiter") {
      history("/listcv");
    }
  }, []);

  const getData = () => {
    axios
      .get(apiList.jobs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <Grid container direction="row" style={{ padding: "0 100px"}}>
      <Grid
        item
        xs={12}
        className={classes.searchBar}
        style={{ paddingTop: "10px" }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleSearch} color="primary">
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid container direction="row" spacing={2} className={classes.filterBar}>
        <Grid item xs={3}>
          <FormControl variant="outlined" fullWidth>
            {!location && <InputLabel>All Locations</InputLabel>}
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              {locations.map((location) => (
                <MenuItem value={location}>{location}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl variant="outlined" fullWidth>
            {!contractType && <InputLabel>All Contract Types</InputLabel>}
            <Select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              {contractTypes.map((contractType) => (
                <MenuItem value={contractType}>{contractType}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl variant="outlined" fullWidth>
            {!salary && <InputLabel>Salary</InputLabel>}
            <Select
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
              }}
            >
              {salaries.map((salary) => (
                <MenuItem value={salary}>{salary}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        item
        direction="column"
        alignItems="center"
        style={{
          padding: "30px",
          paddingTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <Grid
          container
          item
          xs
          direction="row"
          style={{ width: "100%", height:"65vh", overflowY: "auto"}}
          // alignItems="stretch"
          // justify="between"
          spacing={1}
        >
          {jobs
            .filter((job) => {
              if (location === "All location") return true;
              else if (location)
                return job.address
                  ?.toUpperCase()
                  .includes(location.toUpperCase());
              else return true;
            })
            .filter((job) => {
              if (contractType) return job.jobType === contractType;
              else return true;
            })
            .filter((job) => {
              if (salary === "Under $10000") return job.salary < 10000;
              if (salary === "$10000 - $20000")
                return job.salary >= 10000 && job.salary < 20000;
              if (salary === "$20000 - $30000")
                return job.salary >= 20000 && job.salary < 30000;
              if (salary === "Over $30000") return job.salary >= 30000;
              else return true;
            })
            .filter((job) => {
              if (!searchTerm) return true;
              return job.title.toUpperCase().includes(searchTerm.toUpperCase());
            })
            .map((job) => (
              <Grid item xs={4}>
                <ApplicationTile job={job} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Applications;
