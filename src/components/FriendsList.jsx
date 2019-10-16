import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./LoginForm";
import FriendForm from "./FriendForm";
// import SetFriendsForm from '../components/SetFriendsForm';

const SetFriendsForm = props => {

  const [friendToEdit, setFriendToEdit] = useState({
    id: "",
    name: "",
    age: "",
    email: ""
  });

  const handleSelect = event => {
    console.log(JSON.parse(event.target.value));
  };

  return (
    <div className="set-friends-form-container">
      <h3>Select a friend</h3>
      <select name="selectFriend" className="select" onChange={handleSelect}>
        {props.data.map(friend => (
          <option key={friend.id} value={JSON.stringify(friend)}>
            {friend.name}
          </option>
        ))}
      </select>
      <div className="friend-form">
        <h1>Add New Friend</h1>
        <form onSubmit={1}>
          <input
            value={friendToEdit.name}
            onChange={props.handleChange}
            name="name"
            type="text"
            placeholder="Name"
          />
          <input
            value={friendToEdit.age}
            onChange={props.handleChange}
            name="age"
            type="number"
            placeholder="Age"
          />
          <input
            value={friendToEdit.email}
            onChange={props.handleChange}
            name="email"
            type="text"
            placeholder="Email"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

const FriendsList = () => {
  const [friendsData, updateFriendsData] = useState([]);

  const [newFriend, setNewFriend] = useState({
    id: "",
    name: "",
    age: "",
    email: ""
  });

  const [friendToEdit, setFriendToEdit] = useState({
    id: "",
    name: "",
    age: "",
    email: ""
  });

  const handleChange = event => {
    setNewFriend({
      ...newFriend,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(res => updateFriendsData(res.data));
  }, [friendsData]);

  return (
    <>
      <h1>Friends:</h1>
      <div className="friends-list">
        {friendsData.map(friend => (
          <h3>{friend.name}</h3>
        ))}
      </div>
      <FriendForm newFriend={newFriend} setNewFriend={setNewFriend} handleChange={handleChange} />
      <SetFriendsForm data={friendsData} friendToEdit={friendToEdit} setFriendToEdit={setFriendToEdit}/>
    </>
  );
};

export default FriendsList;
