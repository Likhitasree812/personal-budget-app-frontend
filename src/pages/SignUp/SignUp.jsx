import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    axios
      .post("http://161.35.234.181:3005/api/v1/users/signup", inputFields)
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          // value.toast.push({status: "success", msg:"User signed up successfully"})
          navigate("/login");
        } else {
          const errorData = res.json();
          console.error("Error signing up user:", errorData.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        // value.toast.push({status: "error", msg:err.response.data.error})
      });
  };

  return (
    <main className="form-signup w-100 m-auto">
      <form onSubmit={handleSignUp}>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="username"
            value={inputFields.username}
            onChange={handleChange}
            required
          />
          <label for="username">Username</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={inputFields.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
          <label for="email">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={inputFields.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <label for="password">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign Up
        </button>
        <p className="mt-5 mb-3 text-body-secondary">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default SignUp;
