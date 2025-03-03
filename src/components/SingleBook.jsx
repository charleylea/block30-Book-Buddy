/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch details of the specific book
    setIsLoading(true); // Set loading state to true while fetching
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }
        return response.json();
      })
      .then((data) => {
        setBook(data);
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setError("Could not fetch book details.");
        setIsLoading(false); // Set loading to false on error
      });
  }, [id]);

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first!");
      navigate("/login"); // Optionally redirect to login page
      return;
    }

    // Handle checking out the book
    fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/checkout/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Book checked out successfully!");
      })
      .catch((err) => alert("Failed to check out book."));
  };

  // Show loading or error message
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={handleCheckout}>Check Out Book</button>
    </div>
  );
}

export default SingleBook;
