const cards = [1, 1, 2, 2, 3, 3, 4, 4];

/* functions */
async function generateImagePairs() {
    const imagePairs = {};

    for (let i = 0; i < cards.length; i++) {
        if (!imagePairs[cards[i]]) {
            const id = Math.floor(Math.random() * 1000) + 1;
            const url = `https://picsum.photos/id/${id}/300/400`;

            imagePairs[cards[i]] = [url, url];
        };
    };

    return imagePairs;
};

function shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5);
};

async function createCards() {
    const imagePairs = await generateImagePairs();
    shuffleCards(cards);
    const cardsList = document.querySelector('[data_container]');

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        const cardBack = document.createElement('div');
        const cardFront = document.createElement('div');

        card.classList.add('card');
        cardBack.classList.add('back');
        cardFront.classList.add('front');
        cardBack.style.backgroundImage = `url('assets/img/card_back.png')`;

        const cardNumber = cards[i];
        const cardImage = imagePairs[cardNumber].pop();

        cardFront.style.backgroundImage = `url(${cardImage})`;
        card.setAttribute('data_card', cardNumber);
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        card.addEventListener('click', flipCard);
        cardsList.appendChild(card);
    };
};

let flippedCards = 0;
let attempts = 0;
let firstCard;
let secontCard;


function flipCard() {
    if (flippedCards < 2 && !this.classList.contains('flip')) {
        flippedCards++;
        this.classList.add('flip');

        if (flippedCards === 1) {
            firstCard = this;
        }
        else {
            secontCard = this;
            attempts++

            updateAttempts();
            checkForMatch();
        };
    };
};

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data_card') === secontCard.getAttribute('data_card');
};

function updateAttempts() {
    const attemptsElement = document.querySelector('[data_attempts]');
    attemptsElement.textContent = `Tentativas: ${attempts}`;
};

createCards();

// ('[data_congratulations_container]');
// ('[data_attempts_container]');