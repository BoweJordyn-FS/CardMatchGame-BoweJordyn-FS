// Imports your SCSS stylesheet
import '@/styles/index.scss';
const cards = document.querySelectorAll('.card');

let hasFlippedCard: boolean = false;
let firstCard;
let secondCard;

const flipCard = (event: Event) => {
  const card = event.currentTarget as HTMLElement;
  card.classList.add('flipped');
    if (!hasFlippedCard) {  
    hasFlippedCard = true;
    firstCard = card;
    return;
  } else {
    secondCard = card;
    hasFlippedCard = false;
  }
};

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});