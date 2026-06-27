export function pegarFilmes(){
    return JSON.parse(localStorage.getItem("filmesFavoritos")) || []
}

export function ehFavorito(id){
    return  pegarFilmes().some(filme => filme.id === id)
}

export function adicionarFilmesFavoritos(identificacao, filmeFavorito){
    const filmesAntigos = pegarFilmes()
    

    const filmeeExiste = filmesAntigos.some(filme => filme.id === identificacao)
    
    let filmesNovos
    
    if(filmeeExiste){
        filmesNovos = filmesAntigos.filter(filme => filme.id !== identificacao)
    } else {
        filmesNovos = [...filmesAntigos, {...filmeFavorito, favorito: true}]
    }

    const filmesAtualizados = JSON.stringify(filmesNovos)
    localStorage.setItem("filmesFavoritos", filmesAtualizados)
}