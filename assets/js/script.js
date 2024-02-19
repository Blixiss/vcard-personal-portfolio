'use strict';

// Fonction pour basculer l'état actif d'un élément
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Variables pour la barre latérale
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Fonctionnalité de basculement de la barre latérale pour mobile
if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// Variables pour le select personnalisé
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Basculer le select personnalisé
if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Ajout d'événements sur tous les éléments de sélection
selectItems.forEach(item => {
    item.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
});

// Variables pour le filtrage
const filterItems = document.querySelectorAll("[data-filter-item]");

// Fonction de filtrage
const filterFunc = function (selectedValue) {
    selectedValue = selectedValue.toLowerCase();

    filterItems.forEach(item => {
        let itemCategory = item.dataset.category.toLowerCase();

        if (selectedValue === "tous") {
            item.classList.add("active");
        } else if (itemCategory.includes(selectedValue)) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// Ajout d'événements sur tous les boutons de filtrage pour les grands écrans
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        if (lastClickedBtn) {
            lastClickedBtn.classList.remove("active");
        }
        this.classList.add("active");
        lastClickedBtn = this;
    });
});

// Variables pour le formulaire de contact
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Ajout d'événements sur tous les champs de saisie du formulaire
formInputs.forEach(input => {
    input.addEventListener("input", function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
});

// Variables pour la navigation entre pages
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Ajout d'événements sur tous les liens de navigation
navigationLinks.forEach((link, i) => {
    link.addEventListener("click", function () {
        const navLinkId = this.getAttribute('data-nav-link').toLowerCase();
        pages.forEach(page => {
            if (navLinkId === page.dataset.page) {
                page.classList.add("active");
                navigationLinks.forEach(link => link.classList.remove("active"));
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                page.classList.remove("active");
            }
        });
    });
});
