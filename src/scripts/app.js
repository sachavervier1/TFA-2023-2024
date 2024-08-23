'use strict'
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

if (window.location.pathname === '/projets/tfa/' || window.location.pathname === '/projets/tfa/index.html') {

    gsap.to('.pintrue, .border1, .border2', {
        scrollTrigger: {
            trigger: ".pinactif",
            start: "top top",
            scrub: true,
            endTrigger: ".sectionphotos",
            end: '150% top',
            pin: true,
        }
    });

    gsap.to('.border1, .border2', {
        scaleX: 0,
        scrollTrigger: {
            trigger: ".sectionphotos",
            start: "bottom top",
            scrub: true,
            endTrigger: '.sectionapropos',
            end: 'top bottom',

        }
    });

    gsap.to('.pintrue', {
        opacity: 0,
        scrollTrigger: {
            trigger: ".sectionphotos",
            start: "bottom top",
            scrub: true,
            endTrigger: '.sectionapropos',
            end: 'top bottom',

        }
    });

    gsap.set('.buttonarrow', {
        opacity: 0,
        y: 500,

    });

    gsap.to('.buttonarrow', {
        opacity: 1,
        y: 75,
        delay: 2,

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


    function typeEffect(element, speed) {
        var text = element.innerHTML;
        text = text.replace(/&nbsp;/g, '\u00A0');
        element.innerHTML = "";

        var i = 0;
        var timer = setInterval(function () {
            if (i < text.length) {

                element.appendChild(document.createTextNode(text.charAt(i)));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    var speed = 100;
    var tag = document.querySelector('.nomprenom');



    typeEffect(tag, speed);






    document.addEventListener("DOMContentLoaded", function () {
        const sectionsnav = document.querySelectorAll(".sectionnav");
        const navLinksactif = document.querySelectorAll(".topnav__el a");
        let currentActive = "";


        function activateLink() {
            let newActive = "";
            const offsetThreshold = window.innerHeight / 5;

            sectionsnav.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollY >= sectionTop - offsetThreshold &&
                    scrollY < sectionTop + sectionHeight - offsetThreshold
                ) {
                    newActive = section.getAttribute("id");
                }
            });

            if (newActive && newActive !== currentActive) {

                navLinksactif.forEach(link => {
                    link.classList.remove("actifnav");
                });

                const activeLink = document.querySelector(`.topnav__el a[href="#${newActive}"]`);
                if (activeLink) {
                    activeLink.classList.add("actifnav");
                    currentActive = newActive;
                }
            }


            if (!newActive && scrollY <= 100) {
                navLinksactif.forEach(link => {
                    link.classList.remove("actifnav");
                });
                navLinksactif[0].classList.add("actifnav");
                currentActive = sectionsnav[0].getAttribute("id");
            }
        }

        activateLink();


        window.addEventListener("scroll", activateLink);
    });




    document.addEventListener('DOMContentLoaded', function () {
        const noscroll = document.querySelector('body');
        const links = document.querySelectorAll('.projetlien');
        const buttonProjects = document.querySelectorAll('.buttonprojet');
        let currentProjectIndex = 0;
        const projects = document.querySelectorAll('.presentationprojet');

        function showProject(index, direction = 'next') {
            projects.forEach((project, i) => {
                if (i === index) {
                    project.style.display = 'block';
                    project.classList.remove('hidden');

                    if (direction === 'next') {
                        project.classList.add('slide-in-right');
                    } else {
                        project.classList.add('slide-in-left');
                    }

                    setTimeout(() => {
                        project.classList.remove('slide-in-right', 'slide-in-left');
                    }, 500);

                } else {
                    project.classList.add('hidden');

                    if (direction === 'next') {
                        project.classList.add('slide-out-left');
                    } else {
                        project.classList.add('slide-out-right');
                    }

                    setTimeout(() => {
                        project.style.display = 'none';
                        project.classList.remove('slide-out-left', 'slide-out-right');
                    }, 500);
                }
            });
            noscroll.classList.add('noscroll');
        }

        function hideProject() {
            projects.forEach(project => {
                project.classList.add('hidden');
                project.style.display = 'none';
            });
            noscroll.classList.remove('noscroll');
        }

        function nextProject() {
            const nextIndex = (currentProjectIndex + 1) % projects.length;
            showProject(nextIndex, 'next');
            currentProjectIndex = nextIndex;
        }

        function prevProject() {
            const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            showProject(prevIndex, 'prev');
            currentProjectIndex = prevIndex;
        }

        links.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                noscroll.classList.add('noscroll');

                const targetSection = document.querySelector(this.getAttribute('href'));
                if (targetSection) {
                    const targetIndex = Array.from(projects).indexOf(targetSection);
                    const direction = targetIndex > currentProjectIndex ? 'next' : 'prev';
                    showProject(targetIndex, direction);
                    currentProjectIndex = targetIndex;
                }
            });
        });

        buttonProjects.forEach(button => {
            button.addEventListener('click', hideProject);
        });

        document.querySelectorAll('.next-project').forEach(button => {
            button.addEventListener('click', nextProject);
        });

        document.querySelectorAll('.prev-project').forEach(button => {
            button.addEventListener('click', prevProject);
        });

        hideProject();
    });


}


