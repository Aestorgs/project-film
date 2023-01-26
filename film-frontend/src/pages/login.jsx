import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../App";
import "../css/Login.css";

// pages login pour ce connecter 
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { setMe } = React.useContext(users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log("users", data.users);
      if (res.status === 200) {
        navigate("/home");
        setMe(data.users);
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Film
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row text-white">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
            <h1 className="display-4 py-2 text-truncate">Login</h1>
            <div className="px-2">
              <form
                onSubmit={handleSubmit}
                method="post"
                className="justify-content-center"
              >
                <div className="form-group">
                  <label className="sr-only">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    aria-describedby="emailHelp"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="sr-only">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                </div>
                <button
                  onSubmit={handleSubmit}
                  type="submit"
                  className="btn btn-primary"
                >
                  Connected
                </button>
                <div className="message">
                  {message ? <p>{message}</p> : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
