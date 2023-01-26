import React from "react";
import { Link, useParams } from "react-router-dom";
import img from "../img/imgNotFound.png";
import { users } from "../App";

// pages details pour le film 
export const Details = () => {
  const [detail, useDetail] = React.useState({});
  const { id } = useParams();
  const [user, setUser] = React.useState([]);
  const { me } = React.useContext(users);

  React.useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then((res) => res.json())
      .then((data) => {
        useDetail(data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <nav className="navbar bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
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
                {" "}
                {user.firstname} {user.lastname}
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
                  <Link className="nav-link " aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/favoris">
                    Favoris
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <h1> Titre : {detail.name}</h1>
      {<h2> Notes : {detail.rating?.average} / 10</h2>}
      {<h3> Types : {detail.genres}</h3>}
      {
        <img
          className="affichage"
          src={`${detail.image?.original ? detail.image?.original : img}`}
        />
      }
      {<p>{detail.summary}</p>}
      <h2>Castings</h2>
      {
        <div className="list">
          {detail._embedded?.cast.map((p, index) => {
            return (
              <div key={index}>
                <h3>{p.person.name}</h3>
                <img
                  src={`${
                    p.person.image?.medium ? p.person.image?.medium : img
                  }`}
                />
              </div>
            );
          })}
        </div>
      }
    </>
  );
};
