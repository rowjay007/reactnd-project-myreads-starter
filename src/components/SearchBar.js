import React from "react";

import * as BooksAPI from "../BooksAPI";
import BookLog from "./BookLog";

import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookDisplay: [], searchResults: [], query: "" };
  }

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      this.setState({ bookDisplay: response });
    });
  }

  changeShelf = (shiftedBook, newShelf) => {
    BooksAPI.update(shiftedBook, newShelf).then((response) => {
      shiftedBook.shelf = newShelf;
      let newBookDisplay = this.state.bookDisplay;

      this.setState({ bookDisplay: newBookDisplay });
    });
  };

  searchBook(newQuery) {
    this.setState({ query: newQuery });

    if (
      this.state.query === "" ||
      this.state.query === undefined ||
      this.state.query === null
    ) {
      return this.setState({ searchResults: [] });
    }
    BooksAPI.search(this.state.query).then((response) => {
      if (response.error && response.items) {
        return this.setState({ searchResults: [] });
      } else {
        response.forEach((book, index) => {
          this.state.bookDisplay.forEach((shelvedBook) => {
            if (book.id === shelvedBook.id) {
              book.shelf = shelvedBook.shelf;
            }
          });
        });
        return this.setState({ searchResults: response });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/*Link back to Home*/}
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/* The BooksAPI.search method searches by title or author. Every search is limited by search terms. */}
            {/* Set value as this.state.query. Call searchBook when query changed */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-bookMatches">
          <ol className="books-grid">
            {/* Send book and key as props to the Book component (As mentioned use key for list items and give unique identify) */}
            {this.state.searchResults.map((book) => (
              <BookLog
                changeShelf={this.changeShelf}
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

export default SearchBar;
