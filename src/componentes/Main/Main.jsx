import { useEffect, useState } from "react";
import "./Main.css"

function Main(){
    const [filme,setFilme] = useState([])

    useEffect(() =>{
        async function loadData(){
           const [movie,genreMovie] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`),
                fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
           ])
            const movies = await movie.json()
            const genres = await genreMovie.json()
            console.log(movies)
            console.log(genres)
            const genreMap = Object.fromEntries(
                genres.genres.map((g) => [g.id, g.name])
            );
        
            setFilme(movies.results.map((filmedavez)=> ({
                titulo: filmedavez.title,
                poster: filmedavez.poster_path,
                ano: filmedavez.release_date.split("-")[0],
                nota: filmedavez.vote_average,
                generos: filmedavez.genre_ids.map(
                    (id) => genreMap[id]
                )
            })
            ))
        }
        loadData()
    },[])
    
    return(
        <main className="main">
             <div className="conteudo">
                 <h2>Em cartaz</h2>
                             {
                    filme.length > 0 &&(
                        <ul className="lista-filmes">
                            {
                                filme.map((filmeDaVez)=>(
                                    <li key={filmeDaVez.titulo} className="filmes">
                                        <div className="div-img-nota">
                                            <p className="nota">{filmeDaVez.nota.toFixed(1)}</p>
                                            <img src={`https://image.tmdb.org/t/p/w500${filmeDaVez.poster}`}></img>
                                        </div>
                                        <div>
                                            <h4>{filmeDaVez.titulo}</h4>
                                            <p className="genero">{filmeDaVez.generos.join(" | ")}</p>
                                            <p className="ano">{filmeDaVez.ano}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                             }
             </div>
        </main>
    )
}

export default Main;