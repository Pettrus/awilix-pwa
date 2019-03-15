import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
    Collapse,
    NavbarBrand,
    Navbar,
    Nav,
    NavItem,
    Button,
    Container,
    Row,
    Col
} from "reactstrap";
import Login from '../Login';

const modalRef = React.createRef();

class ComponentsNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOpen: false,
            color: "navbar-transparent"
        };
    }

    componentDidMount() {
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

    scrollToDownload = () => {
        document
            .getElementById("download-section")
            .scrollIntoView({ behavior: "smooth" });
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
                            <Nav navbar>
                                <NavItem>
                                    <Button
                                        className="nav-link d-none d-lg-block"
                                        color="default"
                                        onClick={() => modalRef.current.toggleModal()}>
                                        <i className="tim-icons icon-cloud-download-93" /> Login
                                </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

                <Login ref={modalRef}></Login>
            </>
        );
    }
}

export default ComponentsNavbar;
