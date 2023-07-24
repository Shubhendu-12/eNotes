import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [credentials, setCredentials] = useState({ name:"", email: "", password: "",cpassword:"" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {    
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       name,email,password
      }),
      // body: JSON.stringify({
      // email: credentials.email,
      // password: credentials.password,
      // }); 
      // * IMP extraction of name email,password can also be done directly as show above rather then using the  stringify code minLength={5} required 
      //  body: JSON.stringify({
      //  name,email,password
      // }),
      // avoiding 1 more line above
      //  const {name,email,password} = credentials; this line is to exteact name,email,password from credentials
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      // .setItem is inbuild command
      navigate("/login");
    } else {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter full name"
              name="name"
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
              aria-describedby="emailHelp"
              name="email"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
