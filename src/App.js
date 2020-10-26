/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import Header from "./Componentes/header.jsx";
import Rodadas from "./Componentes/rodada.jsx";
import Classificacao from "./Componentes/classificacao.jsx";
import Rodape from "./Componentes/rodape.jsx";

function App() {
  const [token, setToken] = React.useState(null);

  return (
    <div className="app">
      <Header token={token} setToken={setToken}></Header>
      <div className="centro">
        <Rodadas token={token}></Rodadas>
        <Classificacao></Classificacao>
      </div>
      <div className="Rodape">
        <Rodape></Rodape>
      </div>
    </div>
  );
}

export default App;
