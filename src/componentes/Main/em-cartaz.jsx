import { Star } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import * as servico from "../../servico/favorito_servico"

function EmCartaz() {
  const [filme, setFilme] = useState([]);
  const [erro, setErro] = useState("");
  const [filmeSelecionado,setFilmeSelecionado] = useState(null)

  const handleFavoritar = (id, filmeSelecionado) => {
    servico.adicionarFilmesFavoritos(id, filmeSelecionado)
    
    const filmesAtualizados = filme.map(f => 
        f.id === id ? {...f, favorito: !f.favorito} : f
    )
    setFilme(filmesAtualizados)
  }
  useEffect(() => {
    async function loadData() {
      try {
        const [movie, genreMovie] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`,
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`,
          ),
        ]);
        const movies = await movie.json();
        const genres = await genreMovie.json();
        console.log(movies);
        console.log(genres);
        const genreMap = Object.fromEntries(
        genres.genres.map((g) => [g.id, g.name]),
        );

        setFilme(
        movies.results.map((filmedavez) => ({
            id: filmedavez.id,
            titulo: filmedavez.title,
            poster: filmedavez.poster_path,
            backdrop: filmedavez.backdrop_path,
            ano: filmedavez.release_date.split("-")[0],
            nota: filmedavez.vote_average,
            generos: filmedavez.genre_ids.map((id) => genreMap[id]),
            sinopse: filmedavez.overview,
            favorito: servico.ehFavorito(filmedavez.id)
        })),
        );
    } catch (erro) {
        console.log(erro);
        setErro("Não foi possivel reproduzir os filmes!");
    }
    }
    loadData();
  }, []);

  useEffect(()=>{
    if(filmeSelecionado !== null){
      document.body.style.overflow = "hidden";
    } else{
      document.body.style.overflow = "auto";
    }
  },[filmeSelecionado])

  return (
    <section className="main-resultado">
      <div className="conteudo">
        <h2 className="titulo-resultado">Em cartaz</h2>
        {filme.length > 0 && (
          <ul className="lista-filmes">
            {filme.map((filmeDaVez) => (
              <li key={filmeDaVez.id} className="filmes" onClick={()=> {
                  setFilmeSelecionado(filmeDaVez)}}
              >
             
                <div className="div-img-nota">
                      <div className="favoritar" onClick={(e) => {
                          e.stopPropagation()
                          handleFavoritar(filmeDaVez.id,filmeDaVez)
                        }}>
                        {
                          filmeDaVez.favorito ?
                          <Star></Star>
                          :
                          <StarBorderIcon></StarBorderIcon>
                        }
                      </div>
                    <p className="nota">{filmeDaVez.nota.toFixed(1)}</p>
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
        )}
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
                          handleFavoritar(filmeSelecionado.id,filmeSelecionado)
                          setFilmeSelecionado({...filmeSelecionado,favorito: !filmeSelecionado.favorito})
                        }}>
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
        {erro && <h2>{erro}</h2>}
      </div>
    </section>
  );
}
export default EmCartaz;
