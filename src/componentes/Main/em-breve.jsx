import { useEffect, useState } from "react"
import { Star } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';

function EmBreve(){
    const [erro,setErro] = useState("")
    const [filmes,setFilmes] = useState([])
    const [filmeSelecionado,setFilmeSelecionado] = useState(null)
    useEffect(()=>{
        async function loadData(){
            try{
                const hoje = new Date().toISOString().split('T')[0]
                const [filmes,genreFilmes] = await Promise.all([
                        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR&primary_release_date.gte=${hoje}&sort_by=popularity.desc`),
                        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
                    ]
                )

                const filme = await filmes.json()
                const genero = await genreFilmes.json()
                const generoMap = Object.fromEntries(
                    genero.genres.map((g) => [g.id,g.name])
                )
                console.log(filme)
                console.log(genero)
                setFilmes(filme.results.map((f) =>(
                    {
                      id: f.id,
                      titulo: f.title,
                      poster: f.poster_path,
                      backdrop: f.backdrop_path,
                      sinopse: f.overview,
                      data: new Date(f.release_date).toLocaleDateString('pt-BR'),
                      genero: f.genre_ids.map((id) => generoMap[id])
                    
                    }
                )))

            } catch(erro){
                console.log(erro)
                setErro("Não foi possivel reproduzir os filmes!")
            }  
        }
        loadData()
    },[])
    useEffect(()=>{
        if(filmeSelecionado !== null){
          document.body.style.overflow = "hidden";
        } else{
          document.body.style.overflow = "auto";
        }
      },[filmeSelecionado])
    return(
       <section className="main-resultado">
            <div className="conteudo">
                {
                    erro &&(
                        <h2 className="titulo-resultado">{erro}</h2>
                    )
                }
                <h2 className="titulo-resultado">Em Breve</h2>
                {
                    filmes.length > 0 &&(
                        <ul  className="lista-filmes">
                            {
                                filmes.map((f) => (
                                     <li className="filmes" key={f.titulo} onClick={() => setFilmeSelecionado(f)}>
                                        <div className="div-img-nota">
                                            <Star className="favoritar" sx={{ fontSize: 32 }}></Star>
                                            <img src={`https://image.tmdb.org/t/p/w500${f.poster}`}
                                            alt={f.titulo}/>
                                        </div>
                                        <div>
                                            <h4>{f.titulo}</h4>
                                            <p className="genero">{f.genero.join(" | ")}</p>
                                            <p className="ano">{f.data}</p>
                                        </div>
                                    </li>
                                ))
                            }   
                    
                        </ul>
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
            </div>
       </section>
    )
}

export default EmBreve