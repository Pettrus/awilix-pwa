import React from "react";
import { getRequest } from '../services/Api';
import { checarErro } from '../services/Mensagem';
import IndexNavbar from '../components/Navbars/IndexNavbar';

export default class ConfirmacaoEmail extends React.Component {
    state = {
        carregando: true,
        valido: false
    }

    async componentDidMount() {
        try {
            console.log(this.props.match.params.token);
            const valido = await getRequest("/autenticacao/" + this.props.match.params.token);
            setTimeout(() => {
                window.location.pathname = '/';
            }, 3000);

            this.setState({ valido: valido });
        } catch (e) {
            checarErro(e.response);
        } finally {
            this.setState({ carregando: false });
        }
    }

    render() {
        return (
            <>
                <IndexNavbar />
                <div className="wrapper">
                    <div className="main">
                        <div className="section section-basic">
                            <div className="container">
                                <div className="card" style={{ marginTop: '2em' }}>
                                    <div className="card-body text-center" style={{ color: 'white' }}>
                                        {this.state.valido ? (
                                            <div>
                                                Email confirmado com sucesso!
                                    </div>
                                        ) : (
                                                <div>
                                                    Token de confirmação inválido
                                    </div>
                                            )}

                                        <div>
                                            Você será redirecionado em instantes.
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}