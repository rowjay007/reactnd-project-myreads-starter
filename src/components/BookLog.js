import React from "react";

const BookLog = ({ book, changeShelf }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url("${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              }")`,
            }}
          />
          <div className="book-shelf-changer">
            {/*Shelf value sent as book prop for shelf status. If value is changed call changeShelf and send book and new select menu value as params*/}
            <select
              value={book.shelf ? book.shelf : "none"}
              onChange={(e) => {
                changeShelf(book, e.target.value);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title ? book.title : "Untitled"}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : "No author listed"}
        </div>
      </div>
    </li>
  );
};

export default BookLog;
