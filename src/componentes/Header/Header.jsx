import TheatersIcon from '@mui/icons-material/Theaters';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import "./Header.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function Header({setNomeFilmes}){
    const[nomeFilme,setNomeFilme] = useState("")
    const inputRef = useRef(null);
    const[erro,setErro] = useState("")
    const [menuAberto,setMenuAberto] = useState(false)
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
        inputRef.current.blur();
        
    }
    useEffect(() => {
        const handleFocus = () => {
            document.documentElement.style.height = '100vh';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            document.body.style.overflow = 'hidden';
        };

        const handleBlur = () => {
            document.documentElement.style.height = 'auto';
            document.documentElement.style.overflow = 'auto';
            document.body.style.height = 'auto';
            document.body.style.overflow = 'auto';
        };

        const input = document.querySelector('input[type="search"]');
        if (input) {
            input.addEventListener('focus', handleFocus);
            input.addEventListener('blur', handleBlur);
            
            return () => {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
            };
    }
    }, []);
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
                <button 
                    className='hamburguer'
                    onClick={() => setMenuAberto(!menuAberto)}
                >
                    <MenuIcon sx={{fontSize: "32px"}}></MenuIcon>
                </button>
                {
                    menuAberto &&(
                            <div
                                className='overlay'
                                onClick={() => setMenuAberto(false)}
                            ></div>
                    )
                }
                <nav className={`menu ${menuAberto ? "ativo" : ""}`}>
                    <ul className='lista-links'>
                        <li><Link to={"/"} className='links'>Em cartaz</Link></li>
                        <li><Link to={"/em-breve"} className='links'>Em Breve</Link></li>
                        <li><Link to={"/favoritos"} className='links'>Favoritos</Link></li>
                    </ul>
                </nav>
            </section>
            <section className='section-form'>
                <form className='form' onSubmit={enviarFilme}>
                    <SearchIcon className='icone-input'></SearchIcon>
                    <input 
                        ref={inputRef}
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