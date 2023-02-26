import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import ProfileImage from "../images/myimg.jpeg";
import axios from "axios";
import { List } from "./list";
import Snackbars from "./common/snackbar";

import "./landingpage.css";

export const LandingPage = () => {
  const [addNew, setAddNew] = useState("");
  const [changed, setChanged] = React.useState(false);
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const clickHandler = async () => {
    try {
      if (addNew.length > 1) {
        const res = await axios.post("http://localhost:4000/api/createTodo", {
          task_name: addNew,
        });
        if (res.status === 200) {
          setChanged(!changed);
          setSuccess({ isSuccess: true, message: "Todo Added Successfully" });
        }
      } else {
        setError({ isError: true, message: "Todo name is required" });
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="image">
          <Stack direction="row" spacing={2}>
            <Avatar
              src={ProfileImage}
              alt="My Image"
              sx={{ width: 80, height: 80 }}
            />
          </Stack>
        </div>
        <form onSubmit={clickHandler}>
          <div className="todo-container">
            <TextField
              id="outlined-basic"
              label="Add your new Todo"
              size="small"
              variant="outlined"
              className="textfield"
              onChange={(e) => setAddNew(e.target.value)}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={clickHandler}
              >
                <AddIcon />
              </Button>
            </div>
          </div>
        </form>
        <List changed={changed} setChanged={setChanged} />
      </div>
      {success.isSuccess && (
        <Snackbars
          severity="success"
          message={success.message}
          setSuccess={setSuccess}
        />
      )}
      {error.isError && (
        <Snackbars
          severity="error"
          message={error.message}
          setError={setError}
        />
      )}
    </div>
  );
};
