import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Shelf from './Shelf'

/**
 * Componente que representa a busca dos livros, sendo possível modificar o estado,
 * colocando na estante o livro buscado
 */
class Search extends Component {

    // TODO Esvazia a busca quando o componente é renderizado
    componentDidMount() {
        const { clearBooks } = this.props;
        clearBooks();
    }

    render() {
        const { books, updateShelf, searchBook } = this.props;
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Voltar</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Procurar Livros..."
                  value={books.string}
                  onChange={searchBook}
                />
              </div>
            </div>
            <div className="search-books-results">
              <Shelf shelfName="Resultados da Busca" books={books} updateShelf={updateShelf} hideLoading={true} />
            </div>
          </div>
        )
    }
}

Search.propTypes = {
  books: PropTypes.instanceOf(Array).isRequired,
  updateShelf: PropTypes.func.isRequired,
  clearBooks: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired
}

export default Search;
