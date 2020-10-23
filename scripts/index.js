const key = config.MY_KEY;

/* id do filme Enola Holmes na API do themoviedb */
const idFilmePrincipal = 497582;

const filmePrincipal = document.querySelector('.filme-principal');

async function getFilmePrincipal () {
    let resposta = await fetch(
        'https://api.themoviedb.org/3/movie/' + 
        idFilmePrincipal + 
        '?api_key=' + 
        key + 
        '&language=pt-BR'
    );

    let filme = await resposta.json();

    //console.log(filme);

    filmePrincipal.children[0].innerHTML = `
        <h3 class="titulo">${filme.original_title}</h3>
        <p class="descricao">${filme.overview}</p>
    `;

    filmePrincipal.style.background = `
        linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)100%), 
        url('https://image.tmdb.org/t/p/w500${filme.backdrop_path}')
    `;
    filmePrincipal.style.backgroundSize = 'cover';
}

getFilmePrincipal();