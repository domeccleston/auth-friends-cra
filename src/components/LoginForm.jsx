import React, { useRef } from "react";
import { withFormik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
};

const LoginForm = () => {
  const usernameRef = useRef();
  const history = useHistory();
  return (
    <div className="form-container">
      <Form className="login-form">
        <Field ref={usernameRef} type="text" name="username" placeholder="Username" />
        <Field type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  handleSubmit(values, history) {
    axiosWithAuth()
      .post("http://localhost:5000/api/login", values)
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.payload);
        history.props.history.push("/friendslist");
      });
  }
})(LoginForm);

export default FormikLoginForm;
