import * as KEYS from './keys';

import english from './languages/english';
import portuguese from './languages/portuguese';


export const LANG = {
    ENGLISH:'English',
    PORTUGUESE: 'Português ( Portuguese )'
};

const languages = {
    [LANG.ENGLISH]:english,
    [LANG.PORTUGUESE]:portuguese
};

export const locales = () => {
    return Object.keys(LANG).reduce((langobj, lang) => {
        langobj[lang] = Object.keys(KEYS).reduce((keyobj, key) => {
            keyobj[KEYS[key]] = languages[LANG[lang]][KEYS[key]];
            return keyobj;
        }, {});
        return langobj;
    }, {});
};

export const getLangKey = lang => Object.keys(LANG).find(key => LANG[key] === lang);
export const localized = (key, language) => locales()[language][key] || locales()[LANG.ENGLISH][key]