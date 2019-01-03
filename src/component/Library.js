import React from 'react'
// import PropTypes from 'prop-types'

/**
 * Componente que representa a biblioteca, encapsulando todas as estantes dos livros
 * @param { books } props 
 */
const Library = props => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <h2>BOOKS</h2>
        </div>
        {/* TODO Colocar o campo de busca aqui */}
      </div>
    )
};

export default Library;
