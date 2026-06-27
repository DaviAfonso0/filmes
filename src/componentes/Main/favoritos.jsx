import { useState,useEffect } from "react"
import * as servico from "../../servico/favorito_servico"
import ClearIcon from '@mui/icons-material/Clear';
import { Star } from "@mui/icons-material";
import StarBorderIcon from '@mui/icons-material/StarBorder';

function Favoritos(){
    const [filmesFavoritos,setFilmesFavoritos] = useState(servico.pegarFilmes())
    const [filmeSelecionado,setFilmeSelecionado] = useState(null)
       
    const handleFavorito = (id, filme) => {
        
        servico.adicionarFilmesFavoritos(id, filme)
        setFilmesFavoritos(servico.pegarFilmes())
    }
    useEffect(()=>{
        if(filmeSelecionado !== null){
          document.body.style.overflow = "hidden";
        } else{
          document.body.style.overflow = "auto";
        }
      },[filmeSelecionado])
    return(
         <section className="main-resultado">
            {
                filmesFavoritos.length === 0 &&(
                    <h2 className="titulo-resultado" style={{textAlign: "center"}}>Nenhum filme favoritado ainda!</h2>
                )
            }
            { filmesFavoritos.length > 0 && (
                <div className="conteudo">
                    <h2 className="titulo-resultado">Filmes Favoritos: </h2>
                    <ul className="lista-filmes">
                        {filmesFavoritos.map((filmeDaVez) => (
                        <li key={filmeDaVez.id} className="filmes" onClick={()=> setFilmeSelecionado(filmeDaVez)}>
                            <div className="div-img-nota">
                                <Star className="favoritar" sx={{ fontSize: 32 }} onClick={(e) => {     
                                    e.stopPropagation()
                                    handleFavorito(filmeDaVez.id, filmeDaVez)
                                }
                                }></Star>
                                <p className="nota">{filmeDaVez.nota ? filmeDaVez.nota.toFixed(1) : "-"}</p>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${filmeDaVez.poster}`}
                            ></img>
                            </div>
                            <div>
                            <h4>{filmeDaVez.titulo}</h4>
                            <p className="genero">{filmeDaVez.generos.join(" | ")}</p>
                            <p className="ano">{filmeDaVez.ano}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div> 
                )    
            }
            {
                        filmeSelecionado &&(
                          <div className="overlay" onClick={() => setFilmeSelecionado(null)}>
                            <div className="card-expandido" 
                              onClick={(evento) => evento.stopPropagation()}
                            >
                              <div className="div-img">
                                <ClearIcon className="fechar" sx={{fontSize: "3rem",padding: "5px",transition: ".5s"}} onClick={()=> setFilmeSelecionado(null)}></ClearIcon>
                                <img src={`https://image.tmdb.org/t/p/w780${filmeSelecionado.backdrop}`} alt={filmeSelecionado.titulo}/>
                              </div>
                              <div className="descricao">
                                <h1>{filmeSelecionado.titulo}</h1>
                                <div className="favoritar-overlay">
                                  <div className="favoritar-overlay-icone" onClick={(e) => {
                                        e.stopPropagation()
                                    }
                                    }>
                                    {
                                      filmeSelecionado.favorito ?
                                      <Star></Star>
                                      :
                                      <StarBorderIcon></StarBorderIcon>
                                    }
                                  </div>
                                  <p>Favoritar</p>
                                </div>
                                <div className="genero-ano">
                                  <p>{filmeSelecionado.ano}</p>•
                                  <p>{filmeSelecionado.generos.join(" | ")}</p>
                                </div>
                                <div className="sinopse">
                                  <p>{filmeSelecionado.sinopse}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
            </section>      
    )
}

export default Favoritos

