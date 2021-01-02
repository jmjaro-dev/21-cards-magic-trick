import { useState, useEffect } from 'react'; 
import './App.css';
// Components
import Instructions from './components/Instructions.jsx';
import PlayArea from './components/PlayArea.jsx';
// Cards DB
import { cards } from './components/cards';
// 
import CardDesign from './assets/icons/backdesign.png';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isDeckSet, setIsDeckSet] = useState(false);
  const [areCardsReturned, setAreCardsReturned] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [deck, setDeck] = useState(cards);  
  const [genCards, setGenCards] = useState([]);  
  const [round, setRound] = useState(1);
  const [instructions, setInstructions] = useState('Click the deck of cards to Start.');
  const [method, setMethod] =  useState(Math.floor((Math.random() * 3 )));
  let generatedCards = document.querySelectorAll('.card');
  let selectedColumn;
  let selectedPile = [];
  let secondPile = [];
  let thirdPile = [];
  // Reference for Elements in DOM
  const cardArea = document.querySelector('.cards-area');
  const buttons = document.querySelectorAll('.col-btn');
  const resetbtn = document.querySelector('.play-again-btn');
  
  useEffect(() => {
    // shuffles the deck
    if(deck && isStarted === false && isShuffled === false && isDeckSet === false  && round === 1 && isGameOver === false) {
      // shuffle deck
      shuffle(deck);
      // set isShuffled to true
      setIsShuffled(true);
      console.log('deck shuffled', round);
    }

    // Sets the deck with the Shuffled Cards and updates the instructions
    if(isStarted === true && isShuffled === true && isDeckSet === false  && round === 1 && isGameOver === false) {
      // updates the state of 'deck' with the shuffled deck
      setDeck(deck);
      // sets isDeckSet to true
      setIsDeckSet(true);
      setTimeout(() => setInstructions('Now, choose a card to remember and click the button that corresponds to the column of your card.'), 6000);
    }

    // Deals the Cards
    if(isStarted === true && isShuffled === true && isDeckSet === true  && areCardsReturned === true && round <= 3) {
      // Deals the cards
      dealCards(deck);
      setAreCardsReturned(false);
    }

    // Reveals the Guessed Card and Show the Play Again Button
    if(isStarted === true && isShuffled === true && isDeckSet === true  && areCardsReturned === true && round === 4 && isGameOver === false) {
      // Reveals the choosen card
      revealCard();
      setTimeout(() => setInstructions('Is this your Card?'), 4000);
      // Set isGameOver to true
      setIsGameOver(true);
      // Show Play Again Button
      setTimeout(showResetButton, 5000);
    }

    // eslint-disable-next-line
  }, [isStarted, isShuffled, isDeckSet, areCardsReturned, isGameOver, round]);

  const onStart = () => {
    if(isStarted === false ) {
      setInstructions('Please wait while I\'m preparing the deck for you :)');
      setIsStarted(true);
    }
  }

  const onReset = () => {
    hideResetButton();
    setIsStarted(false);
    setIsShuffled(false);
    setIsDeckSet(false);
    setIsGameOver(false);
    setDeck(cards);  
    setGenCards([]);  
    setRound(1);
    setMethod(Math.floor((Math.random() * 3 )));
    setInstructions('Click the deck of cards to Start.');
    generatedCards = document.querySelectorAll('.card');
    // Remove Cards in UI
    generatedCards.forEach(card => card.remove());
    selectedPile = [];
    secondPile = [];
    thirdPile = [];
  }

  const shuffle = deck => {
    let loc1, loc2, temp;

    for(let i = 0; i < 1000; i++) {
      loc1 = Math.floor((Math.random() * deck.length ));
      loc2 = Math.floor((Math.random() * deck.length ));
      
      temp = deck[loc1];
      deck[loc1] = deck[loc2];
      deck[loc2] = temp;
      
      setDeck(deck);
    }
  }

  const hideButtons = () => {
    buttons.forEach(btn => btn.style.visibility = "hidden");
  }

  const showButtons = () => {
    buttons.forEach(btn => btn.style.visibility = "visible");
  }

  const hideResetButton = () => {
    resetbtn.style.visibility = "hidden";
  }

  const showResetButton = () => {
    resetbtn.style.visibility = "visible";
  }

  const dealCards = () => {
    let html;
    
    if(generatedCards && generatedCards.length === 0) {
      console.log(generatedCards);
      deck.forEach(card => {
        html = `
          <div class="card">
            <div class="flip-card">
              <div class="card-front">
                <div class="top-label">
                  <span class=${card.color}>${card.value}</span>
                  <img src=${card.suiteIcon} alt=${card.desc} />
                </div>
                <div class="bottom-label">
                  <span class=${card.color}>${card.value}</span>
                  <img src=${card.suiteIcon} alt=${card.desc} />
                </div>
              </div>
              <div class="card-back">
                <img src=${CardDesign} alt="Deck of Cards"/>
              </div>
            </div>
          </div>
        `;
  
        cardArea.innerHTML += html;
      });

      generatedCards = document.querySelectorAll('.card');

      // initialize cards
      if(generatedCards.length === 21) {
        setGenCards(generatedCards);
        
        generatedCards.forEach((card, idx) => {
          setTimeout( () => {
            card.classList.remove(`rc${idx}`);
            card.classList.add(`rd${idx}`);
          }, 500);
        });
        
        setTimeout(showButtons, 5700);
      }
    } else {
      // updateCards
      generatedCards = document.querySelectorAll('.card');
      
      deck.forEach((card, idx) => {  
        generatedCards[idx].innerHTML = `
          <div class="flip-card">
            <div class="card-front">
              <div class="top-label">
                <span class=${card.color}>${card.value}</span>
                <img src=${card.suiteIcon} alt=${card.desc} />
              </div>
              <div class="bottom-label">
                <span class=${card.color}>${card.value}</span>
                <img src=${card.suiteIcon} alt=${card.desc} />
              </div>
            </div>
            <div class="card-back">
              <img src=${CardDesign} alt="Deck of Cards"/>
            </div>
          </div>
        `;
        generatedCards[idx].classList.remove(`rc${idx}`);
        generatedCards[idx].classList.add(`rd${idx}`);
      });

      setTimeout(showButtons, 5200);
    }

  }

  const returnCards = cards => {
    cards.forEach((card, idx) => {
      setTimeout( () => {
        card.classList.remove(`rd${idx}`);
        card.classList.add(`rc${idx}`);
      }, 500);
    });
    setTimeout(() => setAreCardsReturned(true), 5700);
  }

  const revealCard = () => {
    generatedCards = document.querySelectorAll('.card');  
    
    deck.forEach((card, idx) => {
      generatedCards[idx].innerHTML = `
        <div class="flip-card">
          <div class="card-front">
            <div class="top-label">
              <span class=${card.color}>${card.value}</span>
              <img src=${card.suiteIcon} alt=${card.desc} />
            </div>
            <div class="bottom-label">
              <span class=${card.color}>${card.value}</span>
              <img src=${card.suiteIcon} alt=${card.desc} />
            </div>
          </div>
          <div class="card-back">
            <img src=${CardDesign} alt="Deck of Cards"/>
          </div>
        </div>
      `;
    });

    if(method === 0) {
      generatedCards[0].classList.add('reveal');
    }
    if(method === 1) {
      generatedCards[10].classList.add('reveal');
    }
    if(method === 2) {
      generatedCards[20].classList.add('reveal');
    }
  }

  const setPileValues = column => {
    if(column === 1) {
      // Put the values of the Selected Column to 'selectedPile'
      for(let i=0, j=0; i < 7; i++){
        selectedPile[i] = deck[j];
        j+=3;
      }
      // Put the values of Column 2 to 'secondPile'
      for(let i=0, j=1; i < 7; i++){
        secondPile[i] = deck[j];
        j+=3;
      } 
      // Put the values of Column 3 to 'thirdPile'
      for(let i=0, j=2; i < 7; i++){
        thirdPile[i] = deck[j];
        j+=3;
      }
    }

    if(column === 2) {
      // Put the values of Column 1 to 'secondPile'
      for(let i=0, j=0; i < 7; i++){
        secondPile[i] = deck[j];
        j+=3;
      }
      // Put the values of the Selected Column to 'selectedPile'
      for(let i=0, j=1; i < 7; i++){
        selectedPile[i] = deck[j];
        j+=3;
      } 
      // Put the values of Column 3 to 'thirdPile'
      for(let i=0, j=2; i < 7; i++){
        thirdPile[i] = deck[j];
        j+=3;
      }
    }
    
    if(column === 3) {
      // Put the values of Column 1 to 'secondPile'
      for(let i=0, j=0; i < 7; i++){
        secondPile[i] = deck[j];
        j+=3;
      }
      // Put the values of Column 2 to 'thirdPile'
      for(let i=0, j=1; i < 7; i++){
        thirdPile[i] = deck[j];
        j+=3;
      } 
      // Put the values of the Selected Column to 'selectedPile'
      for(let i=0, j=2; i < 7; i++){
        selectedPile[i] = deck[j];
        j+=3;
      }
    }
  }

  const pileOnTop = (column) => {
    setPileValues(column);
    const updatedDeck = selectedPile.concat(secondPile, thirdPile);
    setRound(round + 1);
    setDeck(updatedDeck);
  }

  const pileOnMiddle = (column) => {
    setPileValues(column);
    const updatedDeck = secondPile.concat(selectedPile, thirdPile);
    setRound(round + 1);
    setDeck(updatedDeck);
  }

  const pileOnBottom = (column) => {
    setPileValues(column);
    const updatedDeck = secondPile.concat(thirdPile, selectedPile);
    setRound(round + 1);
    setDeck(updatedDeck);
  }

  const magicShuffle = (column, method, round, deck) => {
    // ! Round 1
    if(round === 1) {
      if(method === 0) {
        pileOnTop(column, deck);
      }
      if(method === 1) {
        pileOnMiddle(column, deck);
      }
      if(method === 2) {
        pileOnBottom(column, deck);
      }
      setTimeout(() => setInstructions('Where is your card now?'), 11500);
    }

    // ! Round 2
    if(round === 2) {
      if(method === 0) {
        pileOnTop(column, deck);
      }
      if(method === 1) {
        pileOnMiddle(column, deck);
      }
      if(method === 2) {
        pileOnBottom(column, deck);
      }
      setTimeout(() => setInstructions('Which column is your card located now?'), 11500);
    }

    if(round === 3) {
      if(method === 0) {
        pileOnTop(column, deck);
      }
      if(method === 1) {
        pileOnMiddle(column, deck);
      }
      if(method === 2) {
        pileOnBottom(column, deck);
      }
      setPileValues(column)
      setTimeout(() => setInstructions('Okay. It\'s time to reveal your card.'), 6000);
      setRound(round + 1);
    }
  }

  const onSelectColumn = e => {
    let target;
    setInstructions('Okay. Preparing the cards for the next round. Don\'t forget your card :)');
    hideButtons();
    
    if(e.target.tagName === "DIV") {
      target = e.target.id[3];
    }
    if(e.target.tagName === "SPAN") {
      target = e.target.parentElement.id[3];
    }

    selectedColumn = Number(target);
    returnCards(genCards);
    magicShuffle(selectedColumn, method, round, deck);      
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title" >21 Cards Magic Trick</h1>
        <Instructions instructions={instructions} />
        <PlayArea onStart={onStart} onReset={onReset} onSelectColumn={onSelectColumn}/>
      </div>
    </div>
  );
}

export default App;
