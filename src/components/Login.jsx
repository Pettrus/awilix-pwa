import React from "react";
import classnames from "classnames";

import {
    Button,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal
} from "reactstrap";
import CadastroUsuario from "./CadastroUsuario";
import { logar } from "../services/Api";
import { mensagemToast } from '../services/Mensagem';

export default class Login extends React.Component {
    state = {
        email: "",
        senha: "",
        modal: false,
        modoCadastro: false,
        carregando: false
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    login = async (event) => {
        try {
            event.preventDefault();
            this.setState({ carregando: true });

            await logar({
                email: this.state.email,
                senha: this.state.senha
            });

            this.toggleModal();
        } catch (e) {
            mensagemToast("Email ou senha incorretos.", "warn");
        } finally {
            this.setState({ carregando: false });
        }
    }

    cadastro = (mostrar) => {
        this.setState({
            modoCadastro: mostrar
        });
    }

    render() {
        return (
            <Modal
                modalClassName="modal-black modal-cadastro"
                isOpen={this.state.modal}
                toggle={() => this.toggleModal({})}>

                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        onClick={() => this.toggleModal("formModal")}>
                        <i className="tim-icons icon-simple-remove text-white" />
                    </button>
                    <div className="text-muted text-center ml-auto mr-auto">
                        <h3 className="mb-0">
                            {this.state.modoCadastro ? "Cadastrar" : "Entrar"}
                        </h3>
                    </div>
                </div>

                {!this.state.modoCadastro ? (
                    <div className="modal-body">
                        <Form role="form" onSubmit={this.login}>
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
                                        onChange={e => this.setState({ email: e.target.value })}
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
                                        onChange={e => this.setState({ senha: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit" disabled={this.state.carregando}>
                                    Entrar
                                </Button>

                                <Button className="my-4" color="secondary" type="button" disabled={this.state.carregando}
                                onClick={() => this.cadastro(true)}>
                                    Cadastro
                                </Button>
                            </div>
                        </Form>
                    </div>
                ) : (
                        <CadastroUsuario voltar={this.cadastro}></CadastroUsuario>
                    )}
            </Modal>
        );
    }
}