'use strict'
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.pintrue', {

    scrollTrigger: {
        trigger: ".pintrue",
        start: "top top",
        endTrigger: ".pinfalse",
        end: "+900vh top",
        pin: true,
        markers: true,
    },
});

const menuburger = document.querySelector(".topnav__burger");
const menu = document.querySelector(".topnav");
const menuburgeroff = document.querySelector(".topnav__liste");
menuburger.addEventListener("click", function () {
    menu.classList.toggle("topnav--open");
});

menuburgeroff.addEventListener("click", function () {
    menu.classList.remove("topnav--open")
});







