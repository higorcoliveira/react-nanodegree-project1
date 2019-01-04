import React from 'react'
import './css/App.css'
import * as BooksAPI from './service/BooksAPI'
import Library from './component/Library'

class BooksApp extends React.Component {
  state = {
    myReads: [],
    // searchedBooks: []
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

  render() {
    const { myReads } = this.state;

    return (
      <div className="app">
        <Library books={myReads} updateShelf={this.updateShelf} />
      </div>
    )
  }
}

export default BooksApp
