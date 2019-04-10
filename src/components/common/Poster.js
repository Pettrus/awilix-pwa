import React from 'react';

const Poster = ({ imagem, shadow }) => (
    <img
        alt={imagem}
        src={imagem}
        className={'image-responsive ' + (shadow ? 'poster pointer' : '')} />
);

export default Poster;