import React from "react";

import { getRequest } from '../services/Api';
import { Button } from "reactstrap";

import InfiniteScroll from 'react-infinite-scroller';

import axios from 'axios';
import ModalFilme from '../components/Filme/ModalFilme';
import PosterFilme from "../components/Filme/PosterFilme";
import SkeletonLoaderFilme from '../components/Filme/SkeletonLoaderFilme';
import ScrollToTop from "../components/Filme/ScrollToTop";
import ReactLoading from 'react-loading';
import { checarErro } from '../services/Mensagem';

const modalRef = React.createRef();

class Filme extends React.Component {

    state = {
        filmes: [],
        genero: "",
        generos: [],
        pagina: 1,
        palavraChave: "",
        queryPesquisa: null,
        temMaisFilmes: true,
        carregando: false
    }

    async componentDidMount() {
        try {
            this.setState({
                carregando: true
            });

            const [filmes, generos] = await axios.all([
                getRequest("/filmes/nos-cinemas/1"),
                getRequest("/filmes/generos")
            ]);

            console.log(filmes);

            this.setState({
                filmes: filmes,
                generos: generos,
                queryPesquisa: "/filmes/nos-cinemas/"
            });
        } catch (e) {
            checarErro(e);
        } finally {
            this.setState({ carregando: false });
        }
    }

    pesquisar = async () => {
        try {
            this.setState({ carregando: true });

            let queryPesquisa = "";

            if (this.state.palavraChave)
                queryPesquisa = `/filmes/${this.state.palavraChave}/1`;
            else if (this.state.genero)
                queryPesquisa = `/filmes/genero/${this.state.genero}/1`;
            else
                queryPesquisa = `/filmes/nos-cinemas/1`;

            const filmes = await getRequest(queryPesquisa);

            this.setState({
                filmes: filmes,
                pagina: 1,
                queryPesquisa: queryPesquisa,
                temMaisFilmes: true,
                carregando: false
            });
        } catch (e) {
            checarErro(e.response);
        }
    }

    carregarMais = async () => {
        try {
            if (this.state != null && this.state.filmes.length > 0) {
                console.log("Chamou o carregar mais");

                const pagina = this.state.pagina + 1;
                const novos = await getRequest(this.state.queryPesquisa + pagina);

                if (novos === null || novos.length === 0) {
                    this.setState({
                        temMaisFilmes: false
                    });
                } else {
                    let filmes = [];

                    filmes = filmes.concat(this.state.filmes);
                    filmes = filmes.concat(novos);

                    console.log("Mais filmes");
                    console.log(filmes);

                    this.setState({
                        filmes: filmes,
                        pagina: pagina
                    });
                }
            }
        } catch (e) {
            checarErro(e.response);
        }
    }

    alterarGenero = (event) => {
        this.setState({
            genero: event.target.value,
            palavraChave: ""
        });
    }

    alterarPalavraChave = (event) => {
        this.setState({
            palavraChave: event.target.value,
            genero: ""
        });
    }

    render() {
        return (
            <div className="section section-basic" id="basic-elements">
                <img alt="..." className="path" src={"/assets/img/path1.png"} />

                <div className="container">
                    <h2 className="title">Descobrir filmes</h2>

                    <div className="row" style={{ marginBottom: '1em' }}>
                        <div className="col-md-4">
                            <div className="form-group">
                                <h5>Generos</h5>
                                <select id="generos" className="form-control" value={this.state.genero}
                                    onChange={this.alterarGenero}>
                                    <option value={''}>Todos</option>
                                    {this.state.generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>{genero.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <h5>Palavra-chave</h5>
                                <input type="text" className="form-control" value={this.state.palavraChave} placeholder="Filtrar por palavras chaves"
                                    onChange={this.alterarPalavraChave} id="palavraChave" />
                            </div>
                        </div>

                        <div className="col-md-2 text-center">
                            <Button
                                color="warning"
                                type="button"
                                disabled={this.state.carregando}
                                style={{ marginTop: '2.1em' }}
                                onClick={() => this.pesquisar()}>
                                Pesquisar
                            </Button>
                        </div>
                    </div>

                    {this.state.carregando === true &&
                        <SkeletonLoaderFilme></SkeletonLoaderFilme>
                    }

                    <div>
                        {this.state.filmes.length > 0 ? (
                            <InfiniteScroll
                                id="scroll"
                                loadMore={() => this.carregarMais()}
                                hasMore={this.state.temMaisFilmes}
                                loader={<ReactLoading key={1} className="centralizar" />}>

                                <div className="row">
                                    {this.state.filmes.map(filme => (
                                        <div key={filme.id} className="col-6 col-md-4 col-lg-3" onClick={() => modalRef.current.toggleModal(filme)}>
                                            <PosterFilme filme={filme} shadow={true}></PosterFilme>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        ) : (
                                <div id="semFilmes" className="text-center" style={{ marginTop: '2em' }}>
                                    <h4>Nenhum filme encontrado</h4>
                                </div>
                            )
                        }
                    </div>

                    <ModalFilme ref={modalRef}></ModalFilme>
                </div>

                <ScrollToTop></ScrollToTop>
            </div>
        );
    }
}

export default Filme;