import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default class HorariosCinemas extends React.Component {
    state = {
        modal: false,
        cinemas: []
    }

    componentDidUpdate() {
        if (this.state.cinemas.length === 0 && this.props.cinemas.length > 0) {
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

    toggleHorarios() {
        this.setState({ modal: !this.state.modal, cinemas: [] });
    }

    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={() => this.toggleHorarios()}>
                <ModalHeader toggle={() => this.toggleHorarios()}>Cinemas</ModalHeader>

                <ModalBody>
                    {this.state.cinemas.map((cinema, i) => (
                        <div key={i}>
                            {cinema.nome}
                            {cinema.tipos.map((tipo, i) => (
                                <div key={i} style={{ marginLeft: '10px', marginTop: '5px' }}>
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
                        </div>
                    ))}
                </ModalBody>
            </Modal>
        )
    }
}