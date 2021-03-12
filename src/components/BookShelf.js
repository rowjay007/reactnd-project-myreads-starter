import React from "react";
import BookLog from "./BookLog";

const BookShelf = ({books, changeShelf, heading}) => {
 
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{heading}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/*Send book and key as props to the Book component (Use key for list items as mentioned in documentation)*/}
            {books.map((book) => (
              <BookLog
                changeShelf={changeShelf}
                book={book}
                key={book.id}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }


export default BookShelf;
