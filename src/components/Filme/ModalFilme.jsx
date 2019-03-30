import React from 'react';

import { Button, Modal } from "reactstrap";
import Moment from 'react-moment';
import { getRequest, getUsuarioLogado } from '../../services/Api';
import SkeletonLoaderModal from '../../components/Filme/SkeletonLoaderModal';
import PosterFilme from './PosterFilme';
import { checarErro } from '../../services/Mensagem';

export default class ModalFilme extends React.Component {
    state = {
        modal: false,
        carregando: false,
        filme: {},
        popCorn: {}
    }

    toggleModal = async (filme) => {
        try {
            this.setState({
                modal: !this.state.modal,
                carregando: true,
                popCorn: {}
            });

            if (this.state.modal === false) {
                filme = await getRequest("/filmes/" + filme.id);

                if(getUsuarioLogado() != null)
                    this.carregarPopCorn(filme.imdb_id);
            }

            this.setState({
                filme: filme,
                carregando: false
            });
        } catch (e) {
            checarErro(e.response);
        }
    }

    carregarPopCorn = async(imdb) => {
        try {
            const popCorn = await getRequest("/filmes/popcorn/" + imdb);

            this.setState({ popCorn: popCorn });
        }catch(e) {
            checarErro(e.response);
        }
    }

    downloadMagnetico = () => {
        let torrent = null;
        if(this.state.popCorn.torrents.en["1080p"] != null)
            torrent = this.state.popCorn.torrents.en["1080p"];
        else
            torrent = this.state.popCorn.torrents.en["720p"];

        let link = document.createElement('a')
        link.id = 'someLink';
        link.href = torrent.url;

        document.getElementById('lista').appendChild(link);
        document.getElementById('someLink').click();
        document.getElementById('someLink').outerHTML = '';

        return true;
    }

    render() {
        return (
            <Modal
                size="lg"
                isOpen={this.state.modal}
                toggle={() => this.toggleModal({})}>

                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        onClick={() => this.toggleModal({})}>
                        <i className="tim-icons icon-simple-remove" />
                    </button>

                    <h4 className="title title-up">{this.state.filme.title}</h4>
                </div>

                <div className="modal-body" id="modalBody">
                    {this.state.carregando ? (
                        <SkeletonLoaderModal id="carregando"></SkeletonLoaderModal>
                    ) : (
                            <div id="carregado">
                                <div className="row">
                                    <div className="col-md-4">
                                        <PosterFilme filme={this.state.filme} shadow={false}></PosterFilme>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="text-center">
                                            <strong>{this.state.filme.tagline}</strong>
                                        </div>

                                        <p className="text-justify">
                                            {this.state.filme.overview === '' ? 'Sem descrição' : this.state.filme.overview}
                                        </p>

                                        <hr style={{ width: '100%' }} />

                                        <div className="row">
                                            <div className="col-md-5 text-center">
                                                <strong>Lançamento</strong>
                                                <div>
                                                    <Moment format="DD/MM/YYYY">
                                                        {this.state.filme.release_date}
                                                    </Moment>
                                                </div>
                                            </div>

                                            <div className="col-md-4 text-center">
                                                <strong>Duração</strong>
                                                <div>
                                                    {this.state.filme.runtime}m
                                            </div>
                                            </div>

                                            <div className="col-md-3 text-center">
                                                <strong>Nota</strong>
                                                <div>
                                                    {this.state.filme.vote_average}
                                                </div>
                                            </div>
                                        </div>

                                        <hr style={{ width: '100%' }} />

                                        <div className="row">
                                            <div className="col-4 text-center">
                                                <a className="btn btn-default" href={'https://www.imdb.com/title/' + this.state.filme.imdb_id}
                                                    target="_blank" rel="noopener noreferrer">
                                                    IMDB
                                                </a>
                                            </div>

                                            {this.state.popCorn.torrents != null && this.state.popCorn.torrents.en != null &&
                                                <div id="download" className="col-4 text-center">
                                                    <button className="btn btn-info" onClick={() => this.downloadMagnetico()}>
                                                        <span>Download</span>
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <hr style={{ width: '100%' }} />
                                    </div>

                                    <div className="col-md-6">
                                        <strong>Trailer</strong>
                                        <div className="videoWrapper">
                                            {this.state.filme.videos != null && this.state.filme.videos.length > 0 &&
                                                <iframe title="Trailer" width="853" height="480" allowFullScreen
                                                    src={'https://www.youtube.com/embed/' + this.state.filme.videos[0].key}></iframe>
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>Elenco</strong>
                                        {this.state.filme.cast != null && this.state.filme.cast.slice(0, 4).map(cast => (
                                            <div key={cast.id}>
                                                <div className="cast-detalhe">
                                                    <img src={'http://image.tmdb.org/t/p/w300' + cast.profile_path} alt={cast.name} />
                                                    <h4 style={{ color: 'black' }}>{cast.name}</h4>
                                                    <small>{cast.character}</small>

                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className="modal-footer">
                    <Button
                        color="danger"
                        type="button"
                        onClick={() => this.toggleModal({})}>
                        Fechar
                    </Button>
                </div>

                <div id="lista"></div>
            </Modal>
        )
    }
}