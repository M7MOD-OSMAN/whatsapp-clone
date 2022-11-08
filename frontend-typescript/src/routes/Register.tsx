import React, { useState } from "react";
import App from "./App";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      label: "User Name",
      placeholder: "User Name",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      errorMessage: "It should be a valid email address",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      required: true,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match!",
      label: "Confirm Password",
      required: true,
      pattern: inputValues.password,
    },
  ];

  const onChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };
  return (
    <div className="app">
      {loggedIn ? (
        <App />
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map((input) => (
              <div className="formInput">
                <label>{input.label}</label>
                <input
                  {...input}
                  onChange={onChange}
                  onBlur={handleFocus}
                  onFocus={() =>
                    input.name === "confirmPassword" && setFocused(true)
                  }
                  focused={focused.toString()}
                />
                <span>{input.errorMessage}</span>
              </div>
            ))}
            <button className="submit-btn">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
