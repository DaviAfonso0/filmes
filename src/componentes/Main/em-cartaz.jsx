import { Star } from "@mui/icons-material";
import { useEffect, useState } from "react";

function EmCartaz() {
  const [filme, setFilme] = useState([]);
  const [erro, setErro] = useState("");
  const data = new Date()
  const hoje = data.toDateString()
  console.log(hoje)

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
            titulo: filmedavez.title,
            poster: filmedavez.poster_path,
            ano: filmedavez.release_date.split("-")[0],
            nota: filmedavez.vote_average,
            generos: filmedavez.genre_ids.map((id) => genreMap[id]),
        })),
        );
    } catch (erro) {
        console.log(erro);
        setErro("Não foi possivel reproduzir os filmes!");
    }
    }
    loadData();
  }, []);

  return (
    <section className="main-resultado">
      <div className="conteudo">
        <h2 className="titulo-resultado">Em cartaz</h2>
        {filme.length > 0 && (
          <ul className="lista-filmes">
            {filme.map((filmeDaVez) => (
              <li key={filmeDaVez.titulo} className="filmes">
                <div className="div-img-nota">
                    <Star className="favoritar" sx={{ fontSize: 32 }}></Star>
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
        {erro && <h2>{erro}</h2>}
      </div>
    </section>
  );
}
export default EmCartaz;
