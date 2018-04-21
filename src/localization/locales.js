import * as KEYS from './keys';

import english from './languages/english'
import chinese from './languages/chinese'
import hebrew from './languages/hebrew'


export const LANG = {
    ENGLISH:'English',
    CHINESE:'中文 ( Chinese )',
    HEBREW:'( Hebrew ) עִברִית',
};

const languages = {
    [LANG.ENGLISH]:english,
    [LANG.CHINESE]:chinese,
    [LANG.HEBREW]:hebrew,
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
export const localized = (key, language) => {
    console.log(key, language)
    return locales()[language][key] || locales()[LANG.ENGLISH][key];
}