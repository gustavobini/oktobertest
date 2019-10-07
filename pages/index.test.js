import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Nps from '.';

afterEach(cleanup);

describe('Um usuário recebendo a pesquisa de NPS pela primeira vez', () => {
  it('Nenhuma nota deve estar selecionada e o comentário deve estar em branco', () => {
    const c = render(<Nps />);

    const opcoesNota = Array.from(
      c.container.querySelectorAll('input[name=nota]')
    );
    const comentarioInput = c.getByLabelText('Comentário');
    const botaoEnviar = c.getByText('Enviar');

    expect(opcoesNota.length).toBe(5);
    expect(opcoesNota.every(opcaoNota => !opcaoNota.checked)).toBeTruthy();
    expect(comentarioInput.value).toBe('');
    expect(botaoEnviar).toHaveAttribute('disabled');
  });
});
