import React from 'react';
import { salvarNps } from '../services/api';

const notas = [1, 2, 3, 4, 5];
const requerComentario = nota => nota < 4;
const isFormInvalid = ({ nota, comentario }) =>
  requerComentario(nota) && comentario.length === 0;

export default function Nps() {
  const [nota, setNota] = React.useState(null);
  const [comentario, setComentario] = React.useState('');
  const [npsRespondido, setNpsRespondido] = React.useState(false);

  const handleChangeNota = event => {
    setNota(event.target.value);
  };

  const handleChangeComentario = event => {
    setComentario(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (isFormInvalid({ nota, comentario })) {
      return alert('O comentário é obrigatório.');
    }

    try {
      await salvarNps({ nota, comentario });

      setNpsRespondido(true);
    } catch (error) {
      return alert('Erro ao salvar o nps.');
    }
  };

  return (
    <section>
      <h1>Que nota daria para nosso atendimento?</h1>
      {npsRespondido ? (
        <h3>Obrigado por participar de nossa pesquisa.</h3>
      ) : (
        <form onSubmit={handleSubmit}>
          {notas.map(n => {
            return (
              <div key={n}>
                <label htmlFor={`nota_${n}`}>{n}</label>
                <input
                  type="radio"
                  id={`nota_${n}`}
                  name="nota"
                  onChange={handleChangeNota}
                  value={n}
                />
              </div>
            );
          })}
          <label htmlFor="comentario">Comentário</label>
          <textarea
            id="comentario"
            name="comentario"
            onChange={handleChangeComentario}
          ></textarea>
          <div>
            <button
              type="submit"
              disabled={isFormInvalid({ nota, comentario })}
            >
              Enviar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
