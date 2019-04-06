import React from "react";
import { Link } from "react-router-dom";

import {
    Collapse,
    NavbarBrand,
    Navbar,
    Nav,
    NavLink,
    NavItem,
    Button,
    Container,
    Row,
    Col
} from "reactstrap";
import Login from '../Login';

const modalRef = React.createRef();

class ComponentsNavbar extends React.Component {
    state = {
        usuario: null
    }

    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent"
        };
    }

    componentDidMount() {
        this.atualizarUsuario();

        window.addEventListener('storage', () => {
            this.atualizarUsuario();
        });

        window.addEventListener("scroll", this.changeColor);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
    }

    changeColor = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            this.setState({
                color: "bg-info"
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            this.setState({
                color: "navbar-transparent"
            });
        }
    }

    toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    }

    onCollapseExiting = () => {
        this.setState({
            collapseOut: "collapsing-out"
        });
    }

    onCollapseExited = () => {
        this.setState({
            collapseOut: ""
        });
    }

    sair = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("usuario");

        window.dispatchEvent( new Event('storage') );
    }

    atualizarUsuario = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        this.setState({ usuario: usuario });
    }

    abrirModalLogin = () => {
        this.setState({ collapseOpen: false });
        modalRef.current.toggleModal();
    }

    render() {
        return (
            <>
                <Navbar
                    className={"fixed-top " + this.state.color}
                    color-on-scroll="100"
                    expand="lg">
                    <Container>
                        <div className="navbar-translate">
                            <NavbarBrand
                                data-placement="bottom"
                                to="/"
                                rel="noopener noreferrer"
                                title="Designed and Coded by Creative Tim"
                                tag={Link}
                            >
                                <span>Awilix• </span>
                                Encontre o filme que deseja
                        </NavbarBrand>
                            <button
                                aria-expanded={this.state.collapseOpen}
                                className="navbar-toggler navbar-toggler"
                                onClick={this.toggleCollapse}
                            >
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>
                        <Collapse
                            className={"justify-content-end " + this.state.collapseOut}
                            navbar
                            isOpen={this.state.collapseOpen}
                            onExiting={this.onCollapseExiting}
                            onExited={this.onCollapseExited}>
                            <div className="navbar-collapse-header">
                                <Row>
                                    <Col className="collapse-brand" xs="6">
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            Awilix•Encontre o filme que deseja
                                        </a>
                                    </Col>
                                    <Col className="collapse-close text-right" xs="6">
                                        <button
                                            aria-expanded={this.state.collapseOpen}
                                            className="navbar-toggler"
                                            onClick={this.toggleCollapse}
                                        >
                                            <i className="tim-icons icon-simple-remove" />
                                        </button>
                                    </Col>
                                </Row>
                            </div>

                            {this.state.usuario != null ? (
                                <div style={{color: 'white'}}>
                                    Olá {this.state.usuario.nome}

                                    <Button color="default" onClick={() => this.sair()}>
                                        Sair
                                    </Button>
                                </div>
                            ) : (
                                <Nav navbar>
                                    <NavItem className="p-0">
                                        <NavLink
                                            data-placement="bottom"
                                            rel="noopener noreferrer"
                                            title="Faça login"
                                            className="pointer"
                                            onClick={() => this.abrirModalLogin()}>

                                            <i className="tim-icons icon-lock-circle" /> Login
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            )}
                        </Collapse>
                    </Container>
                </Navbar>

                <Login ref={modalRef}></Login>
            </>
        );
    }
}

export default ComponentsNavbar;
