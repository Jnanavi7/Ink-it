import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, cpassword }),
    });
    const json = await response.json();
    //save the auth token and redirect
    localStorage.setItem("token", json.authtoken);
    history("/login");
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="col-md-4">
        <div className="text-center">
          <img
            src="https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png"
            className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="100px"
            alt="profile"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
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
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
        <div className="form-text text-center mb-5 text-dark">
          Already have an account?{" "}
          <span
            onClick={() => history("/login")}
            className="text-dark fw-bold"
            style={{ cursor: "pointer" }}
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
