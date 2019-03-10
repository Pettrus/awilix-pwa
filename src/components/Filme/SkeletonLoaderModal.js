import React from 'react';
import Skeleton from 'react-skeleton-loader';

const SkeletonLoaderModal = () => (
    <div>
        <div className="row">
            <div className="col-md-4">
                <Skeleton width={'100%'} />
            </div>

            <div className="col-md-8">
                <div className="text-center">
                    <Skeleton width={'70%'} count={1} />
                </div>

                <p className="text-justify">
                    <Skeleton width={'100%'} count={6} />
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-md-12">
                <hr style={{ width: '100%' }} />
            </div>

            <div className="col-md-6">
                <strong>Trailer</strong><br/>
                <Skeleton width={'100%'} />
            </div>

            <div className="col-md-6">
                <strong>Elenco</strong>
                <p>
                    <Skeleton width={'70%'} count={4} />
                </p>
            </div>
        </div>
    </div>
);

export default SkeletonLoaderModal;