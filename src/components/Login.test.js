import { shallow } from 'enzyme';
import Login from './Login';
import React from 'react';

jest.mock('../services/Api', () => ({ logar: jest.fn() }))

const wrapper = shallow(<Login />);

describe('testes de ui', () => {
    it('renderiza login', () => {
        const login = shallow(<Login />);
    
        expect(login.find('input').length).toEqual(0);
    });

    it('renderizar cadastro', async () => {
        await wrapper.setState({ modoCadastro: true });
    
        expect(wrapper.find('#renderCadastro').length).toBe(1);
    });
    
    it('renderizar login', async () => {
        await wrapper.setState({ modoCadastro: false });
    
        expect(wrapper.find('#renderLogin').length).toBe(1);
    });
});

describe('testes de funcionalidades', () => {
    it('fechar modal', async () => {
        await wrapper.setState({ modal: true });
        wrapper.find("#fecharModal").simulate('click');
        expect(wrapper.state('modal')).toBe(false);
    });
    
    it('mostrar cadastro', () => {
        wrapper.find('#mostrarModalCadastro').simulate('click');
        expect(wrapper.state('modoCadastro')).toBe(true);
    });

    it('fazer login', async () => {
        await wrapper.setState({ modal: true, modoCadastro: false });

        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'test@test.com'}});
        wrapper.find('#senha').simulate('change', {target: {name: 'senha', value: '12345678'}});
        await wrapper.find('#form').simulate('submit', { preventDefault () {} });

        expect(wrapper.state('modal')).toBe(false);
    });
});