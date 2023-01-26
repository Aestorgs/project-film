import React from "react";
import { users } from "../App";
import img from "../img/imgNotFound.png";
import { Link } from "react-router-dom";
import "../css/Favoris.css";
import { useEffect } from "react";

// pages favoris pour afficher les favoris et de suprimer du favoris 
export const Favoris = () => {
  const { me } = React.useContext(users);
  const [message, setMessage] = React.useState("");
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then(async (shows) => {
        const show = await Promise.all(
          shows.favoris.map((fav) => {
            return fetch(
              `https://api.tvmaze.com/shows/${fav.showsId}?embed=cast`
            )
              .then((res) => res.json())
              .then((data) => [data, fav.id])
              .catch((err) => console.log(err));
          })
        );
        setData(show);
      })
      .catch((err) => console.log(err));
  }, []);

  const Delete = async (p) => {
    try {
      const res = await fetch(`http://localhost:3000/favoris/${p}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setMessage({ id: p, message: "Le film à été supprimer  " });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
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

      <h1>Favoris</h1>
      <div className="list">
        {data.map((p, index) => {
          return (
            <div key={index}>
              <img src={p[0].image?.medium || img} />
              <Link className="center" to={`${p[0].id}`}>
                {p[0].name}
              </Link>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => Delete(p[1])}
                >
                  Supprimer le film
                </button>
                <div>{p[1] === message.id && message.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
