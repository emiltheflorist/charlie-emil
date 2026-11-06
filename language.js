
const translations = {
    en: {
        "nav.home": "Home",
        "nav.timeline": "Our Timeline",
        "nav.baby": "Future Baby",
        "nav.sunshine": "Our Sunshine",
        "nav.gallery": "Galerie",
        "nav.gibby": "Gibby",

        "home.title": "Charlie & Emil | Our Story",
        "home.heading": "Charlie & Emil",
        "home.subtitle": "a little book of our love",
        "home.footer": "made with ♥ for us two",
        "home.top": "back to the top!",

        "timeline.title": "Our Journey | Charlie & Emil",
        "timeline.heading": "Our Journey Together",
        "timeline.subtitle": "Every little moment matters.",
        "timeline.start": "OUR STORY BEGAN",
        "timeline.chapter": "CHAPTER BY CHAPTER",
        "timeline.memories": "Our memories",
        "timeline.description": "A little look at how it all began.",
        "timeline.meet": "How We Met",
        "timeline.beginning": "Our very beginning",
        "timeline.meetText": "We met on Hinge on Valentine's Day. We clicked, and started to date soon after!",
        "timeline.signature": "The beginning of us ♡",
        "timeline.ending": "To all the chapters ahead...",
        "timeline.endingText": "Here's to the memories we've made, the ones we're making, and all the ones still waiting for us.",
        "timeline.back": "back to our story!",

        "baby.title": "Future Baby | Charlie & Emil",
        "baby.subtitle": "A little dream of ours",
        "baby.wishlist": "OUR LITTLE WISHLIST",
        "baby.heading": "Things for our sunshine",
        "baby.registry": "Our Baby Registry",
        "baby.description": "We've gathered some little things we'd love to have ready for our future little sunshine.",
        "baby.expected": "Expected date: October 2028",
        "baby.button": "Explore our wishlist ♡",
        "baby.small": "Opens our Amazon baby registry",
        "baby.note": "We haven't met you yet, but we already have so much love to give you.",
        "baby.footer": "made with ♥ for our little future",
        "baby.back": "Back to our story",

        "gallery.title": "Galerie ♡ | Charlie & Emil",
        "gallery.subtitle": "All the little moments that make our story.",
        "gallery.read": "♡ Read this memory",
        "gallery.hide": "♡ Hide memory",
        "gallery.empty": "No memory added yet. ♡",
        "gallery.close": "Close",
        "gallery.previous": "Previous photo",
        "gallery.next": "Next photo",

        "sunshine.title": "Our Sunshine | Charlie & Emil",
        "gibby.title": "Gibby | Charlie & Emil"
    },

    fr: {
        "nav.home": "Accueil",
        "nav.timeline": "Notre parcours",
        "nav.baby": "Notre futur bébé",
        "nav.sunshine": "Notre rayon de soleil",
        "nav.gallery": "Galerie",
        "nav.gibby": "Gibby",

        "home.title": "Charlie & Emil | Notre histoire",
        "home.heading": "Charlie & Emil",
        "home.subtitle": "un petit livre de notre amour",
        "home.footer": "fait avec ♥ pour nous deux",
        "home.top": "retour en haut !",

        "timeline.title": "Notre parcours | Charlie & Emil",
        "timeline.heading": "Notre parcours ensemble",
        "timeline.subtitle": "Chaque petit moment compte.",
        "timeline.start": "NOTRE HISTOIRE A COMMENCÉ",
        "timeline.chapter": "CHAPITRE PAR CHAPITRE",
        "timeline.memories": "Nos souvenirs",
        "timeline.description": "Un petit aperçu de nos débuts.",
        "timeline.meet": "Notre rencontre",
        "timeline.beginning": "Le tout début de nous",
        "timeline.meetText": "On s'est rencontrés sur Hinge à la Saint-Valentin. Le courant a passé, et on a commencé à se fréquenter peu après !",
        "timeline.signature": "Le début de nous ♡",
        "timeline.ending": "À tous les chapitres à venir...",
        "timeline.endingText": "À tous les souvenirs qu'on a créés, ceux qu'on crée présentement et tous ceux qui nous attendent.",
        "timeline.back": "retour à notre histoire !",

        "baby.title": "Notre futur bébé | Charlie & Emil",
        "baby.subtitle": "Un petit rêve à nous",
        "baby.wishlist": "NOTRE PETITE LISTE DE SOUHAITS",
        "baby.heading": "Pour notre petit rayon de soleil",
        "baby.registry": "Notre liste de bébé",
        "baby.description": "On a rassemblé quelques petites choses qu'on aimerait avoir pour accueillir notre futur petit rayon de soleil.",
        "baby.expected": "Date prévue : octobre 2028",
        "baby.button": "Voir notre liste de souhaits ♡",
        "baby.small": "Ouvre notre liste de bébé sur Amazon",
        "baby.note": "On ne t'a pas encore rencontré, mais on a déjà tellement d'amour à te donner.",
        "baby.footer": "fait avec ♥ pour notre petit avenir",
        "baby.back": "Retour à notre histoire",

        "gallery.title": "Galerie ♡ | Charlie & Emil",
        "gallery.subtitle": "Tous ces petits moments qui racontent notre histoire.",
        "gallery.read": "♡ Lire ce souvenir",
        "gallery.hide": "♡ Cacher ce souvenir",
        "gallery.empty": "Aucun souvenir ajouté pour le moment. ♡",
        "gallery.close": "Fermer",
        "gallery.previous": "Photo précédente",
        "gallery.next": "Photo suivante",

        "sunshine.title": "Notre rayon de soleil | Charlie & Emil",
        "gibby.title": "Gibby | Charlie & Emil"
    }
};

