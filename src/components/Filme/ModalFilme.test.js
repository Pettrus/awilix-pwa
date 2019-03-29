import { shallow } from 'enzyme';
import React from 'react';
import ModalFilme from './ModalFilme';

jest.mock('../../services/Api', () => ({ logar: jest.fn() }));

const wrapper = shallow(<ModalFilme />);

describe('testes de renderizacao', () => {
    it('renderiza modal filme', () => {
        const login = shallow(<ModalFilme />);
    
        expect(login.find('#modalBody').length).toBe(1);
    });

    it('renderizar download', async () => {
        await wrapper.setState({ popCorn: {torrents: {en: []}}});

        expect(wrapper.find('#download').length).toBe(1);
    });

    it('mostrar carregando', async () => {
        await wrapper.setState({ carregando: true });

        expect(wrapper.find("#carregando").length).toBe(1);
    });

    it('mostrar conteudo ja carregado', async () => {
        await wrapper.setState({ carregando: false });

        expect(wrapper.find("#carregado").length).toBe(1);
    });
});