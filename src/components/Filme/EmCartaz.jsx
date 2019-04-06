import React from 'react';
import { Modal } from 'reactstrap';

export default class EmCartaz extends React.Component {
    state = {
        modal: false,
        cinemas: []
    }

    componentDidUpdate() {
        if (this.state.cinemas.length === 0 && this.props.cinemas.length > 0) {
            console.log("RODOU");
            const cFormatados = this.props.cinemas;

            for (let i = 0; i < cFormatados.length; i++) {
                const tipos = [];

                for (let z = 0; z < cFormatados[i].horarios.length; z++) {
                    if (!tipos.some(e => e.nome === cFormatados[i].horarios[z].tipoFilme)) {
                        const tipo = {
                            nome: cFormatados[i].horarios[z].tipoFilme,
                            inicios: [
                                cFormatados[i].horarios[z].inicio
                            ]
                        }

                        tipos.push(tipo);
                    } else {
                        const index = tipos.findIndex(e => e.nome === cFormatados[i].horarios[z].tipoFilme);
                        tipos[index].inicios.push(cFormatados[i].horarios[z].inicio);
                    }
                }

                cFormatados[i].tipos = tipos;
            }

            this.setState({ cinemas: cFormatados });
        }
    }

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <Modal
                size="sm"
                isOpen={this.state.modal}
                toggle={() => this.toggleModal()}>

                <div className="modal-header">
                    <button
                        className="close"
                        onClick={() => this.toggleModal({})}>
                        <i className="tim-icons icon-simple-remove" />
                    </button>

                    <h4 className="title title-up">Horários nos cinemas</h4>
                </div>

                <div className="modal-body modal-horarios">
                    {this.state.cinemas.map((cinema) => (
                        <div key={cinema.nome}>
                            {cinema.nome}
                            {cinema.tipos.map((tipo, index) => (
                                <div key={index} style={{ marginLeft: '10px' }}>
                                    <span className="badge-default badge badge-secondary">
                                        {tipo.nome}
                                    </span>

                                    {tipo.inicios.map((horario, index) => (
                                        <span key={index} className="badge-neutral badge badge-secondary horario">
                                            {horario}
                                        </span>
                                    ))}
                                </div>
                            ))}

                            <hr />
                        </div>
                    ))}
                </div>
            </Modal>
        );
    }
}