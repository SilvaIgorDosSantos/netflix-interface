const key = config.MY_KEY;

/* id do filme Enola Holmes na API do themoviedb */
const idFilmePrincipal = 497582;
/* id do filme Bee Movie na API do themoviedb */
//const idFilmePrincipal = 5559;
/* numero de filmes no carrossel */
let numeroDeFilmesNoCarrossel = 10;

const filmePrincipal = document.querySelector('.filme-principal');
const filmeCarrossel = document.querySelector('.filme-carrossel');
const botaoCarrosselEsquerda = document.querySelector('.carrossel-esquerda');
const botaoCarrosselDireita = document.querySelector('.carrossel-direita');
let primeiroFilmeDoCarrossel = 0;
let posteresFilmesPopulares = [];

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

    filmePrincipal.children[0].children[0].innerText = filme.original_title.toUpperCase();
    filmePrincipal.children[0].children[1].innerText = filme.overview;

    filmePrincipal.style.background = `
        linear-gradient(rgba(0,0,0,.50),rgba(0,0,0,.50)100%), 
        url('https://image.tmdb.org/t/p/original${filme.backdrop_path}')
    `;
    filmePrincipal.style.backgroundSize = 'cover';
}

async function getFilmesPopulares (numeroDeFilmes) {
    let resposta = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=' + 
        key + 
        '&language=pt-BR&page=1&region=BR'
    );

    let filmesPopulares = await resposta.json();

    //console.log(listaFilmesPopulares.results);

    for (let i = 0; i < numeroDeFilmes; i++) {
        posteresFilmesPopulares.push(`url('https://image.tmdb.org/t/p/original${filmesPopulares.results[i].poster_path}')`);
    }
    mostrarCarrossel(numeroDeFilmes)
}

function mostrarCarrossel (numeroDeFilmes) {
    for (let i = 0; i < filmeCarrossel.children.length; i++) {
        let indice = primeiroFilmeDoCarrossel+i;
        indice = (indice >= numeroDeFilmes ? indice - numeroDeFilmes : indice);
        filmeCarrossel.children[i].style.background = posteresFilmesPopulares[indice];
        filmeCarrossel.children[i].style.backgroundSize = 'cover';
    }
}

function adicionarAcaoCarrosselEsquerda () {
    botaoCarrosselEsquerda.addEventListener("mouseenter", function() {
        primeiroFilmeDoCarrossel = (primeiroFilmeDoCarrossel === 0 ? numeroDeFilmesNoCarrossel-1 : primeiroFilmeDoCarrossel-1);
        mostrarCarrossel(numeroDeFilmesNoCarrossel);
    });
    botaoCarrosselEsquerda.addEventListener("click", function() {
        primeiroFilmeDoCarrossel = (primeiroFilmeDoCarrossel === 0 ? numeroDeFilmesNoCarrossel-1 : primeiroFilmeDoCarrossel-1);
        mostrarCarrossel(numeroDeFilmesNoCarrossel);
    });
}

function adicionarAcaoCarrosselDireita () {
    botaoCarrosselDireita.addEventListener("mouseenter", function() {
        primeiroFilmeDoCarrossel = (primeiroFilmeDoCarrossel === numeroDeFilmesNoCarrossel - 1 ? 0 : primeiroFilmeDoCarrossel+1);
        mostrarCarrossel(numeroDeFilmesNoCarrossel);
    });
    botaoCarrosselDireita.addEventListener("click", function() {
        primeiroFilmeDoCarrossel = (primeiroFilmeDoCarrossel === numeroDeFilmesNoCarrossel - 1 ? 0 : primeiroFilmeDoCarrossel+1);
        mostrarCarrossel(numeroDeFilmesNoCarrossel);
    });
}

getFilmePrincipal();

getFilmesPopulares(numeroDeFilmesNoCarrossel);

adicionarAcaoCarrosselEsquerda();
adicionarAcaoCarrosselDireita();