import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';

/**
 * Componente que representa a biblioteca, encapsulando todas as estantes dos livros
 * @param { books } props 
 */
const Library = props => {
    const { books } = props;
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <Shelf shelfName="Lendo" books={currentlyReading} />
          <Shelf shelfName="Quero Ler" books={wantToRead} />
          <Shelf shelfName="Já Li" books={read} />
        </div>
        {/* TODO Colocar o campo de busca aqui */}
      </div>
    )
};

Library.propTypes = {
  books: PropTypes.instanceOf(Array).isRequired
}

export default Library;
