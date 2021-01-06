const menuBtn = document.querySelector('.toggle');
const menu = document.querySelector('.nav');
const container = document.querySelector('.container');

menuBtn.addEventListener('click', function (evt) {
    evt.preventDefault()
    menuBtn.classList.toggle('toggle--closed');
    menuBtn.classList.toggle('toggle--opened');
    menu.classList.toggle('nav--closed');
    menu.classList.toggle('nav--opened');
    container.classList.toggle('container--nav');
});