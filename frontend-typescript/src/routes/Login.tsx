import { FormEvent, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";

const Login = () => {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const login = async () => {
    try {
      await axios.post("/login", details);
      dispatch(
        setUser({
          name: details.name,
          email: details.email,
        })
      );
    } catch (e) {
      setError("details do not match!");
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2>Login</h2>
          {error !== "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
          </div>
          <input type="submit" value="login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
