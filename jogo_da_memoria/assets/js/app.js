const cards = [1, 1, 2, 2, 3, 3, 4, 4];

/* functions */
async function generateImagePairs() {
    const imagePairs = {};

    for (let i = 0; i < cards.length; i++) {
        if (!imagePairs[cards[i]]) {
            const id = Math.floor(Math.random() * 1000) + 1;
            const url = `https://picsum.photos/id/${id}/200/300`;

            imagePairs[cards[i]] = [url, url];
        };
    };

    return imagePairs;
};

function shuffleCards(cards) {
    cards.sort(() => Math.random() - 0.5);
};

let flippedCards = 0;
let firstCard;
let secondCard;
let attempts = 0;

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

function flipCard() {
    if (flippedCards < 2 && !this.classList.contains('flip')) {
        flippedCards++;
        this.classList.add('flip');

        if (flippedCards === 1) {
            firstCard = this;
        }
        else {
            secondCard = this;
            attempts++

            updateAttempts();
            checkForMatch();
        };
    };
};

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data_card') === secondCard.getAttribute('card_card');
    isMatch ? disableCards() : unflipCard();
};

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (document.querySelectorAll('.card:not(.flip)').length === 0) {
        showCongratulationsMessage();
    };

    resetBoard();
};

function unflipCard() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
};

function resetBoard() {
    [flippedCards, firstCard, secondCard] = [0, null, null];
};

function updateAttempts() {
    const attemptsElement = document.querySelector('[data_attempts]');
    attemptsElement.textContent = `Tentativas: ${attempts}`;
};

function showCongratulationsMessage() {
    const congratulationsMessage = document.querySelector('[data_congratulations_container]');
    const congratulationsElement = document.createElement('p');

    congratulationsElement.classList.add('congratulations');
    congratulationsElement.textContent = `Parabéns! Você Venceu em ${attempts}`;
    congratulationsMessage.appendChild(congratulationsElement);

};

createCards();