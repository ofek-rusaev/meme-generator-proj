'use strict';

var gCurrLang = 'en';

var gTrans = {
    gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    memes: {
        en: 'Memes',
        he: 'שמורים'
    },
    about: {
        en: 'About', 
        he: 'פרטים'
    },
    search: {
        en: 'Search...',
        he: 'חפש...'
    },
    save: {
        en: 'Save',
        he: 'שמור'
    },
    upload: {
        en: 'Upload',
        he: 'העלה'
    },
    publish: {
        en: 'Publish',
        he: 'פרסם'
    },
    share: {
        en: 'Share on Facebook',
        he: 'שתף בפייסבוק'
    },
    footer: {
        en: '© 2020 - All Rights Reserved',
        he: '© 2020 - כל הזכויות שמורות '
    }
}

function setLang(lang) {
    gCurrLang = lang;
}

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.title) {
            el.title = txt;
        } else if (el.placeholder) {
            el.placeholder = txt;
        }
        else el.innerText = txt;
    });
}

function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}