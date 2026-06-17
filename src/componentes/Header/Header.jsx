import TheatersIcon from '@mui/icons-material/Theaters';
import SearchIcon from '@mui/icons-material/Search';
import "./Header.css"

function Header(){
    return(
        <header className='header'>
            <section className='section-titulos'>
                <div className='div-titulo'>
                    <div className='icone-titulo'>
                        <TheatersIcon></TheatersIcon>
                    </div>
                    <h1>CineNow</h1>
                </div>
                <ul className='lista-links'>
                    <li>Em cartaz</li>
                    <li>Em Breve</li>
                    <li>Favoritos</li>
                </ul>
            </section>
            <section className='section-form'>
                <form className='form'>
                    <SearchIcon className='icone-input'></SearchIcon>
                    <input 
                        type="search"
                        placeholder='Buscar filmes,séries...'
                    />
                    <button type="submit"><SearchIcon></SearchIcon></button>
                </form>
            </section>
        </header>
    )
}

export default Header;