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
  // Espera o usuário digitar o termo para buscar no backend
  asyncSearch = (query) => BooksAPI.search(query);
  asyncSearchDebounced = AwesomeDebouncePromise(this.asyncSearch, 500);

  // Atualiza o status de cada livro, sendo 'shelf' o valor do status passado ao clicar
  updateShelf = (book, shelf) => {
    if (shelf === 'none') {
      this.setState(prevState => ({
          myReads: prevState.myReads.filter(b => b.id !== book.id),
      }))
    }

    if (book.shelf !== shelf) { // mudou o status
      BooksAPI.update(book, shelf).then(() => { // atualiza o backend
        const { myReads, searchedBooks } = this.state;
        const checkBookId = myReads => myReads.id === book.id;
        let myNewReads, newSearchedBooks = [];

        if (myReads.some(checkBookId)) {
          myNewReads = this.addNewBook(myReads, book, shelf);
          newSearchedBooks = this.addNewBook(searchedBooks, book, shelf);
        } else { // Passa o livro buscado que não existe no MyReads pra uma das estantes escolhidas
          book.shelf = shelf
          myNewReads = [...myReads, book]
          newSearchedBooks = [...searchedBooks, book]
        }
        this.setState({ myReads: myNewReads, searchedBooks: newSearchedBooks }); // atualiza o estado
      })
    }
  }

  // Adiciona o novo objeto na lista existente
  addNewBook = (books, book, shelf) => books.map(b => b.id === book.id ? {...b, shelf } : b);

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
        results.map(result => { // Reflete na busca o estado dos livros já adicionados em MyReads
          const { myReads } = this.state;
          myReads.forEach(book => {
            if (book.id === result.id) {              
              result.shelf = book.shelf
            }
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
