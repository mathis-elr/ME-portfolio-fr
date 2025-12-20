document.addEventListener('DOMContentLoaded', function() {

    /*--- Contacts ---*/
    function supportUtilise()
    {
        const ordinateur= window.matchMedia('(min-width: 1200px)')
        const contact = document.getElementById("contact");
        const iconContact = document.getElementById("icon-contact");

        if(ordinateur.matches)
        {
            /* version  souris */
            contact.addEventListener("mouseover", function () {
                iconContact.src = "images/icon-contact-orange.png";
                this.classList.add("afficheInfos");
            })
            contact.addEventListener("mouseout", function () {
                this.classList.remove("afficheInfos");
                iconContact.src = "images/icon-contact-blanc.png";
            })
        }
        else
        {
            /*version tactile*/
            contact.addEventListener("click", function () {
                if(this.classList.contains("afficheInfos"))
                {
                    this.classList.remove("afficheInfos");
                    iconContact.src = "images/icon-contact-blanc.png";
                }
                else
                {
                    iconContact.src = "images/icon-contact-orange.png";
                    this.classList.add("afficheInfos");
                }
            })
        }
    }

    supportUtilise();

    /*--- Disparition navbar quand on scroll ---*/
    const nav = document.getElementById('sections');
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

function determinerSensNavigation(nomPage, nomSection)
{
    if (animationEncours) {
        return;
    }

    const idPageChoisi = document.getElementById(nomPage);
    const idSectionClique = document.getElementById(nomSection);

    const pagesNav = Array.from(document.getElementsByClassName("section"));
    const indexSectionCourante = pagesNav.findIndex(page => page.classList.contains("section-active"));
    const indexNouvelleSection = pagesNav.findIndex(page => page.id === nomSection);

    if (indexNouvelleSection === indexSectionCourante) {
        return;
    }

    animationEncours = true;

    if (indexNouvelleSection < indexSectionCourante) {
        changerContenuPageGauche(idPageChoisi, idSectionClique);
    }
    else {
        changerContenuPageDroite(idPageChoisi, idSectionClique);
    }
}

function changerContenuPageGauche(idPageChoisi, idSectionClique)
{
    const sectionCourante = document.querySelector(".section-active");
    const pageCourante = document.querySelector(".page-active");

    pageCourante.classList.add("sortantDroite");

    pageCourante.addEventListener("animationend", function () {
        pageCourante.style.display = "none";
        pageCourante.classList.remove("sortantDroite");
        idPageChoisi.style.display = "block";
        idPageChoisi.classList.add("entrantGauche");

        idPageChoisi.addEventListener("animationend", function () {
            idPageChoisi.classList.remove("entrantGauche");

            pageCourante.classList.remove("page-active");
            idPageChoisi.classList.add("page-active");

            animationEncours = false;
        },{ once: true })
    },{ once: true })

    sectionCourante.querySelector("img").src = "images/icon-"+sectionCourante.id+"-blanc.png";
    idSectionClique.querySelector("img").src = "images/icon-"+idSectionClique.id+"-orange.png";
    sectionCourante.classList.remove("section-active");
    idSectionClique.classList.add("section-active");
}

function changerContenuPageDroite(idPageChoisi, idSectionClique)
{
    const sectionCourante = document.querySelector(".section-active");
    const pageCourante = document.querySelector(".page-active");

    pageCourante.classList.add("sortantGauche");

    pageCourante.addEventListener("animationend", function () {
        pageCourante.style.display = "none";
        pageCourante.classList.remove("sortantGauche");
        idPageChoisi.style.display = "block";
        idPageChoisi.classList.add("entrantDroite");

        idPageChoisi.addEventListener("animationend", function () {
            idPageChoisi.classList.remove("entrantDroite");

            pageCourante.classList.remove("page-active");
            idPageChoisi.classList.add("page-active");

            animationEncours = false;
        },{ once: true })
    },{ once: true })

    sectionCourante.querySelector("img").src = "images/icon-"+sectionCourante.id+"-blanc.png";
    idSectionClique.querySelector("img").src = "images/icon-"+idSectionClique.id+"-orange.png";
    sectionCourante.classList.remove("section-active");
    idSectionClique.classList.add("section-active");
}

function modulo(dividende, diviseur)
{
    //le modulo n'existe pas en js faut faire d'une autre manière
    return ((dividende%diviseur) + diviseur)%diviseur;
}

function afficheProjetGauche()
{
    const projets =  Array.from(document.getElementsByClassName("projet"));
    const idxProjetGauche = (projets.findIndex(projet => projet.id === "projet-gauche") - 1);
    const NB_PROJETS = projets.length;
    const idxProjetGaucheSuivant = modulo(idxProjetGauche, NB_PROJETS);

    const projetGaucheSuivant = projets[idxProjetGaucheSuivant]
    const projetGauche = document.getElementById("projet-gauche");
    const projetCentral = document.getElementById("projet-central");
    const projetDroite = document.getElementById("projet-droite");


    projetDroite.classList.remove("droite");
    projetCentral.classList.remove("central");
    projetGauche.classList.remove("gauche");

    projetGaucheSuivant.classList.add("gauche");
    projetCentral.classList.add("droite");
    projetGauche.classList.add("central");

    projetGaucheSuivant.onclick = function(){ afficheProjetGauche()};
    projetCentral.onclick = function(){ afficheProjetDroite()};
    projetGauche.onclick = null;
    projetDroite.onclick = null;

    projetDroite.id = null;
    projetGaucheSuivant.id = "projet-gauche";
    projetGauche.id = "projet-central";
    projetCentral.id = "projet-droite";
}

function afficheProjetDroite()
{
    const projets =  Array.from(document.getElementsByClassName("projet"));
    const idxProjetDroite = (projets.findIndex(projet => projet.id === "projet-droite") + 1);
    const NB_PROJETS = projets.length;
    const idxProjetDroiteSuivant = modulo(idxProjetDroite, NB_PROJETS);

    const projetDroiteSuivant = projets[idxProjetDroiteSuivant]
    const projetGauche = document.getElementById("projet-gauche");
    const projetCentral = document.getElementById("projet-central");
    const projetDroite = document.getElementById("projet-droite");

    projetGauche.classList.remove("gauche");
    projetCentral.classList.remove("central");
    projetDroite.classList.remove("droite");
    projetDroiteSuivant.classList.add("droite");
    projetDroite.classList.add("central");
    projetCentral.classList.add("gauche");

    projetDroiteSuivant.onclick = function(){ afficheProjetDroite()};
    projetCentral.onclick = function(){ afficheProjetGauche()};
    projetDroite.onclick = null;
    projetGauche.onclick = null;

    projetGauche.id = null;
    projetDroite.id = "projet-central";
    projetDroiteSuivant.id = "projet-droite";
    projetCentral.id = "projet-gauche";
}


// function changeContenuPage(nomPage, nomSection)
// {
//     if (animationEncours) {
//         return;
//     }
//
//     const pagesNav = Array.from(document.getElementsByClassName("page"));
//     const indexActif = pagesNav.findIndex(page => page.classList.contains("active-page"));
//     const indexNouveau = pagesNav.findIndex(page => page.id === nomSection);
//     let sensAnimation;
//
//     if (indexNouveau === indexActif) {
//         return;
//     } else if (indexNouveau < indexActif) {
//         sensAnimation = 'PRECEDENT';
//     } else {
//         sensAnimation = 'SUIVANT';
//     }
//
//     animationEncours = true;
//
//     const sections = document.querySelectorAll('.section');
//     let section = null;
//     sections.forEach(s => {
//         const computed = window.getComputedStyle(s);
//         if (computed.display === 'block' && s.id !== nomPage) {
//             section = s;
//         }
//     });
//
//     // // Nettoyage de TOUTES les classes d'animation
//     // sections.forEach(s => {
//     //     s.classList.remove('entrantGauche', 'entrantDroite', 'sortantGauche', 'sortantDroite');
//     // });
//
//     const nouvellePage = document.getElementById(nomPage);
//
//     if (sensAnimation === 'SUIVANT') {
//         // 1. Afficher d'abord l'élément
//         nouvellePage.style.display = "block";
//
//         // 3. Ajouter les classes d'animation
//         section.classList.add("sortantGauche");
//         nouvellePage.classList.add("entrantDroite");
//
//         section.addEventListener('animationend', function handler() {
//             section.style.display = "none";
//             section.classList.remove("sortantGauche");
//             section.removeEventListener('animationend', handler);
//
//             nouvellePage.classList.remove("entrantDroite");
//             animationEncours = false;
//         });
//
//     }
//     else{
//         // 1. Afficher d'abord l'élément
//         nouvellePage.style.display = "block";
//
//         // 3. Ajouter les classes d'animation
//         section.classList.add("sortantDroite");
//         nouvellePage.classList.add("entrantGauche");
//
//         section.addEventListener('animationend', function handler() {
//             section.style.display = "none";
//             section.classList.remove("sortantDroite");
//             section.removeEventListener('animationend', handler);
//
//             nouvellePage.classList.remove("entrantGauche");
//             animationEncours = false;
//         });
//     }
//
//     let pages = document.getElementsByClassName("page");
//     for (let page of pages) {
//         if (page.classList.contains("active-page")) {
//             page.classList.remove("active-page");
//             page.querySelector("img").src = "images/icon-"+page.id+"-blanc.png";
//             break;
//         }
//     }
//     const nvlSection = document.getElementById(nomSection);
//     nvlSection.classList.add("active-page");
//     nvlSection.querySelector("img").src = "images/icon-"+nvlSection.id+"-orange.png";
// }