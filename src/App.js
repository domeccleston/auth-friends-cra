import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import FriendsList from './components/FriendsList';
import { axiosWithAuth } from './components/LoginForm';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={props => 
    localStorage.getItem("token") ? ( <Component {...props}/> ) : ( <Redirect to="/" />)
  } />
)

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LoginForm}/>
      <PrivateRoute path="/friendslist" component={FriendsList} />
    </div>
  );
}

export default App;
