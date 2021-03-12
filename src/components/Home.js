import React from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { bookDisplay: [] };
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

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/*Filter book for each shelf based on shelf and send to shelf component*/}
            <BookShelf
              heading="Currently reading"
              books={this.state.bookDisplay.filter(
                (book) => book.shelf === "currentlyReading"
              )}
              changeShelf={this.changeShelf}
            />
            <BookShelf
              heading="Want to read"
              books={this.state.bookDisplay.filter(
                (book) => book.shelf === "wantToRead"
              )}
              changeShelf={this.changeShelf}
            />
            <BookShelf
              heading="Read"
              books={this.state.bookDisplay.filter(
                (book) => book.shelf === "read"
              )}
              changeShelf={this.changeShelf}
            />
          </div>
        </div>

        {/*Link to Search.js*/}
        <Link to="/search">
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default Home;
