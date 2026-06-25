import { useEffect, useState } from "react"
import { Star } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';

function BuscarFilme({nomeFilme}){
    const [erro,setErro] = useState("")
    const [filme,setFilme] = useState([])
    const [filmeSelecionado,setFilmeSelecionado] = useState(null)
    useEffect(() =>{
        async function loadData(){
            try{
                const [filme,genreFilme] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(nomeFilme)}&api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`),
                    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
                ]
                )
                    

                const filmes = await filme.json()
                const genero = await genreFilme.json()
                console.log(filmes)
                console.log(genero)
                const genreMap = Object.fromEntries(
                    genero.genres.map((g) => [g.id,g.name])
                )

                if (filmes.results.length === 0) {
                    setErro("Nenhum filme encontrado.")
                    setFilme([])
                    return
                }
                setFilme(filmes.results.map((f) => ({
                    id: f.id,
                    poster: f.poster_path,
                    backdrop: f.backdrop_path,
                    sinopse: f.overview,
                    titulo: f.title,
                    ano: f.release_date.split("-")[0],
                    genero: f.genre_ids.map((id) =>  genreMap[id]),
                    nota: f.vote_average
                    
                })))
                setErro("")
                
            } catch(erro){
                console.log(erro)
                setErro("Não foi possível buscar os filmes. Tente novamente.")
                setFilme([])
                
            }
        }
        loadData()
    },[nomeFilme])

    useEffect(()=>{
        if(filmeSelecionado !== null){
          document.body.style.overflow = "hidden";
        } else{
          document.body.style.overflow = "auto";
        }
      },[filmeSelecionado])

    return(
        <section className="main-resultado">
            { erro &&(
                <h3 className="titulo-resultado" style={{textAlign: "center"}}>{erro}</h3>
            )
            }
            {
                filme.length > 0 && (
                    <div>
                        <h2 className="titulo-resultado">Resultados da busca:</h2>
                        <ul className="lista-filmes">
                            {
                                filme.map((filmeDaVez) =>(
                                    <li key={filmeDaVez.id} className="filmes" onClick={() => (setFilmeSelecionado(filmeDaVez))}>
                                        <div className="div-img-nota">
                                            <Star className="favoritar" sx={{ fontSize: 32 }}></Star>
                                            <p className="nota">{filmeDaVez.nota.toFixed(1)}</p>
                                            <img src={`https://image.tmdb.org/t/p/w500${filmeDaVez.poster}`} alt={filmeDaVez.titulo} />
                                        </div>
                                        <div>
                                            <h4>{filmeDaVez.titulo}</h4>
                                            <p className="genero">{filmeDaVez.genero.join(" | ")}</p>
                                            <p className="ano">{filmeDaVez.ano}</p>
                                        </div>
                                    </li>
                                ))
                            }
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
                      <Star sx={{color: "yellow"}}></Star>
                      <p>Favoritar</p>
                    </div>
                    <div className="genero-ano">
                      <p>{filmeSelecionado.ano}</p>•
                      <p>{filmeSelecionado.genero.join(" | ")}</p>
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

export default BuscarFilme