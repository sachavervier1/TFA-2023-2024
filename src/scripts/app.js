'use strict'
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

gsap.to('.pintrue, .border1, .border2, .corner', {
    scrollTrigger: {
        trigger: ".pinactif", // Déclencheur pour la section projets
        start: "top top",           // Commence quand le haut de .sectionprojets atteint le haut de la fenêtre
        scrub: true,                // Animation fluide au défilement
        endTrigger: ".sectionphotos", // Fin de l'animation à la section photos
        end: 'bottom top',          // Fin quand le bas de .sectionprojets atteint le haut de la fenêtre
        pin: true,                  // Pin la section pendant le défilement
        markers: true,
    }
});









function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);


const menuburger = document.querySelector(".topnav__burger");
const menu = document.querySelector(".topnav");
const menuburgeroff = document.querySelector(".topnav__liste");
menuburger.addEventListener("click", function () {
    menu.classList.toggle("topnav--open");
});

menuburgeroff.addEventListener("click", function () {
    menu.classList.remove("topnav--open");
});

const logohover = document.querySelector(".logo");
const logoff = document.querySelector(".logos");
const logoff2 = document.querySelector(".logos2");
logohover.addEventListener('mouseover', event => {
    logoff.classList.remove("logo--off");
    logohover.classList.add("logo--modifier");
    logoff2.classList.remove("logo--off");

});
logohover.addEventListener('mouseout', event => {
    logoff.classList.add("logo--off");
    logoff2.classList.add("logo--off");
    logohover.classList.remove("logo--modifier");
});

document.addEventListener('DOMContentLoaded', function () {
    const noscroll = document.querySelector('body');
    const links = document.querySelectorAll('.projetlien');
    const buttonProjects = document.querySelectorAll('.buttonprojet');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            noscroll.classList.add('noscroll');

            // Show the section targeted by the link's href
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.classList.remove('visible');
            }
        });
    });

    buttonProjects.forEach(button => {
        button.addEventListener('click', function () {
            links.forEach(link => {
                const targetSection = document.querySelector(link.getAttribute('href'));
                if (targetSection) {
                    targetSection.classList.add('visible');
                }
            });
            noscroll.classList.remove('noscroll');
        });
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taquin = document.getElementById('taquin');
    const chronoElement = document.getElementById('chrono');
    const completionMessage = document.getElementById('completionMessage');
    const imagePath = '../assets/images/hwtaquin.png';  // Chemin de l'image que vous avez fournie
    const gridSize = 4;
    const pieces = [];
    let emptyPiece = { row: gridSize - 1, col: gridSize - 1 };
    let startTime = null;
    let intervalId = null;
    let isGameStarted = false;

    function startChrono() {
        if (!isGameStarted) {
            isGameStarted = true;
            startTime = new Date();
            intervalId = setInterval(updateChrono, 1000);
        }
    }

    function updateChrono() {
        const now = new Date();
        const elapsedTime = Math.floor((now - startTime) / 1000);
        const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = (elapsedTime % 60).toString().padStart(2, '0');
        chronoElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function stopChrono() {
        clearInterval(intervalId);
    }

    function checkIfCompleted() {
        return pieces.every(piece => {
            const correctRow = parseInt(piece.style.backgroundPosition.split(' ')[1]) / -100;
            const correctCol = parseInt(piece.style.backgroundPosition.split(' ')[0]) / -100;
            const currentRow = parseInt(piece.dataset.row);
            const currentCol = parseInt(piece.dataset.col);
            return correctRow === currentRow && correctCol === currentCol;
        });
    }

    // Fonction pour mélanger un tableau
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Initialisation des pièces
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (row === emptyPiece.row && col === emptyPiece.col) continue;

            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = `url(${imagePath})`;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            piece.dataset.row = row;
            piece.dataset.col = col;
            piece.addEventListener('click', () => movePiece(piece));
            taquin.appendChild(piece);
            pieces.push(piece);
        }
    }

    // Mélange des pièces
    shuffle(pieces);
    pieces.forEach((piece, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        piece.style.gridRowStart = row + 1;
        piece.style.gridColumnStart = col + 1;
        piece.dataset.row = row;
        piece.dataset.col = col;
    });

    function movePiece(piece) {
        const row = parseInt(piece.dataset.row);
        const col = parseInt(piece.dataset.col);
        console.log(`Clicked piece at (${row}, ${col})`);
        if (isAdjacent(row, col, emptyPiece.row, emptyPiece.col)) {
            startChrono();
            console.log(`Moving piece at (${row}, ${col}) to empty position at (${emptyPiece.row}, ${emptyPiece.col})`);
            // Échange les positions de la pièce cliquée et de la case vide
            piece.style.gridRowStart = emptyPiece.row + 1;
            piece.style.gridColumnStart = emptyPiece.col + 1;
            piece.dataset.row = emptyPiece.row;
            piece.dataset.col = emptyPiece.col;
            // Met à jour la position de la case vide
            emptyPiece.row = row;
            emptyPiece.col = col;
            console.log(`Moved piece to (${emptyPiece.row}, ${emptyPiece.col})`);

            if (checkIfCompleted()) {
                stopChrono();
                completionMessage.classList.remove('hidden');
            }
        } else {
            console.log(`Piece at (${row}, ${col}) is not adjacent to empty piece`);
        }
    }

    function isAdjacent(row1, col1, row2, col2) {
        return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
    }
});
