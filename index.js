
const carousel = document.querySelector('.carousel');
let cards = Array.from(document.querySelectorAll('.card'));
let isScrolling = false;
let startY = 0;
let positions = ['outgoing', 'top', 'center', 'bottom', 'incoming'];

function moveCards(direction) {
    if (isScrolling) return;
    isScrolling = true;

    cards.forEach(card => {
        const currentPos = card.getAttribute('data-position');
        const currentIndex = positions.indexOf(currentPos);
        let newIndex = direction === 'up'
            ? (currentIndex - 1 + positions.length) % positions.length
            : (currentIndex + 1) % positions.length;

        card.setAttribute('data-position', positions[newIndex]);
    });
    setTimeout(() => {
        isScrolling = false;
    }, 600);
}

carousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isScrolling) return;
    moveCards(e.deltaY > 0 ? 'up' : 'down');
});

document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    if (e.key === 'ArrowUp') {
        moveCards('down');
    } else if (e.key === 'ArrowDown') {
        moveCards('up');
    }
});
