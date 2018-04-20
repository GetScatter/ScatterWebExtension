import * as KEYS from '../keys';

export default {
    [KEYS.GENERIC_New]:`New`,
    [KEYS.GENERIC_Save]:`Save`,
    [KEYS.GENERIC_Ignored]:`Ignored`,
    [KEYS.GENERIC_Identity]:`Identity`,
    [KEYS.GENERIC_Contract]:`Contract`,
    [KEYS.GENERIC_Action]:`Action`,
    [KEYS.GENERIC_Removed]:`Removed`,
    [KEYS.GENERIC_Name]:`Name`,
    [KEYS.GENERIC_VerifyPassword_Header]:`Verify Your Password`,
    [KEYS.GENERIC_VerifyPassword_Description]:`
        You need to verify your current password before you can do this.
    `,

    // Main Menu
    [KEYS.MAINMENU_Identities]:'Identities',
    [KEYS.MAINMENU_Permissions]:'Permissions',
    [KEYS.MAINMENU_History]:'History',
    [KEYS.MAINMENU_Lock]:'Lock',




    // Identities
    [KEYS.IDENTITIES_Header]:`You don't have any Identities yet.`,
    [KEYS.IDENTITIES_Description]:`
        Identities are containers for personal information such as first and last names, addresses and
        various blockchain accounts/keypairs. Identities also have keypairs and their ownership 
        can be proven which makes them a way to authenticate with applications without passwords.
    `,



    [KEYS.PLACEHOLDER_Name]:'Name',
    [KEYS.PLACEHOLDER_PublicKey]:'Public Key',
    [KEYS.PLACEHOLDER_PrivateKey]:'Private Key',
    [KEYS.PLACEHOLDER_FirstName]:'First Name',
    [KEYS.PLACEHOLDER_LastName]:'Last Name',
    [KEYS.PLACEHOLDER_Email]:'Email',
    [KEYS.PLACEHOLDER_BirthDate]:'Birth Date',
    [KEYS.PLACEHOLDER_LocationName]:'Location Name',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'Home',
    [KEYS.PLACEHOLDER_Phone]:'Phone',
    [KEYS.PLACEHOLDER_Address]:'Address',
    [KEYS.PLACEHOLDER_City]:'City',
    [KEYS.PLACEHOLDER_Postal]:'Postal Code',
    [KEYS.PLACEHOLDER_Country]:'Country',
    [KEYS.PLACEHOLDER_State]:'State',
    [KEYS.PLACEHOLDER_State]:'State',
    [KEYS.PLACEHOLDER_Password]:'Password',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'Confirm Password',
    [KEYS.PLACEHOLDER_NewPassword]:'New Password',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'Confirm New Password',
    [KEYS.PLACEHOLDER_DomainOrIP]:'Domain or IP',
    [KEYS.PLACEHOLDER_Port]:'Port',

    [KEYS.BUTTON_CreateIdentity]:'Create Identity',
    [KEYS.BUTTON_ImportAccount]:'Import Account',
    [KEYS.BUTTON_AddNewLocation]:'Add New Location',
    [KEYS.BUTTON_SetAsDefaultLocation]:'Set As Default Location',
    [KEYS.BUTTON_RemoveLocation]:'Remove Location',
    [KEYS.BUTTON_ChangePassword]:'Change Password',
    [KEYS.BUTTON_DestroyScatter]:'Destroy Scatter',
    [KEYS.BUTTON_CreateNewScatter]:'Create New Scatter',
    [KEYS.BUTTON_LoadFromBackup]:'Load From Backup',
    [KEYS.BUTTON_Unlock]:'Unlock',
    [KEYS.BUTTON_ExportScatter]:'Export Scatter',
    [KEYS.BUTTON_GenerateKeyPair]:'Generate Key Pair',
    [KEYS.BUTTON_Validate]:'Validate',
    [KEYS.BUTTON_Copy]:'Copy',
    [KEYS.BUTTON_ChangeLanguage]:'Change Language',

    // Identity
    [KEYS.IDENTITY_DisablingHeader]:`What does Disabling do?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Disabling this Identity will stop it from being used in applications that have a reference to it.
        This can be used instead of permanently deleting this Identity or it's Permissions on an application,
        which would be harder to recover.
    `,

    [KEYS.IDENTITY_NameHeader]:`Identity Name`,
    [KEYS.IDENTITY_NameDescription]:`
        Applications may choose to use this name as your username as it is unique across all networks.
        If you are not registered with RIDL you will be assigned a random name.
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
    [KEYS.PERMISSION_RevokeIdentity]:`Revoke Identity`,
    [KEYS.PERMISSION_RevokeContract]:`Revoke Contract`,
    [KEYS.PERMISSION_RevokeAction]:`Revoke Action`,




    // Histories
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








    // Settings Menu
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
    [KEYS.LANGUAGE_Description]:`
        Auto Lock handles Scatter's locking for you so that you don't have to remember to lock your Scatter when you step away.
    `,

    [KEYS.KEYPAIR_Header]:`Generate a new Key Pair`,
    [KEYS.KEYPAIR_Description]:`
        You can use this panel to generate EOS key pairs. These key pairs are generated locally on your machine 
        and are never sent anywhere. You can also paste in a keypair and check that the private key matches the public 
        key. Note that these keys are generated using entropy gathered from your computer and not from any specific seed.
    `,
    [KEYS.KEYPAIR_Validation_Header]:`Generate a new Key Pair`,
    [KEYS.KEYPAIR_Validation_Valid]:`The private key is valid and the public key generated from it matches the public key provided.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`The public key generated from the private key did <b>not</b> match the public key provided!`,

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

}