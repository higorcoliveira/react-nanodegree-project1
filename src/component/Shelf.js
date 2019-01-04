import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * Componente que representa a estante da biblioteca. 
 * Possui os estados: currentlyReading, wantToRead, read e none
 * @param { shelfName, books, updateShelf } props 
 */
const Shelf = props => {
    const { shelfName, books, updateShelf, hideLoading } = props;
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Array.isArray(books) && books.map((book) => (
              <li key={book.id}>
                <Book book={book} updateShelf={updateShelf} />
              </li>
            ))}
            {books.length <= 0 && !hideLoading && <div>Carregando...</div>}
          </ol>
        </div>
      </div>
    )
}

Shelf.propTypes = {
    books: PropTypes.instanceOf(Array).isRequired,
    shelfName: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired,
    hideLoading: PropTypes.bool
};

Shelf.defaultProps = {
  hideLoading: false
}

export default Shelf;