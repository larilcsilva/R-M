const urlApi = "https://rickandmortyapi.com/api/episode/";
const listEl = document.getElementById('list');
let nextUrl = '';
let prevUrl = '';

const getEpisode = async (url, name = '') => {
    if(name !== ''){
        var response = await fetch(`${url}?name=${name}`)
    }else{
        var response = await fetch(url)
    }
    
    const data = await response.json();
    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    const episode = data.results;
    render(episode);
}

const searchEpisode = (evento) => {
    evento.preventDefault();
    const name = document.querySelector('input').value;
    getEpisode(urlApi, name);
}

const render = (episode) => {
    listEl.innerHTML = '';

    episode.map((episode) => {
        listEl.insertAdjacentHTML('beforeend', `
        <div class='card'>    
                <div class="card-body">
                    <p><b>Nome:</b> ${episode.name}</p>
                    <p><b>Data:</b> ${episode.air_date}</p>
                    <p><b>Episódio:</b> ${episode.episode}</p>
                </div>
            </div>
            `)

    });
}

const nextPage = () => {
    getEpisode(nextUrl);
}

const prevPage = () => {
    getEpisode(prevUrl);
}

getEpisode(urlApi);