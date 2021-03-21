const menuToggle = function () {
    const menuBtn = document.querySelector('.toggle');
    const menu = document.querySelector('.nav');
    const container = document.querySelector('.container');

    menuBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        menuBtn.classList.toggle('toggle--closed');
        menuBtn.classList.toggle('toggle--opened');
        menu.classList.toggle('nav--closed');
        menu.classList.toggle('nav--opened');
        container.classList.toggle('container--nav');
    });
};

const changeYear = function() {
    const year = document.querySelector('.year');
    year.innerHTML = new Date().getFullYear();
};

menuToggle();
changeYear();

new WOW().init();
