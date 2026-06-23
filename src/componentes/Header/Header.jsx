import TheatersIcon from '@mui/icons-material/Theaters';
import SearchIcon from '@mui/icons-material/Search';
import "./Header.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({setNomeFilmes}){
    const[nomeFilme,setNomeFilme] = useState("")
    const[erro,setErro] = useState("")
    const navigate = useNavigate()
    function enviarFilme(e){
        e.preventDefault();
        const nomeFormatado = nomeFilme.trim().toLowerCase()
        if(!nomeFormatado){
            setErro("Nenhum filme digitado!")
        } else{
            setNomeFilmes(nomeFormatado)
            setNomeFilme("")
            navigate("/buscar-filme")
            setErro("")
        }
        
    }
    return(
        <header className='header'>
            <section className='section-titulos'>
                <Link to={"/"} className='link-titulo'>
                    <div className='div-titulo' >
                        <div className='icone-titulo'>
                            <TheatersIcon></TheatersIcon>
                        </div>
                        <h1>CineNow</h1>
                    </div>
                </Link>
                <ul className='lista-links'>
                    <li><Link to={"/"} className='links'>Em cartaz</Link></li>
                    <li><Link to={"/em-breve"} className='links'>Em Breve</Link></li>
                    <li><Link to={"/favoritos"} className='links'>Favoritos</Link></li>
                </ul>
            </section>
            <section className='section-form'>
                <form className='form' onSubmit={enviarFilme}>
                    <SearchIcon className='icone-input'></SearchIcon>
                    <input 
                        type="search"
                        value={nomeFilme}
                        placeholder='Buscar filmes...'
                        onChange={(e) => setNomeFilme(e.target.value)}
                        
                    />
                    <button type="submit"><SearchIcon></SearchIcon></button>
                </form>
            </section>
            {
                erro&&(
                    <h2 className='erro-filme'>{erro}</h2>
                )
            }
        </header>
    )
}

export default Header;