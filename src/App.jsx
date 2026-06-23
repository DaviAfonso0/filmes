import { useState } from "react";
import Header from "./componentes/Header/Header"
import Principal from "./componentes/Main/Principal";


function App(){
  const[nomeFilme,setNomeFilme] = useState("")
  return (
    <div className="container-principal">
       <Header setNomeFilmes={setNomeFilme}></Header>
       <Principal nomeFilme={nomeFilme}></Principal>
    </div>
  )
}

export default App;