import React from 'react';
import { checarErro } from '../service/Mensagem';
import { getRequest } from '../service/Api';
import { Container, Card, CardBody } from "shards-react";

export default class ConfirmacaoEmail extends React.Component {
    state = {
        carregando: true,
        valido: false
    }

    async componentDidMount() {
        try {
            const valido = await getRequest("/autenticacao/" + this.props.match.params.token);
            setTimeout(() => {
                window.location.pathname = '/nos-cinemas';
            }, 3000);

            this.setState({ valido: valido });
        } catch (e) {
            checarErro(e.response);
        } finally {
            this.setState({ carregando: false });
        }
    }

    render () {
        return (
            <Container fluid className="main-content-container px-4" style={{ marginTop: '1em' }}>
                <Card>
                    <CardBody>
                        {this.state.carregando ? (
                            <h2>Carregando...</h2>
                        ) : (
                            <>
                                {this.state.valido ? (
                                    <span>Email confirmado com sucesso!</span>
                                ) : (
                                    <span>Token de confirmação inválido</span>
                                )}

                                <div>
                                    Você será redirecionado em instantes.
                                </div>
                            </>
                        )}
                    </CardBody>
                </Card>
            </Container>
        )
    }
}