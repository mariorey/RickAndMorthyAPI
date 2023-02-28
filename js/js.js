let page = 1;
let isLoading = false;
var changedView = false;
renderCharacters();

async function renderCharacters(query = "", page = 1) {
    isLoading = true;

    let statusFilter = document.querySelector('#statusFilter input[name="statusOption"]:checked')
    if(statusFilter==null){statusFilter = ""}
    else{statusFilter = statusFilter.value}

    const urlParams = new URLSearchParams({
        name: query,
        page: page,
        status: statusFilter,
    });

    const response = await fetch(`https://rickandmortyapi.com/api/character/?${urlParams.toString()}`, {});
    const data = await response.json();
    let characters = data.results;

    const content = document.getElementById("content");

    if (page === 1) {
        content.textContent = '';
    }

    characters.forEach(character => {

        const card = document.createRange().createContextualFragment(
            `
            <div class="card__container">
            <img class="card__image" src=${character.image} alt="${character.name}" loading="lazy">
            <h3 class="card__name">Name: ${character.name}</h3>
            <h3 class="card__status, ${character.status}">${character.status}</h3>
            <p class="card__species">Species: ${character.species}</p>
            <p class="card__origin">Origin: ${character.origin.name}</p>
            </div>
                
            `);

        content.appendChild(card);
    });

    isLoading = false;
}

    const search__term = document.getElementById('search__term');
    const debouncedRenderCharacters = debounce(renderCharacters, 500);

    search__term.addEventListener('input', () => {
        const query = search__term.value;
        if(query.toString().includes("evil")){
            const evilAudio = document.querySelector('#evil-morty');
            setTimeout(() => {   evilAudio.play() }, 500);

        }
        debouncedRenderCharacters(query);
    });

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !isLoading) {
            page++;
            renderCharacters(search__term.value, page);
        }
    });

    document.querySelector('#statusFilter').addEventListener('change', () => {
        renderCharacters(search__term.value, 1);
    });


function debounce(func, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func.apply(this, args);
            timerId = null;
        }, delay);
    };
}

function changeGrid() {
    var content = document.getElementById("content");
    var cards = document.getElementsByClassName("card__container")
    console.log(cards)
    if (!changedView) {
        content.style.gridTemplateColumns = "repeat(2, minmax(250px, 450px))";
        for(let card of cards){
            card.style.marginLeft = "5em"
        }

        changedView = true;
    } else {
        content.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px, 1fr))";
        for(let card of cards){
            card.style.marginLeft = "0"
        }
        changedView = false;
    }
}

async function clearInput(){
    document.getElementById('search__term').value="";
    renderCharacters()
}

/*function loadFilters(characters, speciesSet = new Set) {
    let species = document.getElementById("species")
    characters.forEach(character => {
        speciesSet.add(character.status)
    })
    speciesSet.forEach(specie => {
        const check = document.createRange().createContextualFragment(`
                 <div>
                <input type="checkbox" id=${specie} name=${specie} value=${specie} />
                <label for=${specie}>${specie}</label>
                </div>`)

        species.append(check)
    return speciesSet})
    }*/



