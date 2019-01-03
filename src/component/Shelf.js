import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente que representa a estante da biblioteca. 
 * Possui os estados: currentlyReading, wantToRead, read e none
 * @param { shelfName, books } props 
 */
const Shelf = props => {
    const { shelfName, books } = props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Array.isArray(books) && books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 170, backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(https://dummyimage.com/128x170/4f4f4f/ffffff.jpg&text=No+Book+Art)`) }}>
                      {/* TODO Colocar menu drop-down */}
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
            {books.length <= 0 && <div>Carregando...</div>}
          </ol>
        </div>
      </div>
    )
}

Shelf.propTypes = {
    books: PropTypes.instanceOf(Array).isRequired,
    shelfName: PropTypes.string.isRequired
};

export default Shelf;