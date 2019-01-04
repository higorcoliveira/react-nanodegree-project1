import React from 'react';
import './css/App.css';
import { Route } from 'react-router-dom';
import * as BooksAPI from './service/BooksAPI';
import Library from './component/Library';
import Search from './component/Search';

class BooksApp extends React.Component {
  state = {
    myReads: [],
    searchedBooks: []
  }

  // Uma vez que o componente for renderizado, traz todos os livros do backend
  componentDidMount() {
    BooksAPI.getAll()
      .then(myReads => {
        this.setState({ myReads })
      })
  }

  // Atualiza o status de cada livro, sendo 'shelfSelected' o valor do status passado ao clicar
  updateShelf = (book, shelf) => {
    if (book.shelf !== shelf) { // mudou o status
      BooksAPI.update(book, shelf).then(() => { // atualiza o backend
        const { myReads } = this.state;
        const checkMyReadsId = myReads => myReads.id === book.id;
        let myNewReads = [];

        if (myReads.some(checkMyReadsId)) {
          myNewReads = myReads.map(b => b.id === book.id ? {...b, shelf } : b);
        }
        this.setState({ myReads: myNewReads }); // atualiza o estado
      })
    }
  }

  // limpa a busca
  clearBooks = () => this.setState({ searchedBooks: [] });

  render() {
    const { myReads, searchedBooks } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          exact
          render={() => (
            <Search books={searchedBooks} updateShelf={this.updateShelf} clearBooks={this.clearBooks} />
          )}
        />
        <Route 
          path="/" 
          exact 
          render={() => (
            <Library books={myReads} updateShelf={this.updateShelf} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
