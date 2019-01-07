import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

/**
 * Componente que representa um livro, com as ações de mudança de prateleira
 * Usando pureComponent, já implementa o ciclo de vida shouldComponentUpdate 
 * @param {book, updateShelf} props 
 */
class Book extends PureComponent {

  render() {
    const { book, updateShelf } = this.props;
    const shelfValue = book.hasOwnProperty('shelf') ? book.shelf : 'none';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 170, backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(http://i64.tinypic.com/1610pah.jpg)`) }}>
            <div className="book-shelf-changer">
              <select value={shelfValue} onChange={e => updateShelf(book, e.target.value)}>
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
}

Book.propTypes = {
    book: PropTypes.instanceOf(Object).isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default Book;
