// Imports your SCSS stylesheet
import '@/styles/index.scss';


const cardvalues: string[] = ['diamond', 'heart', 'spade', 'diamond', 'heart', 'spade'];
const cardSymbols: {
    'diamond': string;
    'heart': string;
    'spade': string;
} = {
    'diamond': '♦️',
    'heart': '♥️',
    'spade': '♠️',
}
let attempts: number = 3;
let hasFlippedCard: boolean = false;
let lockBoard: boolean = false;
let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let matchedPairs: number = 0;

const attemptNumEl = document.getElementById('attemptNum') as HTMLElement;
const resultsEl = document.getElementById('results') as HTMLElement;
const theGameEl = document.getElementById('thegame') as HTMLElement;
const restartBtn = document.getElementById('btn') as HTMLButtonElement;

// Shuffle cards
const shuffle = (array: any[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;    
}

// Start game
const startgame = () => {
    attempts = 0;
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    matchedPairs = 0;

    attemptNumEl.textContent = attempts.toString();
    resultsEl.innerHTML = ''; 
    theGameEl.innerHTML = '';
    
    const shuffledValues = shuffle(cardvalues);
      
    shuffledValues.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        
        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'back-face');
        
        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'front-face');
        
        const pic = document.createElement('h2');
        pic.innerHTML = cardSymbols[value as keyof typeof cardSymbols];
        frontFace.appendChild(pic);
        
        card.appendChild(backFace);
        card.appendChild(frontFace);
        card.addEventListener('click', flipCard);
        
        theGameEl.appendChild(card);
    });
}

// Flip card 
const flipCard = (event: Event) => {
    const card = event.currentTarget as HTMLElement;
    
    if (lockBoard) return;
    if (card === firstCard) return; 
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
}

// Match check
const checkForMatch = () => {
    if (!firstCard || !secondCard) return;
    
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === 3) {
            setTimeout(() => {
                resultsEl.innerHTML = '<h4>You Win!</h4>';
            }, 500);
        }
    } else {
        unflipCards();
        attempts++;
        attemptNumEl.textContent = attempts.toString();
        if (attempts === 3 && matchedPairs === 0) {
            setTimeout(() => {
                resultsEl.innerHTML = '<h4 class="lose">Game Over! Try Again!</h4>';
                lockBoard = true;
            }, 1000);
        }
    }
}

// Disable cards
const disableCards = () => {
    if (!firstCard || !secondCard) return;
    
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

// Unflip cards
const unflipCards = () => {
    setTimeout(() => {
        if (firstCard) firstCard.classList.remove('flipped');
        if (secondCard) secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

// Reset board
const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Restart game
restartBtn.addEventListener('click', startgame);

// Initialize game on page load
startgame();