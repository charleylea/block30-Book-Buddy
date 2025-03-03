import React from "react";
import { Route, Routes } from "react-router-dom";
import Books from "./Books";
import SingleBook from "./SingleBook";
import Account from "./Account";
import Login from "./Login";
import Register from "./Register";
import Navigation from "./Navigation";
//import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
