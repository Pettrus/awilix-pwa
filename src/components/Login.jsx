import React from "react";
import classnames from "classnames";

import {
    Button,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal
} from "reactstrap";

export default class Login extends React.Component {
    state = {
        email: "",
        password: "",
        modal: false
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
        });
    }

    login = (event) => {
        try {
            event.preventDefault();
            console.log("Logar");
        }catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Modal
                modalClassName="modal-black"
                isOpen={this.state.modal}
                toggle={() => this.toggleModal({})}>

                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        onClick={() => this.toggleModal("formModal")}>
                        <i className="tim-icons icon-simple-remove text-white" />
                    </button>
                    <div className="text-muted text-center ml-auto mr-auto">
                        <h3 className="mb-0">Entrar</h3>
                    </div>
                </div>

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
                                    placeholder="Password"
                                    type="password"
                                    onFocus={e => this.setState({ passwordFocus: true })}
                                    onBlur={e => this.setState({ passwordFocus: false })}
                                />
                            </InputGroup>
                        </FormGroup>

                        <div className="text-center">
                            <Button className="my-4" color="primary" type="submit">
                                Entrar
                            </Button>

                            <Button className="my-4" color="secondary" type="button">
                                Cadastro
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        );
    }
}