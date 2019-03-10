import React from 'react';
import { Button } from "reactstrap";

export default class ScrollToTop extends React.Component {

    state = {
        mostrar: false
    }

    componentDidMount() {
        window.addEventListener("scroll", this.mostrarBotao);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.mostrarBotao);
    }

    mostrarBotao = () => {
        if (
            document.documentElement.scrollTop > 99 ||
            document.body.scrollTop > 99
        ) {
            this.setState({
                mostrar: true
            });
        } else if (
            document.documentElement.scrollTop < 100 ||
            document.body.scrollTop < 100
        ) {
            this.setState({
                mostrar: false
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.mostrar === true &&
                    <Button className="btn-neutral btn-round btn-icon botao-topo-pagina" size="lg" color="primary"
                        onClick={() => window.scrollTo(0, 0)} title="Ir para o topo da página">
                        <i className="tim-icons icon-minimal-up" />
                    </Button>
                }
            </div>
        )
    }
}