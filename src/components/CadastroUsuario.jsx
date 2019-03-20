import React from 'react';
import classnames from "classnames";
import {
    Button,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";
import { postRequest } from '../services/Api';
import { mensagemToast, checarErro } from '../services/Mensagem';

export default class CadastroUsuario extends React.Component {
    state = {
        email: "",
        nome: "",
        senha: "",
        senhaRepetida: "",
        carregando: false
    }

    cadastrar = async (e) => {
        try {
            e.preventDefault();

            if (this.state.senha !== this.state.senhaRepetida) {
                mensagemToast("Senhas não conferem", "warn");
                return;
            }

            this.setState({ carregando: true });

            const usuario = {
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            };

            await postRequest("/autenticacao", usuario);

            mensagemToast("Um email foi enviado para você contendo mais informações do cadastro");

            this.voltar();
        } catch (e) {
            checarErro(e.response);
        } finally {
            this.setState({ carregando: false });
        }
    }

    voltar = () => {
        this.props.voltar(false);
    }

    render() {
        return (
            <div className="modal-body">
                <Form role="form" onSubmit={this.cadastrar}>
                    <FormGroup className="mb-3">
                        <InputGroup
                            className={classnames("input-group-alternative", {
                                "input-group-focus": this.state.nomeFocus
                            })}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-badge" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Nome"
                                type="text"
                                onFocus={e => this.setState({ nomeFocus: true })}
                                onBlur={e => this.setState({ nomeFocus: false })}
                                value={this.state.nome}
                                onChange={e => this.setState({ nome: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <InputGroup
                            className={classnames("input-group-alternative", {
                                "input-group-focus": this.state.emailFocus
                            })}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-email-85" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Email"
                                type="email"
                                onFocus={e => this.setState({ emailFocus: true })}
                                onBlur={e => this.setState({ emailFocus: false })}
                                value={this.state.email}
                                onChange={e => this.setState({ ...this.state.usuario, email: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup
                            className={classnames("input-group-alternative", {
                                "input-group-focus": this.state.passwordFocus
                            })}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-key-25" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Senha"
                                type="password"
                                onFocus={e => this.setState({ passwordFocus: true })}
                                onBlur={e => this.setState({ passwordFocus: false })}
                                value={this.state.senha}
                                onChange={e => this.setState({ ...this.state.usuario, senha: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <InputGroup
                            className={classnames("input-group-alternative", {
                                "input-group-focus": this.state.passwordRepetidoFocus
                            })}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="tim-icons icon-key-25" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Repetir Senha"
                                type="password"
                                onFocus={e => this.setState({ passwordRepetidoFocus: true })}
                                onBlur={e => this.setState({ passwordRepetidoFocus: false })}
                                value={this.state.senhaRepetida}
                                onChange={e => this.setState({ ...this.state.usuario, senhaRepetida: e.target.value })}
                            />
                        </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                        <Button className="my-4" color="info" type="submit" disabled={this.state.carregando}>
                            Cadastrar
                        </Button>

                        <Button className="my-4" color="secondary" type="button" onClick={this.voltar} disabled={this.state.carregando}>
                            Voltar
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}