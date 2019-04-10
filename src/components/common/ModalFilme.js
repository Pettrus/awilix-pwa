import React from 'react';
import { checarErro } from '../../service/Mensagem';
import { getRequest } from '../../service/Api';
import Poster from './Poster';
import Moment from 'react-moment';
import ModalLoader from '../layout/Loader/ModalLoader';
import { 
    Row, Col, Card, CardHeader, CardBody, ListGroup,
    ListGroupItem 
} from "shards-react";
import HorariosCinemas from './HorariosCinemas';

const modalRef = React.createRef();

export default class ModalFilme extends React.Component {
    state = {
        modal: false,
        filme: {},
        cinemas: [],
        carregando: false,
    }

    abrirModalCinema = async (tmdb) => {
        try {
            this.setState({ modal: true, carregando: true });
            const dto = await getRequest("/cinema/" + tmdb);
            const cinemas = [];

            dto.horarios.forEach((h) => {
                const index = cinemas.findIndex(e => e.nome === h.cinema.nome);

                if (index > -1) {
                    cinemas[index].horarios.push(h);
                } else
                    cinemas.push({
                        nome: h.cinema.nome,
                        horarios: [h]
                    });
            });

            this.setState({ filme: dto.detalhes, cinemas: cinemas });
        } catch(e) {
            checarErro(e.response);
        } finally {
            this.setState({ carregando: false });
        }
    }

    fecharModal() {
        this.setState({ modal: false, filme: {}});
        this.props.fechouModal(false);
    }

    render () {
        return (
            <div className={'modal-over ' + (this.state.modal ? 'mostrar' : 'esconder')}>
                <div>
                    <div className="pointer" onClick={() => this.fecharModal()}
                        style={{ fontSize: '2em', float: 'left', marginRight: '0.5em' }}>
                        <i className="material-icons">
                            close
                        </i>
                    </div>
                    <div className="modal-over-titulo">
                        {this.state.carregando ? 'Carregando...' : this.state.filme.title}
                    </div>
                    <hr />
                    <div style={{clear:'both'}}></div>
                </div>

                {this.state.carregando ? (
                    <ModalLoader></ModalLoader>
                ) : (
                    <div>
                        <Row>
                            <Col sm="6" md="4" lg="3" xl="3">
                                <Card style={{marginBottom: '10px'}}>
                                    <CardHeader className="border-bottom text-center 
                                    sem-padding detalhe-poster">
                                        {this.state.filme.poster_path != null &&
                                            <Poster imagem={'https://image.tmdb.org/t/p/w300' +
                                                this.state.filme.poster_path}></Poster>
                                        }
                                    </CardHeader>

                                    <ListGroup flush>
                                        <ListGroupItem className="px-4 text-center" title="Nota">
                                            <i className="material-icons" style={{marginRight: '-5em'}}>
                                                star_rate
                                            </i>
                                            {this.state.filme.vote_average}
                                        </ListGroupItem>

                                        <ListGroupItem className="px-4 text-center pointer"
                                        title="Horários nos cinema" 
                                        onClick={() => modalRef.current.toggleHorarios()}>
                                            Horários
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>

                            <Col sm="6" md="8" lg="9" xl="6" style={{marginBottom: '10px'}}>
                                <Card>
                                    <CardBody>
                                        <div className="text-center" style={{display: 'flex'}}>
                                            <div className="centro-margin">
                                                <span style={{fontWeight: 'bold'}}>Lançamento</span>
                                                <div>
                                                    <Moment format="DD/MM/YYYY">
                                                        {this.state.filme.release_date}
                                                    </Moment>
                                                </div>
                                            </div>

                                            <div className="centro-margin">
                                                <span style={{fontWeight: 'bold'}}>Duração</span>
                                                <div>
                                                    {this.state.filme.runtime}m
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-justify" style={{marginTop: '0.5em'}}>
                                            {this.state.filme.overview === '' ? 'Sem descrição' : 
                                                this.state.filme.overview}
                                        </p>
                                    </CardBody>
                                </Card>

                                {this.state.filme.videos != null && this.state.filme.videos.length > 0 &&
                                    <div className="videoWrapper" style={{marginTop: '1em'}}>
                                        <iframe title="Trailer" width="853" height="480" allowFullScreen
                                            src={'https://www.youtube.com/embed/' + this.state.filme.videos[0].key}></iframe>
                                    </div>
                                }
                            </Col>

                            <Col sm="12" md="12" lg="12" xl="3">
                                <Card>
                                    <CardBody>
                                        {this.state.filme.cast != null && this.state.filme.cast.slice(0, 5).map(cast => (
                                            <div key={cast.id} className="cast-detalhe">
                                                <img src={'https://image.tmdb.org/t/p/w300' + cast.profile_path} 
                                                alt={''} />
                                                <h5>{cast.name}</h5>
                                                <small>{cast.character}</small>

                                                <div className="clear"></div>
                                            </div>
                                        ))}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}

                <HorariosCinemas ref={modalRef} cinemas={this.state.cinemas}></HorariosCinemas>
            </div>
        )
    }
}