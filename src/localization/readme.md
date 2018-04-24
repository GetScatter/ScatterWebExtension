# Help add languages.

The first contributor of every new language gets their name in the main `readme.md` file.


### Adding a new language


##### First copy the `src/localization/languages/english.js` file into a new `<language>.js` file in the same directory.
Once you have copied it go to the `src/localization/locales.js` file and add it to the arrays/objects.

For example, if we were adding chinese.
```js
import english from './languages/english'
import chinese from './languages/chinese'


export const LANG = {
    ENGLISH:'English',
    CHINESE:'中文 ( Chinese )'
};

const languages = {
    [LANG.ENGLISH]:english,
    [LANG.CHINESE]:chinese
};
```

**Always add an english version in parenthesis.**

While you're translating the new language file try to keep string lengths the same or less. In some places the lengths of the strings are pushing the bounds of their containers and if you translate into longer strings there's a chance they will get cut off by a popup's bounding box.

