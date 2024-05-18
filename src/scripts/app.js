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











