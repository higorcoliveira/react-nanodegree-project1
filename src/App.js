import React from 'react';
import './css/App.css';
import { Route } from 'react-router-dom';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
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

  // Encapsula a chamada da API de busca no AwesomeDebouncePromise
  // Basicamente ele espera o usuário digitar o termo para buscar no backend
  // Economiza chamadas inúteis no backend
  asyncSearch = (query) => BooksAPI.search(query);
  asyncSearchDebounced = AwesomeDebouncePromise(this.asyncSearch, 500);

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

  // Limpa a busca
  clearBooks = () => this.setState({ searchedBooks: [] });

  // Vai no backend e busca pelos livros, alterando o estado de searchedBooks
  // Consultar SEARCH_TERMS.md para termos 'buscáveis'
  searchBook = async e => {
    e.preventDefault();
    const query = e.target.value; // resultado do campo de busca
    if (query !== '') {
      const results = await this.asyncSearchDebounced(query);
      if (!results || results.error) { // resultados não encontrados
        this.clearBooks();
        return
      }

      this.setState({ searchedBooks: 
        results.map(result => { // resultados encontrados, altera o estado
          const { myReads } = this.state;
          myReads.forEach(book => {
            if (book.id === result.id)
              result.shelf = book.shelf
          })
          return result;
        })
      })        
    } else {
      this.clearBooks();
    }
  }

  render() {
    const { myReads, searchedBooks } = this.state;

    return (
      <div className="app">
        <Route
          path="/search"
          exact
          render={() => (
            <Search books={searchedBooks} updateShelf={this.updateShelf} clearBooks={this.clearBooks} searchBook={this.searchBook} />
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
