import React from 'react'
import './css/App.css'
import * as BooksAPI from './service/BooksAPI'
import Library from './component/Library'

class BooksApp extends React.Component {
  state = {
    myReads: [],
    searchedBooks: []
  }

  // Uma vez que o componente for renderizado, ele traz todos os livros do backend
  componentDidMount() {
    BooksAPI.getAll()
      .then(myReads => {
        this.setState({ myReads })
      })
  }

  render() {
    const { myReads } = this.state;

    return (
      <div className="app">
        <Library books={myReads} />
      </div>
    )
  }
}

export default BooksApp
