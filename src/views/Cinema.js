import React from 'react';

import { Container, Row, Col } from "shards-react";
import Poster from '../components/common/Poster';
import { checarErro } from '../service/Mensagem';
import { getRequest } from '../service/Api';
import CarregandoPoster from '../components/layout/Loader/CarregandoPoster';
import ModalFilme from '../components/common/ModalFilme';

const modalRef = React.createRef();

export default class Cinema extends React.Component {
    state = {
        filmes: [],
        filmeSelecionado: {},
        carregando: true,
        modal: false
    }

    async componentDidMount() {
        try {
            const filmes = await getRequest("/cinema");

            this.setState({ filmes: filmes });
        } catch (e) {
            checarErro(e.response);
        } finally {
            this.setState({ carregando: false });
        }
    }

    cuidarModal = (modal) => {
        this.setState({ modal: modal });
    }

    render() {
        return (
            <Container fluid className="main-content-container px-4" style={{ marginTop: '1em' }}>
                {this.state.carregando ? (
                    <CarregandoPoster></CarregandoPoster>
                ) : (
                    <>
                        <div className={this.state.modal ? 'esconder' : 'mostrar'}>
                            <Row>
                                {this.state.filmes.map(filme => (
                                    <Col xs="6" sm="4" md="4" lg="3" xl="2" style={{ marginBottom: '1em' }}
                                        onClick={() => {
                                            modalRef.current.abrirModalCinema(filme.tmdbId);
                                            this.setState({ modal: true });
                                        }}
                                        key={filme.imdbId}>
                                        <Poster imagem={filme.imagem} shadow={true}></Poster>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <ModalFilme ref={modalRef} fechouModal={this.cuidarModal}></ModalFilme>
                    </>
                )}
            </Container>
        )
    }
}