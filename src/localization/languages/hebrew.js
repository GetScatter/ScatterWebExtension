import * as KEYS from '../keys';

export default {
    // Main Menu
    [KEYS.MAINMENU_Identities]:'זהויות',
    [KEYS.MAINMENU_Permissions]:'הרשאות',
    [KEYS.MAINMENU_History]:'היסטוריה',
    [KEYS.MAINMENU_Lock]:'נְעִילָה',



    // Identities
    [KEYS.IDENTITIES_Header]:`אין לך עדיין זהות.`,
    [KEYS.IDENTITIES_Description]:`אתרי אינטרנט מסוימים עשויים לדרוש כמה שדות ספציפיים, כגון דוא"ל או חשבון`,
    [KEYS.GENERIC_New]:`New ID`,



    // Identity
    [KEYS.IDENTITY_DisablingHeader]:`What does Disabling do?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Disabling this Identity will stop it from being used in applications that have a reference to it.
        This can be used instead of permanently deleting this Identity or it's Permissions on an application,
        which would be harder to recover.
    `,

    [KEYS.IDENTITY_NameHeader]:`Identity Name`,
    [KEYS.IDENTITY_NameDescription]:`
        This is the name that applications will refer to you by. Think of it like your username. 
        It is unique, and unless you register with RIDL you will be given a randomized name.
    `,
    [KEYS.IDENTITY_AccountHeader]:`Account`,
    [KEYS.IDENTITY_AccountDescription]:`
        Accounts are what hold your funds and allow you to interact with contracts on the Blockchain. 
        In relation to Identities think of them like the bank accounts connected to your passport, they can 
        be changed at any time.
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




    // Permissions
    [KEYS.PERMISSIONS_Header]:`You don't have any permissions to display.`,
    [KEYS.PERMISSIONS_Description]:`
        Permissions are set when you either provide an Identity for an application to use, or when you whitelist 
        a contract action to be signed without authorization prompts.
    `,




    // Histories
    [KEYS.HISTORIES_Header]:`You don't have any historic events to display.`,
    [KEYS.HISTORIES_Description]:`
        Once you have them, you will be able to see a list of all of the events that pass through your Scatter.
        What you will not see is events that occurred on your accounts outside of scatter.
     `,
    [KEYS.HISTORIES_Note]:`
        Note: Exporting your keychain as JSON data from the backup option in the settings panel does not save these events.
        When you import that Scatter instance again your histories will be empty. If you would like to export your histories
        in the future you can do so using the action buttons on the navbar.
    `,








    // Settings Menu
    [KEYS.SETTINGSMENU_Networks]:'Networks',
    [KEYS.SETTINGSMENU_Keypairs]:'Key Pairs',
    [KEYS.SETTINGSMENU_Password]:'Password',
    [KEYS.SETTINGSMENU_AutoLock]:'Auto Lock',
    [KEYS.SETTINGSMENU_Destroy]:'Destroy',


}