import { shallow } from 'enzyme';
import Filme from './Filme';
import React from 'react';

jest.mock('../services/Api', () => ({ getRequest: jest.fn(() => []) }));

const wrapper = shallow(<Filme />);

it('deveria alterar palavra chave', () => {
    const event = {
        preventDefault() {},
        target: { value: 'nome de filme' }
    };

    wrapper.find('#palavraChave').simulate('change', event);

    expect(wrapper.state('palavraChave')).not.toBe("");
    expect(wrapper.state('genero')).toBe("");
});

it('deveria alterar genero', () => {
    const event = {
        preventDefault() {},
        target: { value: 'genero de exemplo' }
    };

    wrapper.find('#generos').simulate('change', event);

    expect(wrapper.state('palavraChave')).toBe("");
    expect(wrapper.state('genero')).not.toBe("");
});

it('renderizar filmes', async () => {
    await wrapper.setState({ filmes: [{id: 1}] });
    
    expect(wrapper.find('#scroll').length).toBe(1);
});

it('renderizar mensagem sem filmes', async () => {
    await wrapper.setState({ filmes: [] });
    
    expect(wrapper.find('#semFilmes').length).toBe(1);
});