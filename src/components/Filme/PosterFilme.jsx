import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';

const PosterFilme = ({ filme, shadow }) => (
    <LazyLoad 
      debounce={false}
      offsetVertical={500}
      >
        <img src={'http://image.tmdb.org/t/p/w300' + filme.poster_path} alt="Poster"
            className={'image-responsive ' + (shadow ? 'margem-row pointer card-imagem' : '')} />
    </LazyLoad>
);

PosterFilme.propTypes = {
    filme: PropTypes.shape({
        poster_path: PropTypes.string
    }).isRequired
}

export default PosterFilme;