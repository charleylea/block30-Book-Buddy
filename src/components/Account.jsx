/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const respone = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await respone.json();
    console.log(result);
    setUserInfo(result);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>Your Account</h1>
      {userInfo ? (
        <>
          <h2>Welcome, {userInfo.username}</h2>
          <h3>Your Checked-Out Books:</h3>
          <ul>
            {checkedOutBooks.length > 0 ? (
              checkedOutBooks.map((book) => <li key={book.id}>{book.title}</li>)
            ) : (
              <p>No books checked out.</p>
            )}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Account;
