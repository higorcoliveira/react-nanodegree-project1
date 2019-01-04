import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Shelf from './Shelf';

/**
 * Componente que representa a biblioteca, encapsulando todas as estantes dos livros
 * @param { books } props 
 */
const Library = props => {
    const { books, updateShelf } = props;
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <Shelf shelfName="Lendo" books={currentlyReading} updateShelf={updateShelf} />
          <Shelf shelfName="Quero Ler" books={wantToRead} updateShelf={updateShelf} />
          <Shelf shelfName="Já Li" books={read} updateShelf={updateShelf} />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button type="button">Adicionar livro</button>
          </Link>
        </div>
      </div>
    )
};

Library.propTypes = {
  books: PropTypes.instanceOf(Array).isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Library;
