import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { User } from "../../store/user";
import "./register.css";

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, "id"> {
  label: string;
  errorMessage?: string;
}
const Input = (props: InputProps) => {
  const { label, errorMessage, ...inputProps } = props;
  const id = useId();
  return (
    <div className="formInput">
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} id={id} />
      <span>{errorMessage}</span>
    </div>
  );
};
Input.defaultProps = {
  errorMessage: "",
};
type UserWithPassword = Omit<User, "id"> & {
  password: string;
  confirmPassword: string;
};

type RegisterInput = {
  [key in keyof UserWithPassword]: string;
};
const Register = () => {
  const [inputValues, setInputValues] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const mutation = useMutation({
    mutationFn: (user: RegisterInput) => axios.post("/users", user),
  });
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const inputs = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Name",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      errorMessage: "It should be a valid email address",
    },
    {
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
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      required: true,
      pattern: inputValues.password,
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(inputValues);
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Register</h1>
      {inputs.map((input) => (
        <Input
          {...input}
          key={input.name}
          value={inputValues[input.name as keyof UserWithPassword]}
          onChange={onChange}
        />
      ))}
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default Register;
