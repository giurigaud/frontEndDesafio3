import React from "react";
import Ordenacao from "../imagens/sort.svg";
import Up from "../imagens/arrow_up.svg";
import Down from "../imagens/arrow_down.svg";
import fazerRequisicaoComBody from "../utils/requisicaocombody";

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
                  {" "}
                  <abbr title={coluna}>{legenda[coluna]}</abbr>
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
              <tr
                className={
                  objetoDoArray.posicao < 5
                    ? "brasileirao"
                    : objetoDoArray.posicao > 16
                    ? "desclassificados"
                    : ""
                }
              >
                {colunas.map((coluna) => (
                  <td>{objetoDoArray[coluna]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="legenda">
        <div className="legenda-nome">Legenda:</div>
        <div className="legendado-classificado">
          {" "}
          <div className="square"></div> Classificados para as Libertadores{" "}
        </div>
        <div className="legendado-desclassificado">
          {" "}
          <div className="square"></div> Rebaixados para série B{" "}
        </div>
      </div>
    </div>
  );
}

// module.exports = Classificacao;
export default Classificacao;
