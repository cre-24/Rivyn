/* RIVYN/MAIN.JS
*/

let currentIndex = -1;
let imgContainers = [];
let touchStartX = 0;
let touchEndX = 0;

function toggleOverlay(element) {
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    imgContainers = Array.from(document.querySelectorAll('.img-container'));
    currentIndex = imgContainers.indexOf(element);

    if (element.classList.contains('enlarged')) {
        overlayImg.src = element.querySelector('img').src;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Freeze scrolling
        document.addEventListener('keydown', handleArrowKeys);
        overlay.addEventListener('touchstart', handleTouchStart, {passive: true});
        overlay.addEventListener('touchend', handleTouchEnd, {passive: true});
    } else {
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        document.removeEventListener('keydown', handleArrowKeys);
        overlay.removeEventListener('touchstart', handleTouchStart);
        overlay.removeEventListener('touchend', handleTouchEnd);
    }
}

function closeOverlay() {
    const overlay = document.getElementById('overlay');
    imgContainers.forEach(container => container.classList.remove('enlarged'));
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    document.removeEventListener('keydown', handleArrowKeys);
    overlay.removeEventListener('touchstart', handleTouchStart);
    overlay.removeEventListener('touchend', handleTouchEnd);
}

function handleArrowKeys(e) {
    if (e.key === 'ArrowRight') {
        imgContainers[currentIndex].classList.remove('enlarged');
        currentIndex = (currentIndex + 1) % imgContainers.length;
        imgContainers[currentIndex].classList.add('enlarged');
        document.getElementById('overlay-img').src = imgContainers[currentIndex].querySelector('img').src;
    } else if (e.key === 'ArrowLeft') {
        imgContainers[currentIndex].classList.remove('enlarged');
        currentIndex = (currentIndex - 1 + imgContainers.length) % imgContainers.length;
        imgContainers[currentIndex].classList.add('enlarged');
        document.getElementById('overlay-img').src = imgContainers[currentIndex].querySelector('img').src;
    } else if (e.key === 'Escape' || e.key === ' ') {
        closeOverlay();
    }
}

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const minSwipeDistance = 50; // Minimum distance in px for swipe
    if (touchEndX < touchStartX - minSwipeDistance) {
        // Swipe left: next image (cycle)
        imgContainers[currentIndex].classList.remove('enlarged');
        currentIndex = (currentIndex + 1) % imgContainers.length;
        imgContainers[currentIndex].classList.add('enlarged');
        document.getElementById('overlay-img').src = imgContainers[currentIndex].querySelector('img').src;
    } else if (touchEndX > touchStartX + minSwipeDistance) {
        // Swipe right: previous image (cycle)
        imgContainers[currentIndex].classList.remove('enlarged');
        currentIndex = (currentIndex - 1 + imgContainers.length) % imgContainers.length;
        imgContainers[currentIndex].classList.add('enlarged');
        document.getElementById('overlay-img').src = imgContainers[currentIndex].querySelector('img').src;
    }
}