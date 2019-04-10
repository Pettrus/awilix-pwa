import React from 'react';
import Skeleton from 'react-skeleton-loader';
import { Row, Col } from "shards-react";

export default class ModalLoader extends React.Component {
    render () {
        return (
            <div>
                <Row>
                    <Col sm="6" md="4" lg="3" xl="3">
                        <Skeleton width={'100%'} color={'#C0C0C0'} height={'300px'} 
                        widthRandomness={0} />
                    </Col>

                    <Col sm="6" md="8" lg="9" xl="6">
                        <Skeleton width={'100%'} color={'#C0C0C0'} height={'170px'} 
                        widthRandomness={0} />

                        <Skeleton width={'100%'} color={'#C0C0C0'} height={'170px'} 
                        widthRandomness={0} />
                    </Col>

                    <Col sm="12" md="12" lg="12" xl="3">
                        <Skeleton width={'100%'} color={'#C0C0C0'} height={'350px'}
                        widthRandomness={0} />
                    </Col>
                </Row>
            </div>
        )
    }
}