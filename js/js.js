let page = 1;
let isLoading = false;
renderCharacters()
async function renderCharacters(query = "", page = 1) {
    isLoading = true;

    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`, {});
    const data = await response.json();
    let characters = data.results;
    const main = document.querySelector("main");

    if (page === 1) {
        main.textContent = '';
    }

    characters.forEach(character => {
        const card__container = document.createElement('div');
        const card__image = document.createElement('img');
        const card__name = document.createElement('p');
        const card__species = document.createElement('p');
        const card__origin = document.createElement('origin');
        card__container.classList.add('card__container');
        card__image.classList.add('card__image');
        card__name.classList.add('card__name');
        card__species.classList.add('card__species');
        card__origin.classList.add('card__origin');

        card__image.src = character.image;
        card__name.innerText = `Name: ${character.name}`;
        card__species.innerText = `Species: ${character.species}`;
        card__origin.innerText = `Origin: ${character.origin.name}`;
        card__container.appendChild(card__image);
        card__container.appendChild(card__name);
        card__container.appendChild(card__species);
        card__container.appendChild(card__origin);

        main.appendChild(card__container);
    });

    isLoading = false;
}

function debounceRenderCharacters(query) {
    // Cancela el temporizador existente antes de iniciar uno nuevo
    clearTimeout(debounceTimerId);

    // Inicia un nuevo temporizador para llamar a renderCharacters después de 500ms
    debounceTimerId = setTimeout(() => {
        page = 1;
        renderCharacters(query, page);
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    const search__term = document.getElementById('search__term');
    const debouncedRenderCharacters = debounce(renderCharacters, 500);

    search__term.addEventListener('input', () => {
        const query = search__term.value;
        debouncedRenderCharacters(query);
    });

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
            page++;
            renderCharacters(search__term.value, page);
        }
    });
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


