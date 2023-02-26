import React, { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import "./list.css";
import Snackbars from "./common/snackbar";

export const List = ({ changed, setChanged }) => {
  const [state, setState] = useState([]);

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });

  const handleChange = async (idx, status) => {
    const updateObj = {
      isCompleted: !status,
      completed_time: status === true ? null : Date.now(),
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/api/updateTodo/${idx}`,
        { updateObj }
      );
      if (res.status === 200) {
        setSuccess({ isSuccess: true, message: "Todo Updated Successfully" });
        setChanged(!changed);
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/getTodos");
      if (res.status === 200) {
        setState(res.data);
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };
  useEffect(() => {
    getData();
  }, [changed]);

  const deleteHandler = async (idx) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/deleteTodo/${idx}`
      );
      if (res.status === 200) {
        setChanged(!changed);
        setSuccess({ isSuccess: true, message: "Todo deleted Successfully" });
      }
    } catch (err) {
      setError({ isError: true, message: err.message });
    }
  };

  return (
    <div className="items-container">
      {state && state.length ? (
        state?.map((todo, id) => {
          return (
            <div className="item-container" key={id}>
              <div className="left-items">
                <Checkbox
                  checked={todo.isCompleted}
                  onChange={() => handleChange(todo._id, todo.isCompleted)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p key={id}>{todo.task_name}</p>
              </div>
              <div className="del-btn" onClick={() => deleteHandler(todo._id)}>
                <Delete />
              </div>
            </div>
          );
        })
      ) : (
        <p>no todos found</p>
      )}

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
