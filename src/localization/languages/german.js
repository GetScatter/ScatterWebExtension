import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`Neu`,
    [KEYS.GENERIC_Save]:`Speichern`,
    [KEYS.GENERIC_Ignored]:`Ignoriert`,
    [KEYS.GENERIC_Identity]:`Identität`,
    [KEYS.GENERIC_Contract]:`Smart Contract`,
    [KEYS.GENERIC_Action]:`Aktion`,
    [KEYS.GENERIC_Removed]:`Entfernt`,
    [KEYS.GENERIC_Name]:`Name`,
    [KEYS.GENERIC_Search]:`Suche`,
    [KEYS.GENERIC_VerifyPassword_Header]:`Bestätige dein Passwort`,
    [KEYS.GENERIC_VerifyPassword_Description]:`Du musst dein momentanes Passwort bestätigen bevor du dies tun kannst.`,
    [KEYS.GENERIC_Host]:'Host',
    [KEYS.GENERIC_Port]:'Port',
    [KEYS.GENERIC_Requires]:'Benötigt',
    [KEYS.GENERIC_RequiredProperties]:'Benötigte Eigenschaften',
    [KEYS.GENERIC_Import]:'Importieren',
    [KEYS.GENERIC_ChainID]:'Chain ID',
    [KEYS.GENERIC_Blockchain]:'Blockchain',
    [KEYS.GENERIC_Account]:'Account',

    [KEYS.PLACEHOLDER_Name]:'Name',
    [KEYS.PLACEHOLDER_PublicKey]:'Öffentlicher Schlüssel',
    [KEYS.PLACEHOLDER_PrivateKey]:'Privater Schlüssel',
    [KEYS.PLACEHOLDER_FirstName]:'Vorname',
    [KEYS.PLACEHOLDER_LastName]:'Nachname',
    [KEYS.PLACEHOLDER_Email]:'E-Mail',
    [KEYS.PLACEHOLDER_BirthDate]:'Geburtsdatum',
    [KEYS.PLACEHOLDER_LocationName]:'Standort Name',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'Zuhause',
    [KEYS.PLACEHOLDER_Phone]:'Telefonnummer',
    [KEYS.PLACEHOLDER_Address]:'Straße',
    [KEYS.PLACEHOLDER_City]:'Stadt',
    [KEYS.PLACEHOLDER_Postal]:'Postleitzahl',
    [KEYS.PLACEHOLDER_Country]:'Land',
    [KEYS.PLACEHOLDER_State]:'Bundesland',
    [KEYS.PLACEHOLDER_Password]:'Passwort',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'Passwort bestätigen',
    [KEYS.PLACEHOLDER_NewPassword]:'Neues Passwort',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'Neues Password bestätigen',
    [KEYS.PLACEHOLDER_DomainOrIP]:'Domäne oder IP',

    [KEYS.BUTTON_CreateIdentity]:'Identität erstellen',
    [KEYS.BUTTON_ImportAccount]:'Account importieren',
    [KEYS.BUTTON_ImportKeychain]:'Keychain importieren',
    [KEYS.BUTTON_SelectFile]:'Datei auswählen',
    [KEYS.BUTTON_AddNewLocation]:'Neuen Standort hinzufügen',
    [KEYS.BUTTON_SetAsDefaultLocation]:'Standort als Standardeinstellung wählen',
    [KEYS.BUTTON_RemoveLocation]:'Standort entfernen',
    [KEYS.BUTTON_ChangePassword]:'Passwort ändern',
    [KEYS.BUTTON_DestroyScatter]:'Scatter löschen',
    [KEYS.BUTTON_CreateNewScatter]:'Scatter neu erstellen',
    [KEYS.BUTTON_LoadFromBackup]:'Von Backup laden',
    [KEYS.BUTTON_Unlock]:'Entsperren',
    [KEYS.BUTTON_ExportScatter]:'Scatter exportieren',
    [KEYS.BUTTON_GenerateKeyPair]:'Schlüsselpaar generieren',
    [KEYS.BUTTON_Validate]:'Überprüfen',
    [KEYS.BUTTON_Copy]:'Kopieren',
    [KEYS.BUTTON_ChangeLanguage]:'Sprache ändern',
    [KEYS.BUTTON_Cancel]:'Abbrechen',
    [KEYS.BUTTON_Accept]:'Akzeptieren',
    [KEYS.BUTTON_Deny]:'Verweigern',
    [KEYS.BUTTON_Yes]:'Ja',
    [KEYS.BUTTON_No]:'Nein',
    [KEYS.BUTTON_UseSelectedAccount]:'Ausgewählten Account benutzen',
    [KEYS.BUTTON_SelectIdentity]:'Identität auswählen',

    [KEYS.MAINMENU_Identities]:'Identitäten',
    [KEYS.MAINMENU_Keys]:'Schlüsselpaare',
    [KEYS.MAINMENU_Permissions]:'Berechtigungen',
    [KEYS.MAINMENU_History]:'Verlauf',
    [KEYS.MAINMENU_Lock]:'Sperren',

    [KEYS.IDENTITIES_Header]:`Du hast noch keine Identitäten erstellt.`,
    [KEYS.IDENTITIES_Description]:`
        Identitäten verwalten persönliche Information wie Vor- und Nachnamen, Adressen sowie verschiedene
        Blockchain Accounts (Schlüsselpaare). Identitäten haben eigene Schlüsselpaare und ihr Besitz kann
        nachgewiesen werden, womit sie sich eignen, mit Anwendungen zu authentifizieren ohne klassische
        Passwörter eingeben zu müssen.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`Was macht Deaktivieren?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Das Deaktivieren dieser Identität verhindert, dass Anwendungen die sie verwendet haben Zugriff darauf bekommen.
        Dies ist eine Alternative zum permanenten Löschen dieser Identität oder ihrer Berechtigung in der Anwendung,
        was schwieriger wäre wiederherzustellen.
    `,

    [KEYS.IDENTITY_NameHeader]:`Identitätsname`,
    [KEYS.IDENTITY_NameDescription]:`
        Anwendungen können diesen Namen als deinen Benutzernamen verwenden denn dieser ist in allen Netzwerken eindeutig.
        Wenn du nicht mit RIDL registriert bist, wird dir ein zufälliger Name zugewiesen.
    `,
    [KEYS.IDENTITY_NoKeyPairsHeader]:`Keine Schlüsselpaare!`,
    [KEYS.IDENTITY_NoKeyPairsDescription]:`
        Bevor du Blockchain Accounts mit dieser Identität verknüpfen kannst musst du Schlüsselpaare hinzufügen. Gehe zum Hauptmenü und wähle:
    `,
    [KEYS.IDENTITY_AccountHeader]:`Account`,
    [KEYS.IDENTITY_AccountDescription]:`
        Accounts halten deine Gelder und erlauben dir mit Smart Contracts in der Blockchain zu interagieren.
        Im Zusammenhang mit Identitäten kannst du sie dir als Bankkonten verbunden mit deinem Pass vorstellen,
        sie können jederzeit geändert werden.
    `,
    [KEYS.IDENTITY_PersonalHeader]:`Persönliche Informationen`,
    [KEYS.IDENTITY_PersonalDescription]:`
        Persönliche Informationen können zu einem Account hinzugefügt werden für Anwendung welche diese benötigen.
        Eine Shopping-Webseite zum Beispiel könnte deinen Vor- und Nachnamen benötigen um zu wissen zu wem die Waren
        gesendet werden sollen.
    `,
    [KEYS.IDENTITY_LocationHeader]:`Standort Informationen`,
    [KEYS.IDENTITY_LocationDescription]:`
        Standort-Informationen können zu einem Account hinzugefügt werden für Anwendung welche diese benötigen.
        Eine Shopping-Webseite zum Beispiel könnte deine Adresse benötigen um zu wissen wohin die Waren
        gesendet werden sollen.
    `,

    [KEYS.PERMISSIONS_Header]:`Du hast noch keine Berechtigungen anzuzeigen.`,
    [KEYS.PERMISSIONS_Description]:`
        Berechtigungen werden erstellt wenn du eine Identität für eine Anwendung zur Verfügung stellst, oder wenn
        du eine Aktion eines Smart Contracts permanent freigibst damit sie automatisch unterzeichnet wird ohne
        andauernde Autorisierungsanfragen.
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`Identität widerrufen`,
    [KEYS.PERMISSION_RevokeContract]:`Smart Contract widerrufen`,
    [KEYS.PERMISSION_RevokeAction]:`Aktion widerrufen`,

    [KEYS.HISTORIES_Header]:`Du hast keine Ereignisse im Verlauf anzuzeigen.`,
    [KEYS.HISTORIES_Description]:`
        Sobald du welche hast wirst du eine Liste aller Ereignisse sehen die durch Scatter gehen.
        Jedoch wirst du nicht Ereignisse deiner Accounts sehen die ausserhalb von Scatter geschehen sind.
     `,
    [KEYS.HISTORIES_Note]:`
        Hinweis: Das Exportieren der Scatter Daten durch die Backup Option in den Einstellungen speichert diese
        Ereignisse nicht.
        Wenn du diese Scatter Instanz wieder importierst wird dein Verlauf leer sein. Wenn du deinen Verlauf künftig
        exportieren möchtest kannst du dies mit den Buttons in der Navigationsleiste hier tun.
    `,

    [KEYS.SETTINGSMENU_Networks]:'Netzwerke',
    [KEYS.SETTINGSMENU_Keypairs]:'Schlüsselpaare',
    [KEYS.SETTINGSMENU_Language]:'Sprache',
    [KEYS.SETTINGSMENU_AutoLock]:'Automatische Sperre',
    [KEYS.SETTINGSMENU_Password]:'Passwort',
    [KEYS.SETTINGSMENU_Backup]:'Backup',
    [KEYS.SETTINGSMENU_Destroy]:'Löschen',

    [KEYS.BACKUP_Header]:`Exportiere verschlüsseltes Backup`,
    [KEYS.BACKUP_Description]:`
        Das Exportieren deines Scatters erlaubt dir diesen auf anderen Geräten zu importieren.
        Die exportierte Datei wird verschlüsselt also stelle sicher, dass du deine Mnemonics oder dein Passwort gesichert hast,
        sonst sind die exportierten Daten nutzlos. Deine privaten Schlüssel werden beim Export ebenfalls entfernt,
        die einzigen privaten Schlüssel die exportiert werden sind die Schlüssel deiner Identitäten.
    `,

    [KEYS.PASS_Header]:`Neues Passwort eingeben`,
    [KEYS.PASS_Description]:`
        Wenn du dein Passwort änderst werden alle gespeicherten Informationen entschlüsselt die normalerweise verschlüsselt sind
        und anschließend mit einem Seed des neuen Passworts wieder verschlüsselt.
    `,

    [KEYS.NETWORK_Header]:`Neues Netzwerk hinzufügen`,
    [KEYS.NETWORK_Description]:`
        Normalerweise laufen Anwendungen in einem bestimmten Netzwerk, es ist aber möglich,
        dass nicht alle Anwendungen im selben Netzwerk laufen. Es kann z.B. sein, dass eine Anwendung
        in einem Testnetz läuft in welchem weitere Features hinzugefügt wurden, die noch nicht im eigentlichen Netzwerk verfügbar sind.
        Um mit diesem Netzwerk zu interagieren brauchst du dort ebenfalls einen Account.
    `,

    [KEYS.DESTROY_Header]:`Scatter löschen`,
    [KEYS.DESTROY_Description]:`
        Du bist dabei deine komplette Scatter-Keychain zu löschen. Die einzige möglichkeit exakt diesen Scatter wiederherzustellen ist,
        indem du eine exportierte Scatter-JSON importierst. Es ist nicht möglich deine beanspruchten Identitäten anders wiederherzustellen.
        Stelle sicher, dass du deinen Scatter über die Einstellungen exportiert und gespeichert hast.
    `,

    [KEYS.LANGUAGE_Header]:`Wähle deine Sprache aus`,

    [KEYS.KEYPAIRS_NoKeyPairsHeader]:`Du hast noch keine Schlüsselpaare.`,
    [KEYS.KEYPAIRS_NoKeyPairsDescription]:`
        Drücke den Button oben rechts um ein Schlüsselpaar zu erstellen/importieren.
    `,

    [KEYS.KEYPAIR_Header]:`Erstelle ein neues Schlüsselpaar`,
    [KEYS.KEYPAIR_Description]:`
        Hier kannst du EOS-Schlüsselpaare erzeugen. Die erzeugten Schlüsselpaare werden lokal auf deinem Rechner erzeugt und werden nie versendet.
        Du kannst auch ein Schlüsselpaar hinzufügen und überprüfen, ob der private Schlüssel mit dem öffentlichen Schlüssel übereinstimmt.
        Beachte, dass diese Schlüssel durch Entropie erzeugt werden, die von deinem Computer und nicht von einem bestimmten Seed stammen.
    `,
    [KEYS.KEYPAIR_Important]:`Bewahre deinen privaten Schlüssel sicher irgendwo auf! Du kannst ihn aus Scatter nicht mehr exportieren.`,
    [KEYS.KEYPAIR_Validation_Header]:`Erstelle ein neues Schlüsselpaar`,
    [KEYS.KEYPAIR_Validation_Valid]:`Der private Schlüssel ist gültig und der daraus generierte öffentliche Schlüssel entspricht dem bereitgestellten öffentlichen Schlüssel.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`Der aus dem privaten Schlüssel generierte öffentliche Schlüssel stimmt nicht mit dem bereitgestellten öffentlichen Schlüssel überein!`,


    [KEYS.LOCK_Header]:`Automatische Sperre`,
    [KEYS.LOCK_Description]:`
        Die automatische Sperre beeinflusst wie schnell Scatter gesperrt wird damit du nicht immer selber dran denken
        musst wenn du weggehst.
    `,
    [KEYS.LOCK_Minute]:`Minute`,
    [KEYS.LOCK_Minutes]:`Minuten`,
    [KEYS.LOCK_Hour]:`Stunde`,
    [KEYS.LOCK_Hours]:`Stunden`,
    [KEYS.LOCK_NeverLock]:`Niemals sperren`,


    [KEYS.MNEMONIC_Header]:`Mnemonic`,
    [KEYS.MNEMONIC_Description]:`Mnemonics sind eine Folge von Worten die einem kryptographischen Seed entsprechen.`,
    [KEYS.MNEMONIC_Note]:`
        Bewahre deine Worte unbedingt sicher auf! Es ist der einzige Weg um wieder Zugang zu deinem Scatter zu erhalten
        und deine privaten Informationen zu entschlüsseln, falls du jemals dein Passwort vergessen solltest.
    `,

    [KEYS.ERROR_MustSelectItem]:`Du musst etwas auswählen.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'Fehler';
            case AlertTypes.Prompt:             return 'Eingabe';
            case AlertTypes.SelectAccount:      return 'Account auswählen';
        }
    },

    //2
    [KEYS.ALERT_BadIdentityName]:[
        'Fehlerhafter Identitätsname',

        `Identitätsnamen müssen zwischen 3 und 20 Zeichen lang sein.
         Außerdem müssen sie alphanumerisch sein, dürfen aber Leerzeichen, Bindestriche und Unterstriche enthalten.`
    ],
    //2
    [KEYS.ALERT_IdentityNameExists]:[
        'Identitätsname existiert bereits',

        'Dieser Identitätsname ist bereits unter einer anderen Identität registriert.'
    ],
    //2
    [KEYS.ALERT_InvalidPrivateKey]:[
        'Ungültiger privater Schlüssel',

        `Der eingegebene private Schlüssel scheint ungültig zu sein. Bitte überprüfe den Schlüssel und versuche es erneut.`
    ],
    //2
    [KEYS.ALERT_NoAccountsFound]:[
        'Keine Accounts gefunden',

        `Es wurden keine Accounts gefunden, die zu diesem privaten Schlüssel gehören.
         Wenn du einen Schlüssel importieren willst, der nicht mit Scatter erstellt wurde
         musst du einen Account für diesen Schlüssel erstellen bevor du diesen importierst.`
    ],
    //2
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'Passwörter stimmen nicht überein',

        `Die von dir eingegebene Passwort-Bestätigung stimmt nicht mit dem Passwort überein.`
    ],
    //2
    [KEYS.ALERT_BadPassword]:[
        'Unzureichendes Passwort',

        'Passwörter müssen mindestens 8 Zeichen lang sein.'
    ],
    //2
    [KEYS.ALERT_WrongPassword]:[
        'Falsches Passwort',

        'Das von dir eingegebene Passwort war falsch.'
    ],
    //2
    [KEYS.ALERT_NetworkHostInvalid]:[
        'Netzwerk-Host ungültig',

        `Der eingegebene Netzwerk-Host war ungültig. Hosts sollten entweder ein Domänenname
        ( z.B: testnet.eos.io) oder eine IP ( z.B: 192.168.0.1 ) sein.`
    ],
    //2
    [KEYS.ALERT_NetworkExists]:[
        'Netzwerk bereits vorhanden',

        'Ein Netzwerk mit diesem Host und Port existiert bereits. Es gibt keinen Grund dasselbe Netzwerk zweimal zu speichern.'
    ],
    //2
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'Offizielles Netzwerk kann nicht entfernt werden',

        `Scatters offizielles Netzwerk kann nicht entfernt werden. Dieses Netzwerk wird genutzt um unsere Smart Contracts zur Verfügung zu stellen.`
    ],
    //2
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'Keine Identitäten gefunden',

        `Diese Anwendung fordert eine Identität mit Eigenschaften an, die du nicht hast. Die geforderten Eigenschaften sind '${fields.join(', ')}'`
    ],
    //2
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'Du musst eine Identität auswählen',

        `Wenn du eine Identität nicht freigeben möchtest, kannst du den Verweigern-Button drücken,
         andernfalls musst du eine Identität auswählen um diese Anfrage zu akzeptieren.`
    ],
    //2
    [KEYS.PROMPT_DestroyingScatter]:[
        'Scatter löschen',

        'Dies ist deine letzte Chance, deine Backups zu überprüfen.'
    ],
    //2
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'Identität widerrufen',

        `Du bist dabei, eine gesamte Identität von ${domain} zu widerrufen. Dies entfernt
         alle Berechtigungen der Identität selbst und alle darin enthaltenen Verträge.`
    ],
    //2
    [KEYS.PROMPT_RevokingContract]:domain => [
        'Vertrag widerrufen',

        `Du bist dabei, einen ganzen Vertrag von ${domain} zu widerrufen. Dadurch werden die Berechtigungen für alle darin enthaltenen Aktionen entfernt`
    ],
    //2
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'Aktion widerrufen',

        `Du bist dabei, eine Aktion von ${domain} zu widerrufen`
    ],
    //2
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'Identität entfernen',

        `Du bist dabei, eine Identität mit dem Namen '${name}' zu entfernen. Das Entfernen von Identitäten kann nicht rückgängig gemacht werden,
         außerdem werden alle Berechtigungen entfernt. Wenn du die Identität in Anwendungen verwendest, solltest du sie vielleicht einfach deaktivieren.`
    ],
    //2
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'Account entfernen',

        `Du bist dabei, den Account ${formattedAccountName} aus dieser Identität zu entfernen.`
    ],
    //2
    [KEYS.PROMPT_RemovingNetwork]:[
        'Netzwerk entfernen',

        `Du bist dabei, ein Netzwerk zu löschen. Du kannst keine
         neuen Accounts in diesem Netzwerk erstellen, nachdem du es gelöscht hast,
         aber es hindert dich auch nichts daran, es wieder hinzuzufügen. Accounts die
         dieses Netzwerk nutzen, werden nicht verändert oder entfernt.`
    ],
    //2
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'Du bist dabei einen währungsbasierten Vertrag auf deine Whitelist zu setzen',

        `Währungsbasierte Verträge auf die Whitelist zu setzen ist gefährlich und sollte niemals durchgeführt werden. Es gibt konkrete Fälle, in denen dies in Ordnung ist,
         aber solange du dir nicht absolut sicher bist, dass dies einer jener Fälle ist, solltest du diese Vertragsaktion nicht auf deine Whitelist setzen.
         Bist du sicher, dass du diesen Vertrag auf deine Whitelist setzen willst?`
    ],
    //2
    [KEYS.PROMPT_SelectAccount]:[
        'Account auswählen',

        'Wähle den Account und die Autorisierung aus die du für diese Identität benutzen möchtest. Du kannst immer nur einen Account auswählen.'
    ],

    //3
    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'möchte ihr Netzwerk zu deinem Scatter hinzufügen.',

        'Manche Anwendungen benutzen ihr eigenes Netzwerk.',

        `Die Anwendung hat dadurch keine Möglichkeit auf dein Scatter zuzugreifen.
         Ein Netzwerk über dieses Interface hinzuzufügen erspart dir einfach nur
         die Mühe es manuell über die Einstellungen hinzuzufügen.`
    ],
    //5
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ 'fordert weitere Informationen an.',

        `Manchmal bitten Anwendungen um weitere Informationen wie z.B.
         deine E-Mail oder dein Geburtsdatum. Auf der rechten Seite siehst du Identitäten mit den
         angeforderten Eigenschaften, die du in diesem Netzwerk besitzt.`,

        `Selbst wenn du eine Identität mit Eigenschaften bereitstellst die eine Anwendung nicht anfragt,
         kann die Anwendung diese nicht sehen oder ihre Existenz feststellen.`,

        `Die einzigen Informationen die immer übermittelt werden sind der öffentliche Schlüssel der Identität und ihr Name.`,

        /*{DOMAIN}*/ `fordert keine weiteren Informationen an. Sie benötigt nur den Identitäts-Hash und den Namen.`
    ],
    //2
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `Du hast keine Identitäten, welche die Eigenschaften enthält, die diese Anwendung anfordert.`,

        `Wenn du eine Identität mit dieser Domäne verwenden möchtest musst du die Identität aktualisieren um die Anforderungen der Anwendung zu erfüllen.
         Auf der linken Seite siehst du die Anforderungen dieser Domäne.`
    ],
    //4
    [KEYS.REQUEST_SignatureWhitelist]:[
        `Möchtest du diese Aktion auf deine Whitelist setzen?`,

        `Du kannst diese Aktion auf deine Whitelist setzen, sodass du diese beim nächsten Mal nicht mehr manuell autorisieren musst.
         Jede Eigenschaft, mit einem Häkchen daneben ist änderbar, d.h. du kannst zulassen, dass sich bestimmte Eigenschaften dieser Transaktion ändern dürfen,
         wenn aber sich andere Eigenschaften ändern wird die automatische Autorisierung verworfen.`,

        `Dies beinhaltet auch die erforderlichen persönlichen Informationen. Änderungen an der Identität selbst entfernen keine Berechtigungen`,

        `Wenn mehrere Standorte hinterlegt sind und eine Transaktion einen Standort erfordert, wirst du immer danach gefragt werden.`
    ],
    //4
    [KEYS.REQUEST_ScatterIsLocked]:[
        `Dein Scatter ist gesperrt!`,

        `Bevor du dein Scatter benutzen kannst musst du es erst entsperren.`,

        `Wir werden absichtlich nie eine Nachricht anzeigen, die dich auffordert dich einzuloggen.`,

        `Wenn du irgendwo aufgefordert wirst dein Passwort anzugeben, handelt es sich um eine bösartige Website die versucht, dein Passwort zu erhalten.
         Entsperre dein Scatter immer nur aus dem Popup der Erweiterung, indem du auf das Symbol in deinem Browser-Tray klickst.`
    ],
    //4
    [KEYS.REQUEST_UpdateVersion]:[
        `Dein Scatter ist veraltet!`,

        /*{DOMAIN}*/ `erfordert eine neuere Version von Scatter als die installierte.`,

        `Dies bedeutet in der Regel, dass neue Funktionen bereitgestellt wurden und eine Anwendung versucht diese zu verwenden,
         diese aber nicht in der derzeit von dir installierten Version enthalten sind.`,

        `Bitte beachte, dass wir die Versionsprüfung den Anwendungen selbst überlassen. Diese Anwendungen könnten versuchen
         dich dazu bringen, etwas bösartiges herunterzuladen. Stelle sicher, dass du Scatter immer von einer vertrauenswürdigen Stelle herunterlädst!`
    ],

}
