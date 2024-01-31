/*
The war game requires a 52 card deck
Two places have hands of cards and compare them
.....
*/
//Class for the card with methods to get value and color
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.getValue(rank);
       
    }
    getValue(rank){
        if(rank === 'Ace') return 14;
        if(rank === 'King') return 13;
        if(rank === 'Queen') return 12;
        if(rank === 'Jack') return 11;
    }
    get color() {
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
    }
}
// Class for the deck
class Deck {
    constructor() {
        this.cards = this.generateDeck();
    }
    // method to generate cards
    generateDeck(){
       const suits = ['❤️', '♦️', '♣️', '♠️'];
       const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
       const deck = [];
       for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < ranks.length; j++){
            deck.push(new Card(ranks[j], suits[i]));
        }
       }
       return deck;
    }
    // method to shuffle cards
    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    // Method to deal cards
    deal(players) {
        this.shuffle();
        for(let i = 0; i < this.cards.length; i++) {
            players[i % players.length].hand.push(this.cards[i]);
        }
    }
}
// Class for the players
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
// Method to play card, shift takes one from the array
    playCard() {
        return this.hand.shift();
    }

    
}
// Game class
class Game {
    constructor() {
        this.players = [new Player("Player 1"), new Player("Player 2")];
        this.deck = new Deck();
        this.deck.deal(this.players);
       
    }
    getPlayer1Deck(){
        return this.players[0].hand;
    }
    getPlayer2Deck(){
        return this.players[1].hand;
    }

    startGame() {
        while(this.players[0].hand.length > 0 && this.players[1].hand.length > 0) {
            this.playRound();
        }
        this.declareWinner
    }

    playRound() {
        const card1 = this.players[0].playCard();
        const card2 = this.players[1].playCard();

        console.log(`${this.players[0].name} plays ${card1.rank} of ${card1.suit}`);
        console.log(`${this.players[1].name} plays ${card2.rank} of ${card2.suit}`);

        if(card1.value > card2.value) {
            this.players[0].score++;
            console.log(`${this.players[0].name} wins this round`);
        } else if (card2.value > card1.value) {
            this.players[1].score++;
        } else {
            console.log(`This round is a tie`);
        }
    }

    declareWinner() {
        if (this.players[0].score > this.players[1].score) {
            console.log(`${this.players[0].name} wins the game with a score of ${this.players[0].score}`);
        } else if (this.players[1].score > this.players[0].score) {
            console.log(`${this.players[1].name} wins the game with a score of ${this.players[1].score}`);
        } else {
            console.log('The game is a tie!');
        }
    }
}

// To start the game
const warGame = new Game();
warGame.startGame();