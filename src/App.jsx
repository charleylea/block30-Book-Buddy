import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import "./index.css";

function App() {
  return (
    <div>
      <Navigations />
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