if (window.location.pathname === '/projets/tfa/taquin.html') {

    document.addEventListener('DOMContentLoaded', function () {
        const taquin = document.getElementById('taquin');
        const chronoElement = document.getElementById('chrono');
        const completionMessage = document.getElementById('completionMessage');
        const referenceImage = document.getElementById('referenceImage');
        const projetSelect = document.getElementById('projetSelect');
        const imagePathBase = '../tfa/assets/images/';
        const gridSize = 4;
        const pieces = [];
        let emptyPiece = { row: gridSize - 1, col: gridSize - 1 };
        let startTime = null;
        let intervalId = null;
        let isGameStarted = false;

        function chargerProjet(nomProjet) {
            const imagePath = imagePathBase + nomProjet + '.png';
            referenceImage.src = imagePath;
            pieces.forEach(piece => piece.remove());
            pieces.length = 0;

            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (row === emptyPiece.row && col === emptyPiece.col) continue;

                    const piece = document.createElement('div');
                    piece.classList.add('piece');
                    piece.style.backgroundImage = `url(${imagePath})`;
                    piece.dataset.row = row;
                    piece.dataset.col = col;
                    piece.addEventListener('click', () => movePiece(piece));
                    taquin.appendChild(piece);
                    pieces.push(piece);
                }
            }

            updatePieceStyles();
            shuffle(pieces);
            pieces.forEach((piece, index) => {
                const row = Math.floor(index / gridSize);
                const col = index % gridSize;
                piece.style.gridRowStart = row + 1;
                piece.style.gridColumnStart = col + 1;
                piece.dataset.row = row;
                piece.dataset.col = col;
            });
        }

        function updatePieceStyles() {
            const taquinWidth = taquin.clientWidth;
            const pieceSize = taquinWidth / gridSize;

            pieces.forEach(piece => {
                const row = parseInt(piece.dataset.row);
                const col = parseInt(piece.dataset.col);
                piece.style.width = `${pieceSize}px`;
                piece.style.height = `${pieceSize}px`;
                piece.style.backgroundSize = `${pieceSize * gridSize}px ${pieceSize * gridSize}px`;
                piece.style.backgroundPosition = `-${col * pieceSize}px -${row * pieceSize}px`;
            });
        }

        projetSelect.addEventListener('change', function () {
            chargerProjet(this.value);
        });

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
                const correctRow = parseInt(piece.style.backgroundPosition.split(' ')[1]) / -parseInt(piece.style.height);
                const correctCol = parseInt(piece.style.backgroundPosition.split(' ')[0]) / -parseInt(piece.style.width);
                const currentRow = parseInt(piece.dataset.row);
                const currentCol = parseInt(piece.dataset.col);
                return correctRow === currentRow && correctCol === currentCol;
            });
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function movePiece(piece) {
            const row = parseInt(piece.dataset.row);
            const col = parseInt(piece.dataset.col);
            if (isAdjacent(row, col, emptyPiece.row, emptyPiece.col)) {
                startChrono();

                piece.style.gridRowStart = emptyPiece.row + 1;
                piece.style.gridColumnStart = emptyPiece.col + 1;
                piece.dataset.row = emptyPiece.row;
                piece.dataset.col = emptyPiece.col;

                emptyPiece.row = row;
                emptyPiece.col = col;

                if (checkIfCompleted()) {
                    stopChrono();
                    completionMessage.classList.remove('hidden');
                }
            }
        }

        function isAdjacent(row1, col1, row2, col2) {
            return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
        }

        chargerProjet(projetSelect.value);

        window.addEventListener('resize', updatePieceStyles);
    });


}