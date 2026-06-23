import { Route, Routes } from "react-router-dom";
import "./Principal.css"
import EmCartaz from "./em-cartaz";
import BuscarFilme from "./buscar-filmes";
import EmBreve from "./em-breve";
import Favoritos from "./favoritos";

function Principal({nomeFilme}){
    return(
        <main>
             <Routes>
                <Route path="/" element={<EmCartaz></EmCartaz>}></Route>
                <Route path="/buscar-filme" element={<BuscarFilme nomeFilme={nomeFilme}></BuscarFilme>}></Route>
                <Route path="/em-breve" element={<EmBreve></EmBreve>}></Route>
                <Route path="/favoritos" element={<Favoritos></Favoritos>}></Route>
             </Routes>
        </main>
    )
}

export default Principal;