import React from 'react';

import { Container, Row, Col } from "shards-react";
import Poster from '../components/common/Poster';
import { checarErro } from '../service/Mensagem';
import { getRequest } from '../service/Api';

export default class Cinema extends React.Component {
    state = {
        filmes: []
    }

    async componentDidMount() {
        try {
            const filmes = await getRequest("/cinema");
            console.log(filmes);

            this.setState({ filmes: filmes });
        } catch (e) {
            checarErro(e.response);
        }
    }

    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row>
                    {this.state.filmes.map(filme => (
                        <Col xs="6" sm="4" md="4" lg="3" xl="2" style={{marginBottom: '1em'}} key={filme.imdbId}>
                            <Poster filme={filme}></Poster>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}