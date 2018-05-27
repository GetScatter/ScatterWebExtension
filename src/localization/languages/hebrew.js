import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`חדש`,
    [KEYS.GENERIC_Save]:`שמור`,
    [KEYS.GENERIC_Ignored]:`התעלם`,
    [KEYS.GENERIC_Identity]:`זהות`,
    [KEYS.GENERIC_Contract]:`חוזה`,
    [KEYS.GENERIC_Action]:`פעולה`,
    [KEYS.GENERIC_Removed]:`נמחק`,
    [KEYS.GENERIC_Name]:`שם`,
    [KEYS.GENERIC_Search]:`חפש`,
    [KEYS.GENERIC_VerifyPassword_Header]:`ווידוא סיסמה`,
    [KEYS.GENERIC_VerifyPassword_Description]:`עליך לאמת את הסיסמה הנוכחית שלך לפני ביצוע פעולה זו.`,
    [KEYS.GENERIC_Host]:'שרת',
    [KEYS.GENERIC_Port]:'פורט',
    [KEYS.GENERIC_Requires]:'נדרש',
    [KEYS.GENERIC_RequiredProperties]:'תכונות נדרשות',
    [KEYS.GENERIC_Import]:'יבוא',
    [KEYS.GENERIC_ChainID]:'מזהה שרשרת',
    [KEYS.GENERIC_Blockchain]:'בלוקציין',
    [KEYS.GENERIC_Account]:'חשבון',

    [KEYS.PLACEHOLDER_Name]:'שם',
    [KEYS.PLACEHOLDER_PublicKey]:'מפתח ציבורי',
    [KEYS.PLACEHOLDER_PrivateKey]:'מפתח פרטי',
    [KEYS.PLACEHOLDER_FirstName]:'שם פרטי',
    [KEYS.PLACEHOLDER_LastName]:'שם משפחה',
    [KEYS.PLACEHOLDER_Email]:'דוא"ל"',
    [KEYS.PLACEHOLDER_BirthDate]:'תאריך לידה',
    [KEYS.PLACEHOLDER_LocationName]:'שם מקום',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'בית',
    [KEYS.PLACEHOLDER_Phone]:'טלפון',
    [KEYS.PLACEHOLDER_Address]:'כתובת',
    [KEYS.PLACEHOLDER_City]:'עיר',
    [KEYS.PLACEHOLDER_Postal]:'מיקוד',
    [KEYS.PLACEHOLDER_Country]:'ארץ',
    [KEYS.PLACEHOLDER_State]:'מדינה',
    [KEYS.PLACEHOLDER_Password]:'סיסמה',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'ווידוא סיסמה',
    [KEYS.PLACEHOLDER_NewPassword]:'סיסמה חדשה',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'ווידוא סיסמה חדשה',
    [KEYS.PLACEHOLDER_DomainOrIP]:'אתר או IP',

    [KEYS.BUTTON_CreateIdentity]:'צור זהות',
    [KEYS.BUTTON_ImportAccount]:'יבא חשבון',
    [KEYS.BUTTON_ImportKeychain]:'יבא צרור מפתחות',
    [KEYS.BUTTON_SelectFile]:'בחר קובץ',
    [KEYS.BUTTON_AddNewLocation]:'הוסף מיקום חדש',
    [KEYS.BUTTON_SetAsDefaultLocation]:'קבע כמיקום ברירת מחדל',
    [KEYS.BUTTON_RemoveLocation]:'הסר מיקום',
    [KEYS.BUTTON_ChangePassword]:'שנה סיסמה',
    [KEYS.BUTTON_DestroyScatter]:'חסל את סְקַטֵר',
    [KEYS.BUTTON_CreateNewScatter]:'צור סְקַטֵר חדש',
    [KEYS.BUTTON_LoadFromBackup]:'טען מגיבוי',
    [KEYS.BUTTON_Unlock]:'פתח נעילה',
    [KEYS.BUTTON_ExportScatter]:'יצא סְקַטֵר',
    [KEYS.BUTTON_GenerateKeyPair]:'צור זוג מפתחות',
    [KEYS.BUTTON_Validate]:'וודא',
    [KEYS.BUTTON_Copy]:'העתק',
    [KEYS.BUTTON_ChangeLanguage]:'שנה שפה',
    [KEYS.BUTTON_Cancel]:'בטל',
    [KEYS.BUTTON_Accept]:'קבל',
    [KEYS.BUTTON_Deny]:'דחה',
    [KEYS.BUTTON_Yes]:'כן',
    [KEYS.BUTTON_No]:'לא',
    [KEYS.BUTTON_UseSelectedAccount]:'השתמש בחשבון שנבחר',
    [KEYS.BUTTON_SelectIdentity]:'בחר זהות',
    [KEYS.BUTTON_ChangeName]:'שנה שם',
    [KEYS.BUTTON_ClaimIdentity]:'תבע זהות',
    [KEYS.BUTTON_RegisterIdentity]:'רשום זהות',

    [KEYS.MAINMENU_Identities]:'זהויות',
    [KEYS.MAINMENU_Keys]:'זוגות של מפתחות',
    [KEYS.MAINMENU_Permissions]:'הרשאות',
    [KEYS.MAINMENU_History]:'היסטוריה',
    [KEYS.MAINMENU_Lock]:'נעל',

    [KEYS.IDENTITIES_Header]:`עדיין אין לך זהויות.`,
    [KEYS.IDENTITIES_Description]:`
        זהויות מכילות מידע אישי כמו שם פרטי ושם משפחה, כתובת וחשבונות או זוגות של
        מפתחות לבלוקצ'יין. לזהויות יש גם זוגות של מפתחות והבעלות עליהם יכולה להיות
        מוכחת, מה שיכול להוות תהליך אימות ללא סיסמה.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`מה עושה השבתה?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        השבתה של זהות זו תחסום אותה מלהיות בשימוש בתכנות שמתייחסות אליה.
        ניתן להתשמש בזה במקום מחיקה סופית של הזהות הזו או ביטול ההרשאות שלה בתכנה,
        מה שיהיה קשה יותר לשחזור.
    `,

    [KEYS.IDENTITY_NameHeader]:`שם הזהות`,
    [KEYS.IDENTITY_NameDescription]:`
        תכנות יכולות לבחור להשתמש בשם זה כשם המשתמש שלך מכיוון שהוא ייחודי בכל הרשתות.
        אם לא נרשמת ב-RIDL תקבל שם רנדומלי.
    `,
    [KEYS.IDENTITY_NoKeyPairsHeader]:`אין זוג מפתוחת!`,
    [KEYS.IDENTITY_NoKeyPairsDescription]:`
        בטרם תוכל להוסיף חשבונות בלוקצ'יין לזהות זו עליך להוסיף זוגות של מפתחות. עבוד לתפריט הראשי ובחר:
    `,
    [KEYS.IDENTITY_AccountHeader]:`חשבון`,
    [KEYS.IDENTITY_AccountDescription]:`
        חשבונות מכילים את המטבעות שלך ומאפשרים לך אינטראקציה עם חוזים על הבלוקצ'יין.
        בהקשר של זהויות, חשוב עליהם כעל חשבונות בנק המקושרים לדרכון שלך, ניתן להחליפם בכל שלב.
    `,
    [KEYS.IDENTITY_PersonalHeader]:`מידע אישי`,
    [KEYS.IDENTITY_PersonalDescription]:`
        ניתן להוסיף מידע אישי עבור תכנות שדורשות זאת. למשל אתר קניות יצטרך שם מלא כדי לדעת למי לשלוח את המוצרים.
    `,
    [KEYS.IDENTITY_LocationHeader]:`מידע על מיקום`,
    [KEYS.IDENTITY_LocationDescription]:`
        ניתן להוסיף מידע על מיקום לחשבון עבור תכנות שדורשות זאת. למשל אתר קניות יצטרך את הכתובת למשלוח עבור המוצרים.
    `,

    [KEYS.PERMISSIONS_Header]:`אין לך הרשאות להצגה.`,
    [KEYS.PERMISSIONS_Description]:`
        הרשאות ניתנות במקרה שאתה נותן זהות לשימוש בתכנה או כשאתה מאפשר חתימה על פעולה חוזית ללא הודעת אישור הרשאה
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`ביטול זהות`,
    [KEYS.PERMISSION_RevokeContract]:`ביטול חוזה`,
    [KEYS.PERMISSION_RevokeAction]:`ביטול פעולה`,

    [KEYS.HISTORIES_Header]:`אין לך אירועים להצגה בהיסטוריה .`,
    [KEYS.HISTORIES_Description]:`
        ברגע שיהיו לך, תראה רשימה של כל האירועים שעברו דרך הסְקַטֵר שלך.
        מה שלא תראה זה אירועים שקרו בחשבונות שלך מחוץ לסְקַטֵר
     `,

    [KEYS.HISTORIES_Note]:`
        הערה: יצוא נתונים של סְקַטֵר באמצעות אפשרות גיבוי בתפריט ההגדרות לא שומר את הארועים הללו.
        כשמיבאים את הסְקַטֵר הזה בחזרה, ההיסטוריה שלך תהיה ריקה. אם תרצה ליצא את ההיסטוריות שלך בעתיד,
        תוכל לעשות זאת בעזרת כפתורי הפעולות בתפריט בפנל הזה.
    `,

    [KEYS.SETTINGSMENU_Networks]:'רשתות',
    [KEYS.SETTINGSMENU_Keypairs]:'זוגות מפתחות',
    [KEYS.SETTINGSMENU_Language]:'שפה',
    [KEYS.SETTINGSMENU_AutoLock]:'נעילה אוטומטית',
    [KEYS.SETTINGSMENU_Password]:'סיסמה',
    [KEYS.SETTINGSMENU_Backup]:'גיבוי',
    [KEYS.SETTINGSMENU_Destroy]:'השמד',

    [KEYS.BACKUP_Header]:`יצא גיבוי מוצפן`,
    [KEYS.BACKUP_Description]:`
        יצוא של הסְקַטֵר שלך מאפשר לך ליבא אותו למכשיר אחר. הקובץ ימשיך להיות מוצפן כשהוא מיוצא כך שעליך לוודא שיש ברשותך
        את הסיסמה או את המילים לשחזור, אחרת היצוא חסר ערך. המפתחות הפרטיים מהחשבונות שלך יוסרו לפני היצוא, המפתחות
        הפרטיים היחידים שישארו בקובץ המיוצא יהיו מפתחות הזהויות שלך.
    `,

    [KEYS.IMPORT_Header]:`יבא גיבוי מוצפן`,
    [KEYS.IMPORT_Description]:`
        יבוא של קובץ צרור המפתחות המוצפן יבנה מחדש את צרור המפתחות של הסְקַטֵר שלך אבל לא ייבא את הרשתות הישנות או החשבונות שלך.
    `,

    [KEYS.PASS_Header]:`הכנס סיסמה חדשה`,
    [KEYS.PASS_Description]:`
        בשינוי סיסמה המערכת תפענח את כל הנתונים השמורים שבדרך כלל מוצפנים ואז תצפין אותם מחדש בעזרת גרעין
        המבוסס על הסיסמה החדשה.
    `,

    [KEYS.NETWORK_Header]:`הוסף רשת חדשה`,
    [KEYS.NETWORK_Description]:`
        תכנות רצות בדרך כלל על רשת ספציפית, אך יתכן ולא כולן רצות על אותה רשת.
        למשל תכנה אחת יכולה לרוץ על רשת לבדיקות ויכול להיות שיש לה אפשרויות חדשות
        שעדיין לא שוחררו. כדי להשתמש ברשת החדשה תצטרך שיהיה לך חשבון גם בה.
    `,

    [KEYS.DESTROY_Header]:`השמד את סְקַטֵר`,
    [KEYS.DESTROY_Description]:`
        אתה עומד להשמיד את כל צרור המפתחות שלך בסְקַטֵר. הדרך היחידה לשחזר את הסְקַטֵר הזה היא על ידי יבוא
        של קובץ סְקַטֵר שיוצא בפורמט JSON. לא תוכל להשתמש בזהויות שלך באף דרך אחרת. אנא ודא שייצאת את
        הסְקַטֵר שלך בהגדרות הגיבוי לפני כן.
    `,

    [KEYS.LANGUAGE_Header]:`בחר שפה`,

    [KEYS.KEYPAIRS_NoKeyPairsHeader]:`אין לך אף זוג מפתחות.`,
    [KEYS.KEYPAIRS_NoKeyPairsDescription]:`
        לחץ על הכפתור למעלה כדי ליצור/ליבא זוג מפתחות.
    `,

    [KEYS.KEYPAIR_Header]:`צור זוג מפתחות חדש`,
    [KEYS.KEYPAIR_Description]:`
        תוכל להשתמש בדף זה כדי ליצור זוג מפתחות. זוגות מפתחות נוצרים מקומית על המכונה שלך ולעולם אינם נשלחים לשום מקום.
        אתה יכול גם להדביק מפתח פרטי והוא ייצור את המפתח הציבורי אוטומטית.
    `,
    [KEYS.KEYPAIR_Important]:`שמור את המפתח הפרטי במקום אחר! לא ניתן להוציא מפתחות פרטיים מסְקַטֵר בהמשך.`,
    [KEYS.KEYPAIR_Validation_Header]:`צור זוג מפתחות חדש`,
    [KEYS.KEYPAIR_Validation_Valid]:`המפתח הפרטי חוקי והמפתח הציבורי שנוצר ממנו מתאים למפתח הציבורי שנתת.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`המפתח הציבורי שנוצר לא תואם למפתח הציבורי שנתת!`,


    [KEYS.LOCK_Header]:`שעון נעילה אוטומטית`,
    [KEYS.LOCK_Description]:`
        נעילה אוטומטית נועלת את סְקַטֵר עבורך כך שלא צריך לזכור לנעול את הסְקַטֵר כשאתה
        הולך.
    `,
    [KEYS.LOCK_Minute]:`דקה`,
    [KEYS.LOCK_Minutes]:`דקות`,
    [KEYS.LOCK_Hour]:`שעה`,
    [KEYS.LOCK_Hours]:`שעות`,
    [KEYS.LOCK_NeverLock]:`אל תנעל לעולם`,


    [KEYS.MNEMONIC_Header]:`מילות שינון`,
    [KEYS.MNEMONIC_Description]:`מילות שינון הן קבוצת מילים שמתורגמת לגרעין הצפנה.`,
    [KEYS.MNEMONIC_Note]:`
        אנא ודא שמירתן במקום בטוח. זו הדרך היחידה לשחזר גישה לסְקַטֵר שלך ולפענח מידע
        פרטי מוצפן במקרה ששכחת את הסיסמה שלך.
    `,

    [KEYS.ERROR_MustSelectItem]:`חובה לבחור אפשרות.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'שגיאה';
            case AlertTypes.Prompt:             return 'שאלה';
            case AlertTypes.SelectAccount:      return 'בחר חשבון';
        }
    },

    //2
    [KEYS.ALERT_BadIdentityName]:[
        'שם זהות לא חוקי',

        `שם זהות צריך להיות בן 3 עד 20 תווים באורכו.
        עליו להכיל תווים של אותיות או ספרות והוא יכול להכיל גם רווחים, מקפים וקווים תחתונים.`
    ],
    //2
    [KEYS.ALERT_IdentityNameExists]:[
        'שם זהות קיים',

        'שם זהות זה רשום כבר עבור זהות אחרת.'
    ],
    //2
    [KEYS.ALERT_NoSuchIdentityName]:[
        'שם זהות לא קיים',

        'שם זהות זה לא שמור ב-RIDL.'
    ],
    //2
    [KEYS.ALERT_KeyPairExists]:[
        'זוג מפתחות קיים',

        'זוג מפתחות זה כבר רשום בצרור המפתחות שלך.'
    ],
    //2
    [KEYS.ALERT_BadKeyPairName]:[
        'שם לא חוקי לזוג מפתחות',

        'זוג מפתחות חייב לקבל שם ייחודי.'
    ],
    //2
    [KEYS.ALERT_InvalidPrivateKey]:[
        'מפתח פרטי לא חוקי',

        `המפתח הפרטי לא תקין, אנא בדוק והקלד מחדש.`
    ],
    //2
    [KEYS.ALERT_NoAccountsFound]:[
        'לא נמצאו חשבונות',

        `לא נמצאו חשבונות הקשורים למפתח הפרטי הזה. אם ברצונך ליבא
         מפתח שלא נוצר על ידי סְקַטֵר צתטרך ליצור חשבון עבורו לפני היבוא שלו.`
    ],
    //2
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'סיסמאות לא תואמות',

        `הסיסמא והוידוא שלה לא תואמים.`
    ],
    //2
    [KEYS.ALERT_BadPassword]:[
        'סיסמה לא חוקית',

        'הסיסמה חייבת להיות בת 8 תווים לפחות'
    ],
    //2
    [KEYS.ALERT_WrongPassword]:[
        'סיסמה לא נכונה',

        'הסיסמה שהזנת לא נכונה.'
    ],
    //2
    [KEYS.ALERT_NetworkHostInvalid]:[
        'שרת רשת לא תקין',

        `שרת הרשת שהזנת לא תקין. שרת צריך להיות כתובת אינטרנט
         ( למשל: testnet.eos.io ) או כתובת IP ( למשל: 192.168.0.1 ).`
    ],
    //2
    [KEYS.ALERT_NetworkExists]:[
        'רשת קיימת כבר',

        'רשת אחרת עם אותו שרת ואותו פורט כבר קיימת. אין סיבה לשמור את אותה רשת פעמיים.'
    ],
    //2
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'לא ניתן להסיר רשת מאושרת',

        `לא ניתן להסיר רשתות מאושרות של סְקַטֵר.`
    ],
    //2
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'לא נמצאו זהויות',

        `תכנה זו מבקשת זהות עם שדות שאין לך. השדות שהם מבקשים הם '${fields.join(', ')}'`
    ],
    //2
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'חובה לבחור זהות',

        `אם אתה לא רוצה לחשוף זהות אתה יכול ללחוץ על כפתור הדחיה, אחרת חובה עליך לבחור זהות כדי
         לאשר את הבקשה הזו.`
    ],
    //2
    [KEYS.PROMPT_DestroyingScatter]:[
        'משמיד את סְקַטֵר',
        'זו ההזדמנות האחרונה שלך לוודא שיש לך גיבויים מתאימים.'
    ],
    //2
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'מבטל זהות',

        `אתה עומד לבטל זהות שלמה מ ${domain}. זה יסיר הרשאות מהזהות עצמה
        ומכל החוזים שבתוכה.`
    ],
    //2
    [KEYS.PROMPT_RevokingContract]:domain => [
        'ביטול חוזה',

        `אתה עומד לבטל חוזה שלם מ ${domain}. זה יסיר את כל ההרשאות מפעולות בחוזה זה.`
    ],
    //2
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'ביטול פעולה בחוזה',

        `אתה עומד לבטל פעולה מ ${domain}`
    ],
    //2
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'הסרת זהות',

        `אתה עומד להסיר זהות בשם '${name}'. הסרת זהות היא פעולה בלתי הפיכה כולל ההרשאות שלה.
         אם הזהות בשימוש בתכנות אולי כדאי להשבית אותה במקום זה.`
    ],
    //2
    [KEYS.PROMPT_DeletingKeyPair]:identities => [
        'מוחק זוג מפתחות',

        identities.length ? `זוג מפתחות זה נמצא בשימוש ב: '${identities.join(', ')}'` : `זוג מפתחות זה לא נמצא בשימוש.`
    ],
    //2
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'מוחק חשבון',

        `אתה עומד למחוק את החשבון ${formattedAccountName} מהזהות הזו.`
    ],
    //2
    [KEYS.PROMPT_RemovingNetwork]:[
        'מחיקת רשת',

        `אתה עומד למחוק רשת. לא תוכל ליצור חשבונות חדשים ברשת זו
         אחרי מחיקתה, אך תוכל להוסיף אותה מחדש. חשבונות קיימים
         שמשתמשים ברשת זו לא ימחקו ולא ישתנו.`
    ],
    //2
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'אתה עומד להוסיף חוזה מטבע לרשימת ההיתרים',

        `הוספת חוזה מטבע לרשימת ההיתרים מסוכנת, ומומלץ לא לעשות זאת. יש מקרים מיוחדים בהם זה בסדר,
         אם אתה לא בטוח לגמרי שזה אחד מהמקרים הללו, אתה לא אמור להוסיף פעולות בחוזה זה לרשימת ההיתרים.
         האם אתה עדיין בטוח שאתה רוצה להוסיף את זה לרשימת ההיתרים?`
    ],
    //2
    [KEYS.PROMPT_SelectAccount]:[
        'בחר חשבון',

        'בחר את החשבון ואת הסמכות שברצונך להשתמש עבור זהות זאת. ניתן לבחור אחד בכל פעם.'
    ],
    //2
    [KEYS.PROMPT_ClaimIdentity]:[
        'תביעת זהות',

        'הכנס את המפתח הפרטי המתאים למפתח הציבורי הרשום עבור שם הזהות שלך.'
    ],

    //3
    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'רוצים להוסיף את הרשת שלהם לסְקַטֵר שלך.',

        'יש תכנות שמשתמשות ברשת משלהן.',

        `דבר זה לא מאפשר לתכנות גישה לסְקַטֵר שלך. הוספת רשת בממשק זה
        פשוט חוסכת ממך את הצורך בהוספה של רשת זו במסך ההגדרות.`
    ],
    //5
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ 'מבקש מידע נוסף.',

        `לפעמים תכנות מבקשות מידע נוסף כגון כתובת הדוא"ל שלך או תאריך לידה.
        הזהויות בצד הן זהויות בבעלותך שבהן יש את הנתונים הנדרשים.`,

        `אפילו אם אתה מספק זהות עם נתונים שהתכנה לא מבקשת הרשאות עבורן,
         הם לא יוכלו לראות אותם כלל, ואפילו לא ידעו על קיומם בזהות זו.`,

        `הנתונים היחידים שתמיד ניתנים הם המפתח הציבורי של הזהות ושמה.`,

        /*{DOMAIN}*/ `לא מבקשים מידע נוסף. הדבר היחיד שהם צריכים הוא שם הזהות וhash של הזהות.`
    ],
    //2
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `אין לך זהות שמתאימה לנתונים שהתכנה הזו מבקשת.`,

        `אם ברצונך להשתמש בזהות עם אתר זה, תצטרך לעדכן זהות זו ולמלא את דרישותיה.
         תוכל לראות מה אתר זה דורש בצד השמאלי של המסך.`
    ],
    //4
    [KEYS.REQUEST_SignatureWhitelist]:[
        `האם תרצה להוסיף לרשימת ההיתרים את הפעולה הזו בחוזה?`,

        `You can whitelist this action so that next time you won't have to manually authorize this.
         Every property that has a check next to it will become mutable, meaning that you can allow
         certain properties of this transaction to change and only if the other properties are changed will
         it fail to be whitelisted.`,

        `This includes required personal information, and changes to your Identity do not remove permissions.`,

        `If you have multiple locations and a transaction requires a location you will always be prompted.`
    ],
    // סְקַטֵר
    //4
    [KEYS.REQUEST_ScatterIsLocked]:[
        `Your Scatter is locked!`,

        `Before you can do anything with your Scatter you will need to unlock it.`,

        `We will purposely never show a prompt/popup which requires you to log in.`,

        `If you see a prompt/popup which is requesting your password, it is a malicious website trying to get your password.
         Always only unlock Scatter from the extension's popup by clicking on the icon in your browser tray.`
    ],
    //4
    [KEYS.REQUEST_UpdateVersion]:[
        `Your Scatter is out of date!`,

        /*{DOMAIN}*/ `is requiring you have a version of Scatter that is newer than the one installed.`,

        `This usually means that new functionality was released and an application is trying to use it but it's not
         currently included in the build you have installed.`,

        `Please Note, we leave version checking up to the applications themselves. They could be maliciously trying to
         get you to download something. Make sure you always download Scatter from the proper location.`
    ],

}
