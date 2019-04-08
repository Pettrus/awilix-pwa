import React from 'react';
import PropTypes from 'prop-types';

const Poster = ({ filme }) => (
    <img
      alt={filme.imdbId}
      src={filme.imagem}
      className={'image-responsive'} />
);

Poster.propTypes = {
    filme: PropTypes.shape({
        imagem: PropTypes.string
    }).isRequired
}

export default Poster;