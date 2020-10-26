import React from "react";
import Left from "../imagens/arrow_left.svg";
import Right from "../imagens/arrow_right.svg";
import LinhaRodada from "./linharodada";

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

// module.exports = Rodadas;
export default Rodadas;
