import React from "react";
import Bola from "../imagens/bola.png";
import fazerRequisicaoComBody from "../utils/requisicaocombody";

// function fazerRequisicaoComBody(url, metodo, conteudo, token) {
//   return fetch(url, {
//     method: metodo,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token && `Bearer ${token}`,
//     },
//     body: JSON.stringify(conteudo),
//   });
// }

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

// module.exports = Header;
export default Header;
