import React from "react";

import * as BooksAPI from "../BooksAPI";
import BookLog from "./BookLog";

import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showBook: [], searchData: [], data: "" };
  }

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      this.setState({ showBook: response });
    });
  }

  changeShelf = (shiftedBook, newShelf) => {
    BooksAPI.update(shiftedBook, newShelf).then((response) => {
      shiftedBook.shelf = newShelf;
      let showNewBook = this.state.showBook;

      this.setState({ showBook: showNewBook });
    });
  };

  searchBook(newdata) {
    this.setState({ data: newdata });

    if (
      this.state.data === "" ||
      this.state.data === undefined ||
      this.state.data === null
    ) {
      return this.setState({ searchData: [] });
    }
    BooksAPI.search(this.state.data).then((response) => {
      if (response.error && response.items) {
        return this.setState({ searchData: [] });
      } else {
        response.forEach((book, index) => {
          this.state.showBook.forEach((shelvedBook) => {
            if (book.id === shelvedBook.id) {
              book.shelf = shelvedBook.shelf;
            }
          });
        });
        return this.setState({ searchData: response });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.data}
              onChange={(e) => this.searchBook(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-bookMatches">
          <ol className="books-grid">
            {this.state.searchData.map((book) => (
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
