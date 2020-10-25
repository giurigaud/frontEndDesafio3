/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Left from "./arrow_left.svg";
import Right from "./arrow_right.svg";
import Ordenacao from "./sort.svg";
import Up from "./arrow_up.svg";
import Down from "./arrow_down.svg";
import Bola from "./bola.png";
import Caneta from "./pen.svg";
import Salvar from "./check.svg";
import Bahia from "./bahia.png";
import AthleticoPr from "./atleticoparanaense.png";
import SaoPaulo from "./saoPaulo.png";
import CSA from "./csa.png";
import Ceara from "./ceara.png";
import Fluminense from "./fluminense.png";
import Vasco from "./vasco.png";
import Goias from "./goias.png";
import Corinthians from "./Corinthians.png";
import Flamengo from "./flamengo.png";
import Grêmio from "./gremio.png";
import Santos from "./santos.png";
import Inter from "./internacional.png";
import Chapecoense from "./chapecoense.png";
import AtleticoMg from "./atleticomineiro.png";
import Palmeiras from "./palmeiras.png";
import Fortaleza from "./fortaleza.png";
import Cruzeiro from "./cruzeiro.png";
import Avai from "./avai.png";
import Botafogo from "./botafogo.png";

import "./App.css";

function fazerRequisicaoComBody(url, metodo, conteudo, token) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: JSON.stringify(conteudo),
  });
}

function Header(props) {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const { token, setToken } = props;

  return (
    <div className="cabecalho">
      <div className="cabecalho-solution">
        <h1>Brasileirão</h1> <img className="bola" src={Bola}></img>
        {token === null ? (
          <form
            className="cabecalho-login"
            onSubmit={(event) => {
              event.preventDefault();
              fazerRequisicaoComBody("http://localhost:8081/auth", "POST", {
                email,
                senha,
              })
                .then((res) => res.json())
                .then((respostaJson) => {
                  const novoToken = respostaJson.dados.token;
                  setToken(novoToken);
                });
              console.log(token);
            }}
          >
            <label>
              Email
              <input
                className="email"
                type="email"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
              ></input>
            </label>
            <label>
              Senha
              <input
                id="senha"
                type="password"
                value={senha}
                onInput={(event) => setSenha(event.target.value)}
              ></input>
            </label>
            <button>Logar</button>
          </form>
        ) : (
          <form>
            <button
              className="cabecalho-deslogado"
              onClick={() => {
                setToken(null);
              }}
            >
              Deslogar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

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

function Rodadas(props) {
  const [rodada, setRodada] = React.useState(1);
  const [jogos, setJogos] = React.useState([]);
  const { token } = props;

  React.useEffect(() => {
    fetch(`http://localhost:8081/jogos/${rodada}`)
      .then((res) => res.json())
      .then((objeto) => {
        setJogos(objeto.dados);
      });
  }, [rodada]);

  return (
    <div className="jogos">
      <div className="cabecalho-jogos">
        <img
          src={Left}
          onClick={() => {
            if (rodada <= 1) {
              return;
            }
            setRodada(rodada - 1);
          }}
        ></img>
        <h2> {rodada}ª Rodada</h2>
        <img
          src={Right}
          onClick={() => {
            setRodada(rodada + 1);
          }}
        ></img>
      </div>

      <div>
        <table className="corpo-jogos">
          {jogos.map((jogo) => {
            return <LinhaRodada token={token} jogo={jogo}></LinhaRodada>;
          })}
        </table>
      </div>
    </div>
  );
}

function Classificacao() {
  const legenda = {
    posicao: "Posição",
    nome: "Time",
    pontos: "PTS",
    empates: "E",
    vitorias: "V",
    derrotas: "D",
    golsFeitos: "GF",
    golsSofridos: "GS",
    saldoDeGols: "SG",
  };

  const colunas = [
    "posicao",
    "nome",
    "pontos",
    "vitorias",
    "empates",
    "derrotas",
    "golsFeitos",
    "golsSofridos",
    "saldoDeGols",
  ];

  const [colunaOrdenada, setColunaOrdenada] = React.useState("posicao");
  const [ordem, setOrdem] = React.useState("ascendente");
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:8081/jogos/classificacao`)
      .then((res) => res.json())
      .then((objeto) => {
        setDados(objeto.dados);
      });
  }, []);

  const dadosModificados = dados.map((dado, i) => {
    return {
      posicao: i + 1,
      saldoDeGols: dado.golsFeitos - dado.golsSofridos,
      ...dado,
    };
  });

  const dadosAscendentes = dadosModificados.sort((t1, t2) => {
    if (
      typeof t1[colunaOrdenada] === "number" &&
      typeof t2[colunaOrdenada] === "number"
    ) {
      return t1[colunaOrdenada] - t2[colunaOrdenada];
    } else {
      return t1[colunaOrdenada].localeCompare(t2[colunaOrdenada]);
    }
  });

  const dadosOrdenados =
    ordem === "ascendente" ? dadosAscendentes : dadosAscendentes.reverse();

  return (
    <div className="classificacaoTabela">
      <table className="tabelaClassificacao">
        <thead>
          <tr>
            {colunas.map((coluna) => {
              return (
                <th>
                  {legenda[coluna]}
                  <img
                    src={
                      colunaOrdenada !== coluna
                        ? Ordenacao
                        : ordem === "ascendente"
                        ? Down
                        : Up
                    }
                    onClick={() => {
                      if (colunaOrdenada === coluna) {
                        setOrdem((ordem) =>
                          ordem === "descendente" ? "ascendente" : "descendente"
                        );
                      } else {
                        setColunaOrdenada(coluna);
                        setOrdem("descendente");
                      }
                    }}
                  ></img>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dadosOrdenados.map((objetoDoArray, i) => {
            return (
              <tr className={objetoDoArray.posicao < 5 ? "brasileirao" : ""}>
                {colunas.map((coluna) => (
                  <td>{objetoDoArray[coluna]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [token, setToken] = React.useState(null);

  return (
    <div className="app">
      <Header token={token} setToken={setToken}></Header>
      <div className="centro">
        <Rodadas token={token}></Rodadas>
        <Classificacao></Classificacao>
      </div>
    </div>
  );
}

export default App;
