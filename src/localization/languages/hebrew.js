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
    [KEYS.IDENTITY_PersonalHeader]:`Personal Information`,
    [KEYS.IDENTITY_PersonalDescription]:`
        Personal information can be added to an account for applications that require it. For instance a shopping
        website might need your full name in order to know who to send your purchased goods to.
    `,
    [KEYS.IDENTITY_LocationHeader]:`Location Information`,
    [KEYS.IDENTITY_LocationDescription]:`
        Location information can be added to an account for applications that require it.
        For instance a shopping website might need your shipping address in order to know where to send
        your purchased goods to.
    `,

    [KEYS.PERMISSIONS_Header]:`You don't have any permissions to display.`,
    [KEYS.PERMISSIONS_Description]:`
        Permissions are set when you either provide an Identity for an application to use, or when you whitelist
        a contract action to be signed without authorization prompts.
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`Revoke Identity`,
    [KEYS.PERMISSION_RevokeContract]:`Revoke Contract`,
    [KEYS.PERMISSION_RevokeAction]:`Revoke Action`,

    [KEYS.HISTORIES_Header]:`You don't have any historic events to display.`,
    [KEYS.HISTORIES_Description]:`
        Once you have them, you will be able to see a list of all of the events that pass through your Scatter.
        What you will not see is events that occurred on your accounts outside of scatter.
     `,
    [KEYS.HISTORIES_Note]:`
        Note: Exporting your Scatter data from the backup option in the settings panel does not save these events.
        When you import that Scatter instance again your histories will be empty. If you would like to export your histories
        in the future you can do so using the action buttons on the navbar within this panel.
    `,

    [KEYS.SETTINGSMENU_Networks]:'Networks',
    [KEYS.SETTINGSMENU_Keypairs]:'Key Pairs',
    [KEYS.SETTINGSMENU_Language]:'Language',
    [KEYS.SETTINGSMENU_AutoLock]:'Auto Lock',
    [KEYS.SETTINGSMENU_Password]:'Password',
    [KEYS.SETTINGSMENU_Backup]:'Backup',
    [KEYS.SETTINGSMENU_Destroy]:'Destroy',

    [KEYS.BACKUP_Header]:`Export encrypted backup`,
    [KEYS.BACKUP_Description]:`
        Exporting your Scatter allows you to import it into other devices. The file will still be encrypted when it is
        exported so make sure you have either your mnemonic or your password, otherwise it will be useless. The private keys
        from your accounts will also be removed before exporting, the only private keys that will remain within the exported
        file will be your Identity keys.
    `,

    [KEYS.IMPORT_Header]:`Import encrypted backup`,
    [KEYS.IMPORT_Description]:`
        Importing your encrypted keychain file will rebuild you Scatter keychain but it will not import your old networks or
        accounts.
    `,

    [KEYS.PASS_Header]:`Enter a new password`,
    [KEYS.PASS_Description]:`
        By changing your password you will be decrypting all of the saved information which is usually always
        encrypted, and then re-encrypting it with a seed from the new password.
    `,

    [KEYS.NETWORK_Header]:`Add a new network`,
    [KEYS.NETWORK_Description]:`
        Applications usually run on a specific network, but they might not all run on
        the same network. For instance an application can have a testing network
        that has new features which are not yet released. In order to interact with
        that network you will need to have an account there as well.
    `,

    [KEYS.DESTROY_Header]:`Destroying Scatter`,
    [KEYS.DESTROY_Description]:`
        You are about to destroy your entire Scatter keychain. The only way to get this exact Scatter back is by
        importing an exported Scatter JSON. You will not be able to claim your identities otherwise. Make sure you
        have exported your Scatter from the backup settings panel before hand.
    `,

    [KEYS.LANGUAGE_Header]:`Select your language`,

    [KEYS.KEYPAIRS_NoKeyPairsHeader]:`You don't have any keypairs.`,
    [KEYS.KEYPAIRS_NoKeyPairsDescription]:`
        Click the button on the top right to create/import a keypair.
    `,

    [KEYS.KEYPAIR_Header]:`Generate a new Key Pair`,
    [KEYS.KEYPAIR_Description]:`
        You can use this panel to generate key pairs. These key pairs are generated locally on your machine
        and are never sent anywhere. You can also paste in a private key and it will automatically generate the public key.
    `,
    [KEYS.KEYPAIR_Important]:`Save your private key elsewhere! You can not take private keys back out of Scatter.`,
    [KEYS.KEYPAIR_Validation_Header]:`Generate a new Key Pair`,
    [KEYS.KEYPAIR_Validation_Valid]:`The private key is valid and the public key generated from it matches the public key provided.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`The public key generated from the private key did not match the public key provided!`,


    [KEYS.LOCK_Header]:`Auto Lock Timer`,
    [KEYS.LOCK_Description]:`
        Auto Lock handles Scatter's locking for you so that you don't have to
        remember to lock your Scatter when you step away.
    `,
    [KEYS.LOCK_Minute]:`Minute`,
    [KEYS.LOCK_Minutes]:`Minutes`,
    [KEYS.LOCK_Hour]:`Hour`,
    [KEYS.LOCK_Hours]:`Hours`,
    [KEYS.LOCK_NeverLock]:`Never Lock`,


    [KEYS.MNEMONIC_Header]:`Mnemonic`,
    [KEYS.MNEMONIC_Description]:`Mnemonics are a set of words that translate into a cryptographic seed.`,
    [KEYS.MNEMONIC_Note]:`
        Be sure to save yours somewhere safe. It is the only way to regain access to your
        Scatter and decrypt your private information if you forget your password.
    `,

    [KEYS.ERROR_MustSelectItem]:`You must select an item.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'Error';
            case AlertTypes.Prompt:             return 'Prompt';
            case AlertTypes.SelectAccount:      return 'Select Account';
        }
    },

    //2
    [KEYS.ALERT_BadIdentityName]:[
        'Bad Identity Name',

        `Identity names must be between 3 and 20 characters long.
         They must also be alphanumeric but may also contain spaces, dashes, and underscores.`
    ],
    //2
    [KEYS.ALERT_IdentityNameExists]:[
        'Identity Name Exists',

        'This Identity name is registered to another Identity.'
    ],
    //2
    [KEYS.ALERT_NoSuchIdentityName]:[
        'No such Identity name',

        'This Identity name is not reserved in RIDL.'
    ],
    //2
    [KEYS.ALERT_KeyPairExists]:[
        'Key Pair Exists',

        'This Key Pair is already registered in your keychain.'
    ],
    //2
    [KEYS.ALERT_BadKeyPairName]:[
        'Bad Key Pair Name',

        'Key Pairs must be named uniquely.'
    ],
    //2
    [KEYS.ALERT_InvalidPrivateKey]:[
        'Invalid Private Key',

        `The private key you entered seems to be invalid. Please check the key and try again.`
    ],
    //2
    [KEYS.ALERT_NoAccountsFound]:[
        'No Accounts Found',

        `No accounts were found connected to this private key.
         If you want to import a key which is not generated by
         Scatter you will need to create an account for the key
         before importing it.`
    ],
    //2
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'Passwords Do Not Match',

        `The password you entered does not match it's confirmation.`
    ],
    //2
    [KEYS.ALERT_BadPassword]:[
        'Bad Password',

        'Passwords must be at least 8 characters long'
    ],
    //2
    [KEYS.ALERT_WrongPassword]:[
        'Wrong Password',

        'The password you entered was incorrect.'
    ],
    //2
    [KEYS.ALERT_NetworkHostInvalid]:[
        'Network Host Invalid',

        `The Network host you entered was invalid. Hosts should be either a domain name
         ( ex: testnet.eos.io ) or an IP ( ex: 192.168.0.1 ).`
    ],
    //2
    [KEYS.ALERT_NetworkExists]:[
        'Network Already Exists',

        'Another Network with this host and port already exists. There is no reason to have a network saved twice.'
    ],
    //2
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'Cannot Remove Endorsed Network',

        `You cannot remove Scatter's endorsed Networks.`
    ],
    //2
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'No Identities Found',

        `This application is requesting an Identity with properties you do not have. The properties they want are '${fields.join(', ')}'`
    ],
    //2
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'You Must Select An Identity',

        `If you do not wish to expose an Identity you can press the Deny button, otherwise an Identity must be
         selected in order to accept this request.`
    ],
    //2
    [KEYS.PROMPT_DestroyingScatter]:[
        'Destroying Scatter',

        'This is your last chance to double check your backups.'
    ],
    //2
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'Revoking Identity',

        `You are about to revoke an entire Identity from ${domain}. This will remove
         permissions on the Identity itself and all contracts within it.`
    ],
    //2
    [KEYS.PROMPT_RevokingContract]:domain => [
        'Revoking Contract',

        `You are about to revoke an entire contract from ${domain}. This will remove permissions on all actions within it.`
    ],
    //2
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'Revoking Contract Action',

        `You are about to revoke an action from ${domain}`
    ],
    //2
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'Removing Identity',

        `You are about to remove an Identity with the name '${name}'. Removing Identities is not reversible and
         all permissions will be . If the Identity is being used on applications perhaps you should just disable it instead.`
    ],
    //2
    [KEYS.PROMPT_DeletingKeyPair]:identities => [
        'Deleting Key Pair',

        identities.length ? `This Key Pair is used in: '${identities.join(', ')}'` : `This keypair is not used in any Identities.`
    ],
    //2
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'Removing Account',

        `You are about to remove the ${formattedAccountName} account from this Identity.`
    ],
    //2
    [KEYS.PROMPT_RemovingNetwork]:[
        'Removing Network',

        `You are about to delete a Network. You will not be able
         to create new accounts on this Network once you delete it,
         but nothing is stopping you from re-adding it. Any accounts
         already using this Network will not be modified or removed.`
    ],
    //2
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'You Are About To Whitelist A Currency Contract',

        `Whitelisting currency based contracts is dangerous, and should never be done. There are specific cases where this is okay,
         but unless you are absolutely sure this is one of them, you should not be whitelisting this contract action.
         Are you sure you still want to whitelist this?`
    ],
    //2
    [KEYS.PROMPT_SelectAccount]:[
        'Select Account',

        'Select the account and authority you wish to use for this Identity. You can only select one at a time.'
    ],
    //2
    [KEYS.PROMPT_ClaimIdentity]:[
        'Claim Identity',

        'Put in the private key that matches the public key on file for your identity name.'
    ],

    //3
    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'wants to add their network to your Scatter.',

        'Some applications use their own Networks.',

        `This in no way gives the application any access to your Scatter.
         Adding a network through this interface simply saves you
         the effort of manually adding it from your Settings panel.`
    ],
    //5
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ 'is requesting additional information.',

        `Sometimes applications ask for some more information such as
         your email or date of birth. The Identities on the right are ones you own
         on the network with those specific properties available.`,

        `Even if you provide an Identity with properties that the
         application is not requesting permissions for, they will never
         be able to see them, or even know they exist for that Identity.`,

        `The only properties which are always given is the Identity's public key and it's name.`,

        /*{DOMAIN}*/ `is not requesting any additional information. The only thing that they are requiring is an Identity hash and name.`
    ],
    //2
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `You don't have any Identities that match the fields that this application is requiring.`,

        `If you would like to use an Identity with this domain, you will need to update that Identity and fulfill the requirements.
         You can see what this domain is requiring on the left panel.`
    ],
    //4
    [KEYS.REQUEST_SignatureWhitelist]:[
        `Do you want to whitelist this contract action?`,

        `You can whitelist this action so that next time you won't have to manually authorize this.
         Every property that has a check next to it will become mutable, meaning that you can allow
         certain properties of this transaction to change and only if the other properties are changed will
         it fail to be whitelisted.`,

        `This includes required personal information, and changes to your Identity do not remove permissions.`,

        `If you have multiple locations and a transaction requires a location you will always be prompted.`
    ],
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
