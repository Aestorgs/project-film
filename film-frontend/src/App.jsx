import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { Register } from "./pages/register";
import { Favoris } from "./pages/favoris";
import { Users } from "./pages/users";
import { Details } from "./pages/details";
import { Login } from "./pages/login";
import "./css/App.css";

// systeme de route pour allez vers les pages 
export const users = React.createContext();

const App = () => {
  const [me, setMe] = React.useState();
  return (
    <users.Provider value={{ me, setMe }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/favoris/:id" element={<Details />} />
          <Route path="/home" element={<Users />} />
          <Route path="/home/:id" element={<Details />} />
        </Route>
      </Routes>
    </users.Provider>
  );
};

export default App;
