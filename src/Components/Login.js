import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();


    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history('/')
    } else {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div  className="container d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit} className="col-md-4" >
        <div className="text-center">
          <img
            src="https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png"
            className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="100px"
            alt="profile"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>

        <div id="emailHelp" className="form-text text-center mb-5 text-dark">
          Not Registered? {" "}
          <span
            onClick={() => history("/signup")}
            className="text-dark fw-bold"
            style={{ cursor: "pointer" }}
          >
            Create an Account
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
