import React from "react";
import classnames from "classnames";
import CadastroUsuario from './CadastroUsuario';
import { logar } from '../../../../service/Api';
import { checarErro, mensagemToast } from '../../../../service/Mensagem';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Button
} from "shards-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input
} from 'reactstrap';

export default class UserActions extends React.Component {
  state = {
    usuario: {},
    modal: false,
    carregando: false,
    email: "",
    senha: "",
    modoCadastro: false
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  componentDidMount() {
    this.atualizarUsuario();

    window.addEventListener('storage', () => {
      this.atualizarUsuario();
    });
  }

  login = async (event) => {
    try {
      event.preventDefault();
      if((this.state.email === '' || this.state.email == null) 
      && (this.state.senha === '' || this.state.senha == null)) {
        mensagemToast("Preencha email e senha", "warn");
        return;
      }
      this.setState({ carregando: true });

      await logar({
        email: this.state.email,
        senha: this.state.senha
      });

      this.toggleModal();
    } catch (e) {
      checarErro(e.response);
    } finally {
      this.setState({ carregando: false });
    }
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  atualizarUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    this.setState({ usuario: usuario });
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  cadastro = (mostrar) => {
    this.setState({
      modoCadastro: mostrar
    });
  }

  sair = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario");

    window.dispatchEvent( new Event('storage') );
  }

  render() {
    return (
      <>
        {this.state.usuario != null ? (
          <NavItem className="pointer" tag={Dropdown} caret toggle={this.toggleUserActions}>
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
              <img
                className="user-avatar rounded-circle mr-2"
                src={'https://api.adorable.io/avatars/285/' + this.state.usuario.nome}
                alt="User Avatar"
              />{" "}
              <span className="d-none d-md-inline-block">{this.state.usuario.nome}</span>
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>
              <DropdownItem divider />
              <DropdownItem className="text-danger pointer" onClick={() => this.sair()}>
                <i className="material-icons text-danger">&#xE879;</i> Logout
              </DropdownItem>
            </Collapse>
          </NavItem>
        ) : (
          <div>
            <Button className="botao-login" onClick={() => this.toggleModal()}>
              <i className="material-icons">lock</i>
              Login
            </Button>
          </div>
        )}

        <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>
          <ModalHeader toggle={() => this.toggleModal()}>Login</ModalHeader>

          <ModalBody>
            {this.state.modoCadastro === true ? (
              <div>
                <CadastroUsuario voltar={this.cadastro}></CadastroUsuario>
              </div>
            ) : (
              <Form id="form" role="form" onSubmit={this.login}>
                <FormGroup className="mb-3">
                  <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": this.state.emailFocus
                    })}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="material-icons">email</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      id="email"
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
                        <i className="material-icons">lock</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Senha"
                      type="password"
                      id="senha"
                      onFocus={e => this.setState({ passwordFocus: true })}
                      onBlur={e => this.setState({ passwordFocus: false })}
                      value={this.state.senha}
                      onChange={e => this.setState({ senha: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button id="entrar" className="my-4" theme="primary"
                    type="submit" disabled={this.state.carregando} style={{ marginRight: '1em' }}>
                    Entrar
                  </Button>

                  <Button id="mostrarModalCadastro" className="my-4" theme="secondary" type="button"
                    disabled={this.state.carregando} onClick={() => this.cadastro(true)}>
                    Cadastro
                  </Button>
                </div>
              </Form>
            )}
          </ModalBody>
        </Modal>
      </>
    );
  }
}
