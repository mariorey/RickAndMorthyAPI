const main = document.getElementById('#main');
const search = document.getElementById('#search');
const button = document.getElementById('#submit')



let characters = [];

async function printCharacters()  {
    const response = await fetch('https://rickandmortyapi.com/api/character', {});
    const data = await response.json();
    characters = data.results.forEach(character => {
        const article = document.createRange().createContextualFragment(
            `
            <div id="card">
                <div class="image__container">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="info__container">
                    <h2>${character.name}</h2>
                    <span>${character.status}</span>
                        <p>Species: ${character.species}</p>
                        <p>Origin: ${character.origin.name}</p>
                </div>
            </div>
            `);

        const main = document.querySelector("main");
        main.append(article);
        return {name: character.name};
    });
};

printCharacters();