import * as KEYS from './keys';

import english from './languages/english';
import french from './languages/french';
import portuguese from './languages/portuguese';
import spanish from './languages/spanish';
import hebrew from './languages/hebrew';
import slovene from './languages/slovene';
import german from './languages/german';

export const LANG = {
    ENGLISH: 'English',
    FRENCH: 'Français ( French )',
    PORTUGUESE: 'Português ( Portuguese )',
    SPANISH: 'Español ( Spanish )',
    SLOVENE: 'Slovensko ( Slovene )',
    HEBREW: 'עברית ( Hebrew )',
    GERMAN: 'Deutsch ( German )',
};

const languages = {
    [LANG.ENGLISH]:english,
    [LANG.FRENCH]:french,
    [LANG.PORTUGUESE]:portuguese,
    [LANG.SPANISH]:spanish,
    [LANG.SLOVENE]:slovene,
    [LANG.HEBREW]:hebrew,
    [LANG.GERMAN]:german,
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
export const localized = (key, language) => locales()[language][key] || locales()['ENGLISH'][key]
