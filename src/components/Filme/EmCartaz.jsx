import React from 'react';
import { Modal } from 'reactstrap';

export default class EmCartaz extends React.Component {
    state = {
        modal: false
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
                    {this.props.cinemas.map((cinema) => (
                        <div key={cinema.nome}>
                            {cinema.nome}
                            {cinema.horarios.map((horario, index) => (
                                <div key={index} style={{marginLeft: '10px'}}>
                                    <span className="badge-default badge badge-secondary">
                                        {horario.tipoFilme}
                                    </span>
                                    <span className="badge-neutral badge badge-secondary horario">
                                        {horario.inicio}
                                    </span>
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