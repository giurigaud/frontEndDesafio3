import React from "react";

import Caneta from "../imagens/pen.svg";
import Salvar from "../imagens/check.svg";
import Bahia from "../imagens/bahia.png";
import AthleticoPr from "../imagens/atleticoparanaense.png";
import SaoPaulo from "../imagens/saoPaulo.png";
import CSA from "../imagens/csa.png";
import Ceara from "../imagens/ceara.png";
import Fluminense from "../imagens/fluminense.png";
import Vasco from "../imagens/vasco.png";
import Goias from "../imagens/goias.png";
import Corinthians from "../imagens/Corinthians.png";
import Flamengo from "../imagens/flamengo.png";
import Grêmio from "../imagens/gremio.png";
import Santos from "../imagens/santos.png";
import Inter from "../imagens/internacional.png";
import Chapecoense from "../imagens/chapecoense.png";
import AtleticoMg from "../imagens/atleticomineiro.png";
import Palmeiras from "../imagens/palmeiras.png";
import Fortaleza from "../imagens/fortaleza.png";
import Cruzeiro from "../imagens/cruzeiro.png";
import Avai from "../imagens/avai.png";
import Botafogo from "../imagens/botafogo.png";
import fazerRequisicaoComBody from "../utils/requisicaocombody";

function escudoTime(time) {
  const escudo = {
    Bahia: <img className="escudo" src={Bahia}></img>,
    "Athletico-PR": <img className="escudo" src={AthleticoPr}></img>,
    "São Paulo": <img className="escudo" src={SaoPaulo}></img>,
    CSA: <img className="escudo" src={CSA}></img>,
    Ceará: <img className="escudo" src={Ceara}></img>,
    Fluminense: <img className="escudo" src={Fluminense}></img>,
    Vasco: <img className="escudo" src={Vasco}></img>,
    Goiás: <img className="escudo" src={Goias}></img>,
    Corinthians: <img className="escudo" src={Corinthians}></img>,
    Flamengo: <img className="escudo" src={Flamengo}></img>,
    Grêmio: <img className="escudo" src={Grêmio}></img>,
    Santos: <img className="escudo" src={Santos}></img>,
    "Inter-RS": <img className="escudo" src={Inter}></img>,
    Chapecoense: <img className="escudo" src={Chapecoense}></img>,
    "Atlético-MG": <img className="escudo" src={AtleticoMg}></img>,
    Palmeiras: <img className="escudo" src={Palmeiras}></img>,
    Fortaleza: <img className="escudo" src={Fortaleza}></img>,
    Cruzeiro: <img className="escudo" src={Cruzeiro}></img>,
    Avaí: <img className="escudo" src={Avai}></img>,
    Botafogo: <img className="escudo" src={Botafogo}></img>,
  };
  return escudo[time];
}

function LinhaRodada(props) {
  const { token, jogo } = props;
  const [editar, setEditar] = React.useState(false);
  const [golsCasa, setGolsCasa] = React.useState(jogo.gols_casa);
  const [golsVisitante, setGolsVisitante] = React.useState(jogo.gols_visitante);

  return (
    <tr>
      <td className="time-casa">{jogo.time_casa}</td>
      <td className="escudo"> {escudoTime(jogo.time_casa)}</td>
      <td className="gols-casa">
        {editar === false ? (
          golsCasa
        ) : (
          <input
            inputmode="numeric"
            className="editorPlacar"
            value={golsCasa}
            onInput={(event) => setGolsCasa(event.target.value)}
          ></input>
        )}
      </td>
      <td className="versus">x</td>
      <td className="gols-visitante">
        {editar === false ? (
          golsVisitante
        ) : (
          <input
            inputmode="numeric"
            className="editorPlacar"
            value={golsVisitante}
            onInput={(event) => setGolsVisitante(event.target.value)}
          ></input>
        )}
      </td>
      <td className="escudo"> {escudoTime(jogo.time_visitante)}</td>
      <td className="visitante">{jogo.time_visitante}</td>
      <td className="logo">
        {token === null ? (
          "  "
        ) : editar === false ? (
          <img
            className="caneta"
            src={Caneta}
            onClick={() => {
              setEditar(true);
            }}
          ></img>
        ) : (
          <img
            className="salvar"
            src={Salvar}
            onClick={() => {
              setEditar(false);
              fazerRequisicaoComBody(
                `http://localhost:8081/jogos/${jogo.id}`,
                "PUT",
                {
                  gols_casa: Number(golsCasa),
                  gols_visitante: Number(golsVisitante),
                },
                token
              )
                .then((res) => res.json())
                .then((respostaJson) => {
                  console.log(respostaJson);
                });
            }}
          ></img>
        )}
      </td>
    </tr>
  );
}

export default LinhaRodada;
