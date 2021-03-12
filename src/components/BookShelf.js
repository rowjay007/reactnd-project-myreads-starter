import React from "react";
import BookLog from "./BookLog";

class Shelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.heading}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/*Send book and key as props to the Book component (Use key for list items as mentioned in documentation)*/}
            {this.props.books.map((book) => (
              <BookLog
                changeShelf={this.props.changeShelf}
                book={book}
                key={book.id}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
