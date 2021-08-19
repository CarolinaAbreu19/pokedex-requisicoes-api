const input = document.querySelector('input');
const root = document.querySelector('body');
const main = document.querySelector('main');

const nome = document.querySelector('#nome');
const abilities = document.querySelector('#abilities');
const sprite = document.querySelector('#sprite');
const type = document.querySelector('#type');

const pokeball = document.querySelector('.pokeball');

let typePokemon;

function treatArray(array) {
    return array.join(" | ")
}

input.addEventListener('keydown', async function (event) {
    if (event.key !== "Enter") {
        return;
    }

    const inputValue = input.value.toLowerCase();

    const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}/`);
    promise.then(response => {

        if (!response.ok) {
            alert("Oops! Looks like this is an invalid value. Enter a number between 1 and 898");
            return;
        }

        main.classList.remove('hidden');
        pokeball.classList.remove('hidden');

        const promiseBody = response.json();

        promiseBody.then(body => {
            const arrayAbilities = body.abilities.map(ability => ability.ability.name);

            const arrayTypes = body.types.map(type => type.type.name);

            nome.textContent = body.name;
            abilities.textContent = treatArray(arrayAbilities);
            type.textContent = treatArray(arrayTypes);
            sprite.src = body.sprites.front_default;

            typePokemon = body.types[0].type.name.toString();
            root.removeAttribute('class');
            root.classList.add(typePokemon);
        });

    });
});