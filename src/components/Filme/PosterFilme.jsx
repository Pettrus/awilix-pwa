import React from 'react';
import PropTypes from 'prop-types';

const PosterFilme = ({ filme, shadow }) => (
    <img src={'http://image.tmdb.org/t/p/w300' + filme.poster_path} alt="Poster"
        className={'image-responsive ' + (shadow ? 'margem-row pointer card-imagem' : '')} />
);

PosterFilme.propTypes = {
    filme: PropTypes.shape({
        poster_path: PropTypes.string
    }).isRequired
}

export default PosterFilme;