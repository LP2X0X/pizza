import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "./userSlice";
import { useNavigate } from "react-router";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(userName));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>👋</span> Welcome! Please start by telling us your name:
      </label>
      <input
        type="text"
        placeholder="Your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button>Start Ordering</button>
    </form>
  );
}

export default CreateUser;
