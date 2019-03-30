import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-skeleton-loader';

const PosterFilme = ({ filme, shadow }) => (
    <LazyLoadImage
      alt={filme.title}
      src={'http://image.tmdb.org/t/p/w300' + filme.poster_path}
      className={'image-responsive ' + (shadow ? 'margem-row pointer card-imagem' : '')}
      effect="opacity"
      threshold={25}
      placeholder={<Skeleton width={'100%'} height={'300px'} color={'#323962'} widthRandomness={0} />} />
);

PosterFilme.propTypes = {
    filme: PropTypes.shape({
        poster_path: PropTypes.string
    }).isRequired
}

export default PosterFilme;