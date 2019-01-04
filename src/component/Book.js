import React from 'react'
import PropTypes from 'prop-types';

/**
 * Componente que representa um livro, com as ações de mudança de prateleira
 * @param {book, updateShelf} props 
 */
const Book = props => {
    const { book, updateShelf } = props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 170, backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(https://dummyimage.com/128x170/4f4f4f/ffffff.jpg&text=No+Book+Art)`) }}>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={e => updateShelf(book, e.target.value)}>
                <option disabled>Mover para...</option>
                <option value="currentlyReading">Lendo</option>
                <option value="wantToRead">Quero Ler</option>
                <option value="read">Já Li</option>
                <option value="none">Nenhum</option>
              </select>
            </div>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', '): ''}</div>
      </div>
    )
}

Book.propTypes = {
    book: PropTypes.instanceOf(Object).isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default Book;
