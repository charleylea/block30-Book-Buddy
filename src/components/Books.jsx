/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all books from the API
    setLoading(true);
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`);
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch books.");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Function to handle the search/filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Memoize filtered books for better performance
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  // Show loading or error states
  if (loading) return <div>Loading books...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h1>Books in the Library</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for books..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ padding: "8px", width: "200px" }}
      />

      <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))
        ) : (
          <p>No books found matching your search.</p>
        )}
      </ul>
    </div>
  );
};

export default Books;
