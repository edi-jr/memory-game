let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,
  cards: null,

  techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'git',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
    'typescript'
  ],

  createCardsFromTechs() {
    this.cards = [];
    this.techs.forEach(tech => this.cards.push(this.createPairFromTech(tech)));
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromTech(tech) {
    return [{
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      }, {
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
      }];
  },

  createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 100000);
  },

  shuffleCards(cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;
    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  },

  setCard(id) {
    const card = this.cards.filter(card => card.id === id)[0];
    if(card.flipped || this.lockMode) {
      return false;
    }
    if(!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch() {
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards() {
    this.lockMode = false;
    this.firstCard = null;
    this.secondCard = null;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    return this.cards.filter(card => !card.flipped).length == 0;
  }
}
