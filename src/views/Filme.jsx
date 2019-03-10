import React from "react";

import { getRequest } from '../services/Api';
import { Button } from "reactstrap";

import InfiniteScroll from 'react-infinite-scroller';

import axios from 'axios';
import ModalFilme from '../components/Filme/ModalFilme';
import PosterFilme from "../components/Filme/PosterFilme";

const modalRef = React.createRef();

class Filme extends React.Component {

    state = {
        filmes: [],
        genero: "",
        generos: [],
        pagina: 1,
        palavraChave: "",
        queryPesquisa: null,
        temMaisFilmes: true
    }

    async componentDidMount() {
        try {
            const [filmes, generos] = await axios.all([
                getRequest("/filmes/nos-cinemas/1"),
                getRequest("/filmes/generos")
            ]);

            this.setState({
                filmes: filmes,
                generos: generos,
                queryPesquisa: "/filmes/nos-cinemas/"
            });
        } catch (e) {
            console.log(e);
        }
    }

    pesquisar = async () => {
        try {
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
                temMaisFilmes: true
            });
        } catch (e) {
            console.log(e);
        }
    }

    carregarMais = async () => {
        try {
            if (this.state != null && this.state.filmes.length > 0) {
                const pagina = this.state.pagina + 1;

                console.log("Esta mandando requisicao");
                const novos = await getRequest(this.state.queryPesquisa + pagina);

                if (novos == null || novos.length == 0) {
                    this.setState({
                        temMaisFilmes: false
                    });
                } else {
                    let filmes = [];

                    filmes = filmes.concat(this.state.filmes);
                    filmes = filmes.concat(novos);

                    this.setState({
                        filmes: filmes,
                        pagina: pagina
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    alterarGenero = (event) => {
        console.log(event.target.value);
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
                <img alt="..." className="path" src={require("assets/img/path1.png")} />

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
                                    onChange={this.alterarPalavraChave} />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <Button
                                color="warning"
                                type="button"
                                style={{ marginTop: '2.1em' }}
                                onClick={() => this.pesquisar()}>
                                Pesquisar
                            </Button>
                        </div>
                    </div>

                    {this.state.filmes.length > 0 ? (
                        <InfiniteScroll
                            loadMore={() => this.carregarMais()}
                            hasMore={this.state.temMaisFilmes}
                            loader={'<Carregando></Carregando>'}>

                            <div className="row">
                                {this.state.filmes.map(filme => (
                                    <div key={filme.id} className="col-md-4 col-lg-3" onClick={() => modalRef.current.toggleModal(filme)}>
                                        <PosterFilme filme={filme} shadow={true}></PosterFilme>
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>
                    ) : (
                            <div className="text-center" style={{ marginTop: '2em' }}>
                                <h4>Nenhum filme encontrado</h4>
                            </div>
                        )
                    }

                    <ModalFilme ref={modalRef}></ModalFilme>
                </div>
            </div>
        );
    }
}

export default Filme;