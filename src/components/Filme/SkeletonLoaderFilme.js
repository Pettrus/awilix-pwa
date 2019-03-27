import React from 'react';
import Skeleton from 'react-skeleton-loader';

const SkeletonLoaderFilme = () => (
    <div className="row">
        {[...Array(15)].map((e, i) => (
            <div className="col-6 col-md-4 col-lg-3" key={i}>
                <Skeleton width={'100%'} height={'300px'} color={'#323962'} widthRandomness={0} />
            </div>
        ))}
    </div>
);

export default SkeletonLoaderFilme;