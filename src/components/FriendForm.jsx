import React, { useState, useRef } from "react";
import { axiosWithAuth } from "./LoginForm";

const FriendForm = ({ newFriend, setNewFriend, handleChange }) => {

  // set to initial number of friends and increment
  let testRef = useRef(7)

  const handleEditChange = event => {
    setNewFriend({
      ...newFriend,
      [event.target.name]: event.target.value
    });
  };

  const updateFriendData = event => {
      event.preventDefault();
      console.log(newFriend)
  }

  return (
    <div className="friend-form">
      <h1>Edit Friend</h1>
      <form onSubmit={updateFriendData}>
        <input value={newFriend.name} onChange={handleEditChange} name="name" type="text" placeholder="Name" />
        <input value={newFriend.age} onChange={handleEditChange} name="age" type="number" placeholder="Age" />
        <input value={newFriend.email} onChange={handleEditChange} name="email" type="text" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FriendForm;
