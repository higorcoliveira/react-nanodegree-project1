import React from 'react'
import './css/App.css'
// import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    myReads: [],
    searchedBooks: []
  }

  render() {
    return (
      <div className="app">
        <h1>BOOKS!</h1>
      </div>
    )
  }
}

export default BooksApp
