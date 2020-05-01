const FRONT = 'card_front';
const BACK = 'card_back';
const CARD = 'card';
const ICON = 'icon';
const gameBoard = document.querySelector('#gameBoard');
const gameOverLayer = document.querySelector('#gameOver');

window.onload = () => {
  initializeCards(game.createCardsFromTechs());
  document.querySelector('#restart').addEventListener('click', restart);
}

function initializeCards(cards) {
  gameBoard.innerHTML = '';
  game.cards.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;
    createCardContent(card, cardElement);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  const cardElementFace = document.createElement('img');
  cardElementFace.classList.add(face);
  cardElementFace.src = face === FRONT ? `assets/images/${card.icon}.png` : 'assets/images/backface.png';
  element.appendChild(cardElementFace);
}

function flipCard() {
  if(game.setCard(this.id)) {
    this.classList.add('flip');
    if(game.secondCard) {
      if(game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          setTimeout(() => gameOverLayer.style.display = 'flex', 500);
        }
      } else {
        setTimeout(() => {
          const cardsView = [document.querySelector(`#${game.firstCard.id}`), document.querySelector(`#${game.secondCard.id}`)];
          cardsView.forEach(card => card.classList.remove('flip'));
          game.unflipCards();
        }, 500);
      }
    }
  }
}

function restart() {
  game.clearCards();
  initializeCards(game.createCardsFromTechs());
  gameOverLayer.style.display = 'none';
}
