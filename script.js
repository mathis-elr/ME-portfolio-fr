document.addEventListener('DOMContentLoaded', function() {

    /*--- Contacts ---*/
    const contact = document.getElementById("contact");
    const iconContact = document.getElementById("icon-contact");
    contact.addEventListener("mouseover", function () {
        iconContact.src = "images/icon-contact-orange.png";
        this.classList.add("afficheInfos");
    })
    contact.addEventListener("mouseout", function () {
        this.classList.remove("afficheInfos");
        iconContact.src = "images/icon-contact-blanc.png";
    })

    /*--- Disparition navbar quand on scroll ---*/
    const nav = document.getElementById('pages');
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > 100) {
            nav.style.transform = 'translateY(105%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    });
})

let animationEncours = false;

function changeContenuPage(nomPage, nomSection) {
    if (animationEncours) {
        return;
    }

    const pagesNav = Array.from(document.getElementsByClassName("page"));
    const indexActif = pagesNav.findIndex(page => page.classList.contains("active-page"));
    const indexNouveau = pagesNav.findIndex(page => page.id === nomSection);
    let sensAnimation;

    if (indexNouveau === indexActif) {
        return;
    } else if (indexNouveau < indexActif) {
        sensAnimation = 'PRECEDENT';
    } else {
        sensAnimation = 'SUIVANT';
    }

    animationEncours = true;

    const sections = document.querySelectorAll('.section');
    console.log(sections);
    let section = null;
    sections.forEach(s => {
        const computed = window.getComputedStyle(s);
        if (computed.display === 'block' && s.id !== nomPage) {
            section = s;
        }
    });

    sections.forEach(s => {
        if (s !== section && s.id !== nomPage) {
            s.style.display = 'none';
        }
    });

    // Nettoyage de TOUTES les classes d'animation
    sections.forEach(s => {
        s.classList.remove('entrantGauche', 'entrantDroite', 'sortantGauche', 'sortantDroite');
    });

    const nouvellePage = document.getElementById(nomPage);

    if (sensAnimation === 'SUIVANT') {
        // 1. Afficher d'abord l'élément
        nouvellePage.style.display = "block";

        // 2. Forcer un reflow pour que le navigateur prenne en compte le display
        nouvellePage.offsetHeight;

        // 3. Ajouter les classes d'animation
        section.classList.add("sortantGauche");
        nouvellePage.classList.add("entrantDroite");

        section.addEventListener('animationend', function handler() {
            section.style.display = "none";
            section.classList.remove("sortantGauche");
            section.removeEventListener('animationend', handler);

            nouvellePage.classList.remove("entrantDroite");
            animationEncours = false;
        });

    } else if (sensAnimation === 'PRECEDENT') {
        // 1. Afficher d'abord l'élément
        nouvellePage.style.display = "block";

        // 2. Forcer un reflow
        nouvellePage.offsetHeight;

        // 3. Ajouter les classes d'animation
        section.classList.add("sortantDroite");
        nouvellePage.classList.add("entrantGauche");

        section.addEventListener('animationend', function handler() {
            section.style.display = "none";
            section.classList.remove("sortantDroite");
            section.removeEventListener('animationend', handler);

            nouvellePage.classList.remove("entrantGauche");
            animationEncours = false;
        });
    }

    let pages = document.getElementsByClassName("page");
    for (let page of pages) {
        if (page.classList.contains("active-page")) {
            page.classList.remove("active-page");
            page.querySelector("img").src = "images/icon-"+page.id+"-blanc.png";
            break;
        }
    }
    const nvlSection = document.getElementById(nomSection);
    nvlSection.classList.add("active-page");
    nvlSection.querySelector("img").src = "images/icon-"+nvlSection.id+"-orange.png";
}


/*
    document.querySelector('body').addEventListener('wheel', (function () {

        let isScrolling = false;

        return function (e) {
            if (isScrolling) {
                return;
            }

            isScrolling = true;

            if (Math.abs(e.deltaX) < 10) {
                isScrolling = false;
                return;
            }

            const pagesNav = Array.from(document.getElementsByClassName("page"));
            const idPageActive = document.querySelector(".active-page").id;
            const indexPageActive = pagesNav.findIndex(page => page.id === idPageActive);
            let indexNouveau;

            if (e.deltaX > 0) {
                indexNouveau = indexPageActive + 1;
            } else {
                indexNouveau = indexPageActive - 1;
            }

            if (indexNouveau >= 0 && indexNouveau < pagesNav.length) {
                const idNouveau = pagesNav[indexNouveau].id;
                const nomPage = idNouveau.split('-')[0];

                console.log(idNouveau);
                console.log(nomPage);
                changeContenuPage(nomPage, idNouveau);
            }

            setTimeout(() => {
                isScrolling = false;
            }, 500);
        }
    })());
*/