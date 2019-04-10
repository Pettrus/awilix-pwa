import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { Row, Col } from "shards-react";

const CarregandoPoster = () => (
    <Row>
        {[...Array(15)].map((e, i) => (
            <Col xs="6" sm="4" md="4" lg="3" xl="2" style={{marginBottom: '1em'}}
            key={i}> 
                <Skeleton width={'100%'} color={'#C0C0C0'} height={'300px'} widthRandomness={0} />
            </Col>
        ))}
    </Row>
);

export default CarregandoPoster;