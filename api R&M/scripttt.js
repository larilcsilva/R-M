const urlApi = "https://rickandmortyapi.com/api/location/";
const listEl = document.getElementById('list');
let nextUrl = '';
let prevUrl = '';

const getLocation = async (url, name = '') => {
    if(name !== ''){
        var response = await fetch(`${url}?name=${name}`)
    }else{
        var response = await fetch(url)
    }
    
    const data = await response.json();
    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    const location = data.results;
    render(location);
}


const render = (location) => {
    listEl.innerHTML = '';

    location.map((location) => {
        listEl.insertAdjacentHTML('beforeend', `
        <div class='card'>    
                <div class="card-body">
                    <p><b>Nome:</b> ${location.name}</p>
                    <p><b>Tipo:</b> ${location.type}</p>
                    <p><b>Dimensão:</b> ${location.dimension}</p>
                </div>
            </div>
            `)

    });
}

const nextPage = () => {
    getLocation(nextUrl);
}

const prevPage = () => {
    getLocation(prevUrl);
}

getLocation(urlApi);