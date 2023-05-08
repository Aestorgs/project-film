import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { users } from "../App";
import "../css/Users.css";
import img from "../img/imgNotFound.png";

// pages users pour afficher utilisateur et qui puisse rechercher un film 
export const Users = () => {
  const [search, useSearch] = React.useState([]);
  const [values, useValues] = React.useState("");
  const { me } = React.useContext(users);
  const [message, setMessage] = React.useState("");
  const [favoris, setFavoris] = React.useState([]);
  const [user, setUser] = React.useState([]);

  const films = (e) => {
    e.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${values}`)
      .then((res) => res.json())
      .then((data) => useSearch(data))
      .catch((err) => console.log(err));
  };

  const shows = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/favoris/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showsId: p.show.id,
          users: me,
        }),
      });
      if (res.status === 201) {
        setMessage({ id: p.show.id, message: "Le film à été ajouté " });
        setFavoris((prev) => [...prev, { shows: p.show.id }]);
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
      .then((data) => setFavoris(data.favoris))
      .catch((err) => console.log(err));
  }, []);

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
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/favoris">
                    Favoris
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <h2 className="h2Users">Search for the film or series</h2>
      <form className="container" onSubmit={films}>
        <div className="form-group">
          <div className="input-group">
            <input
              className="form-control"
              value={values}
              type="search"
              onChange={(e) => useValues(e.target.value)}
              placeholder="Search..."
            />
            <span>
              <button className="btn btn-primary btn-lg">Search</button>
            </span>
          </div>
        </div>
      </form>
      <div className="list">
        {search.map((p, index) => {
          return (
            <div key={index}>
              <img
                src={`${p.show.image?.medium ? p.show.image?.medium : img}`}
              />
              <Link className="center" to={`${p.show.id}`}>
                {p.show.name}
              </Link>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  disabled={
                    favoris.find(
                      (f) => f.shows === p.show.id || f.showsId === p.show.id
                    )
                      ? true
                      : false
                  }
                  onClick={() => shows(p)}
                >
                  Ajouter le film
                </button>
                {p.show.id === message.id && message.message}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
