"use strict"

let hamburgerMenu = document.querySelector('.hamburger-menu');
let exit = document.querySelector('.exit');

hamburgerMenu.addEventListener('click', function () {
    document.querySelector('.exit').style.display = 'block';
    document.querySelector('.drop-down').style.display = 'block';
    hamburgerMenu.style.display = 'none';
});


exit.addEventListener('click', function () {
    document.querySelector('.exit').style.display = 'none';
    document.querySelector('.drop-down').style.display = 'none';
    hamburgerMenu.style.display = 'block';
})