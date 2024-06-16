import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import axios from "axios";

import { SetPopupContext } from "../App";

const FileUploadInput = (props) => {
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [test, setTest] = useState({ imgFile: null, imgSrc: "" });
  const handleChangeFile = (e) => {
    // Lấy file từ event
    let file = e.target.files[0];
    setTest({ imgFile: file, imgSrc: "" });

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      // Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setTest({ imgFile: file, imgSrc: e.target.result });
      };
    }
  };

  const handleUpload = async (e) => {
    try {
      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "yb8k2xvj");
      data.append("cloud_name", "dsjiwboyz");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsjiwboyz/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const resumeData = await res.json();
      // console.log(imageData.secure_url);
      // const img = !imageData.secure_url
      //   ? "https://simerp.io/wp-content/uploads/2021/07/POS-quan-ly-hang-ton-kho.png"
      //   : imageData.secure_url;

      // Send URL to your backend
      // console.log(uploadTo);
      const response = await axios.post('http://localhost:4444/upload/uploadCV', {
        resumeUrl: resumeData.secure_url,
      });

      console.log(response.data);

      // Handle response from backend if needed
      setPopup({
        open: true,
        severity: "success",
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setPopup({
        open: true,
        severity: "error",
        message: "Error uploading file",
      });
    }

    // console.log(file);
    // const data = new FormData();
    // data.append("file", file);
    // Axios.post(uploadTo, data, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   onUploadProgress: (progressEvent) => {
    //     setUploadPercentage(
    //       parseInt(
    //         Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //       )
    //     );
    //   },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     handleInput(identifier, response.data.url);
    //     setPopup({
    //       open: true,
    //       severity: "success",
    //       message: response.data.message,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     setPopup({
    //       open: true,
    //       severity: "error",
    //       message: err.response.statusText,
    //       //   message: err.response.data
    //       //     ? err.response.data.message
    //       //     : err.response.statusText,
    //     });
    //   });
  };

  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: "100%", height: "100%" }}
          >
            {props.icon}
            {/* <input
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                console.log(event.target.files);
                setUploadPercentage(0);
                setFile(event.target.files[0]);
              }}
              // onChange={onChange}
              // onChange={
              //   (e) => {}
              //   //   setSource({ ...source, place_img: e.target.files[0] })
              // }
            /> */}

            <input
              type="file"
              accept="image/*"
              name="url"
              placeholder="Choose file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleUpload(e);
              }}
            />
            <br />
            {/* {test.imgSrc ? (
              <img
                style={{ width: 100, height: 100 }}
                src={test.imgSrc}
                alt="..."
              />
            ) : (
              <></>
            )} */}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label}
            value={file ? file.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => handleUpload()}
            disabled={file ? false : true}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FileUploadInput;
