///////SLIDER////////
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.btnleft ');
const btnRight = document.querySelector('.btnright ');

let curSlide = 0;

const goToSlide = (slide) => {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    });
}
goToSlide(0)

btnRight.addEventListener('click', () => {
    curSlide++;
    if (curSlide > 3) curSlide = 0
    goToSlide(curSlide)
})

btnLeft.addEventListener('click', () => {
    curSlide--;
    if (curSlide < 0) curSlide = 3
    goToSlide(curSlide)
})




const cards = document.querySelectorAll('.card')
const prodRight = document.querySelector('.btn-prod-der')
const prodLeft = document.querySelector('.btn-prod-izq')

let curCard = 0
let maxCard = cards.length


const goToCard = (card) => {
    cards.forEach((s, i) => {

        console.log(`${110 * (card)}`, "card");
        s.style.transform = `translateX(${110 * (i - card * 1.9)}%)`
    });

}
goToCard(0)

prodLeft.addEventListener('click', () => {
    if (curCard > 0) {
        curCard--;
        goToCard(curCard)

    }
})

prodRight.addEventListener('click', () => {
    if (curCard < cards.length - 4) {
        curCard++
        goToCard(curCard)
    }

})