function getSavedLanguage() {
    return localStorage.getItem("charlieEmilLanguage") || "en";
}

function setLanguage(language) {
    if (!translations[language]) return;

    localStorage.setItem("charlieEmilLanguage", language);

    applyLanguage(language);
}

function applyLanguage(language = getSavedLanguage()) {
    const dictionary = translations[language];

    if (!dictionary) return;

    document.documentElement.lang = language;

    // Translate regular page text
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (dictionary[key] !== undefined) {
            element.textContent = dictionary[key];
        }
    });

    // Translate placeholders, alt text, and other attributes
    document.querySelectorAll("[data-i18n-attr]").forEach(element => {
        const settings = element.dataset.i18nAttr.split("|");

        settings.forEach(setting => {
            const [attribute, key] = setting.split(":");

            if (dictionary[key] !== undefined) {
                element.setAttribute(attribute, dictionary[key]);
            }
        });
    });

    // Translate the page title
    const titleKey = document.body.dataset.titleKey;

    if (titleKey && dictionary[titleKey]) {
        document.title = dictionary[titleKey];
    }

    // Update language button appearance
    const enButton = document.getElementById("language-en");
    const frButton = document.getElementById("language-fr");

    if (enButton && frButton) {
        enButton.classList.toggle("active", language === "en");
        frButton.classList.toggle("active", language === "fr");
    }

    // Let other scripts know the language changed
    document.dispatchEvent(
        new CustomEvent("languageChanged", {
            detail: { language }
        })
    );
}

// Language buttons
function connectLanguageButtons() {
    const enButton = document.getElementById("language-en");
    const frButton = document.getElementById("language-fr");

    if (enButton) {
        enButton.addEventListener("click", () => setLanguage("en"));
    }

    if (frButton) {
        frButton.addEventListener("click", () => setLanguage("fr"));
    }

    applyLanguage();
}

document.addEventListener("DOMContentLoaded", connectLanguageButtons);
document.addEventListener("navbarLoaded", connectLanguageButtons);
