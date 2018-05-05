import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`Novo`,
    [KEYS.GENERIC_Save]:`Shrani`,
    [KEYS.GENERIC_Ignored]:`Ignoriran`,
    [KEYS.GENERIC_Identity]:`Identiteta`,
    [KEYS.GENERIC_Contract]:`Pogodba`,
    [KEYS.GENERIC_Action]:`Akcija`,
    [KEYS.GENERIC_Removed]:`Odstranjen`,
    [KEYS.GENERIC_Name]:`Ime`,
    [KEYS.GENERIC_Search]:`Išči`,
    [KEYS.GENERIC_VerifyPassword_Header]:`Preveri geslo`,
    [KEYS.GENERIC_VerifyPassword_Description]:`Preveriti morate trenutno geslo, preden lahko nadaljujete.`,
    [KEYS.GENERIC_Host]:'Strežnik',
    [KEYS.GENERIC_Port]:'Vrata',
    [KEYS.GENERIC_Requires]:'Potrebuje',
    [KEYS.GENERIC_RequiredProperties]:'Zahtevane lastnosti',

    [KEYS.PLACEHOLDER_Name]:'Naziv',
    [KEYS.PLACEHOLDER_PublicKey]:'Javni ključ',
    [KEYS.PLACEHOLDER_PrivateKey]:'Zasebni ključ',
    [KEYS.PLACEHOLDER_FirstName]:'Ime',
    [KEYS.PLACEHOLDER_LastName]:'Priimek',
    [KEYS.PLACEHOLDER_Email]:'Elektronska pošta',
    [KEYS.PLACEHOLDER_BirthDate]:'Datum rojstva',
    [KEYS.PLACEHOLDER_LocationName]:'Lokacija ',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'Domači naslov',
    [KEYS.PLACEHOLDER_Phone]:'Telefon',
    [KEYS.PLACEHOLDER_Address]:'Naslov',
    [KEYS.PLACEHOLDER_City]:'Mesto',
    [KEYS.PLACEHOLDER_Postal]:'Poštna številka',
    [KEYS.PLACEHOLDER_Country]:'Dežela',
    [KEYS.PLACEHOLDER_State]:'Država',
    [KEYS.PLACEHOLDER_Password]:'Geslo',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'Potrdite geslo',
    [KEYS.PLACEHOLDER_NewPassword]:'Novo geslo',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'Potrdite novo geslo',
    [KEYS.PLACEHOLDER_DomainOrIP]:'Domena ali IP',

    [KEYS.BUTTON_CreateIdentity]:'Ustvari račun',
    [KEYS.BUTTON_ImportAccount]:'Uvozi račun',
    [KEYS.BUTTON_AddNewLocation]:'Dodaj novo lokacijo',
    [KEYS.BUTTON_SetAsDefaultLocation]:'Izberi kot privzeto lokacijo',
    [KEYS.BUTTON_RemoveLocation]:'Izbriši lokacijo',
    [KEYS.BUTTON_ChangePassword]:'Zamenjaj geslo',
    [KEYS.BUTTON_DestroyScatter]:'Uniči Scatter',
    [KEYS.BUTTON_CreateNewScatter]:'Ustvari nov Scatter',
    [KEYS.BUTTON_LoadFromBackup]:'Naloži iz backup-a',
    [KEYS.BUTTON_Unlock]:'Odkleni',
    [KEYS.BUTTON_ExportScatter]:'Izvozi Scatter',
    [KEYS.BUTTON_GenerateKeyPair]:'Generiraj ključa',
    [KEYS.BUTTON_Validate]:'Preveri',
    [KEYS.BUTTON_Copy]:'Kopiraj',
    [KEYS.BUTTON_ChangeLanguage]:'Izberi drugi jezik',
    [KEYS.BUTTON_Cancel]:'Prekliči',
    [KEYS.BUTTON_Accept]:'Potrdi',
    [KEYS.BUTTON_Deny]:'Prepovej',
    [KEYS.BUTTON_Yes]:'Da',
    [KEYS.BUTTON_No]:'Ne',
    [KEYS.BUTTON_UseSelectedAccount]:'Uporabi izbrani račun',
    [KEYS.BUTTON_SelectIdentity]:'Izberi identiteto',

    [KEYS.MAINMENU_Identities]:'Identitete',
    [KEYS.MAINMENU_Permissions]:'Pravice',
    [KEYS.MAINMENU_History]:'Zgodovina',
    [KEYS.MAINMENU_Lock]:'Zakleni',

    [KEYS.IDENTITIES_Header]:`Trenutno nimate nobene identitete.`,
    [KEYS.IDENTITIES_Description]:`
        Identiteta je zbirka osebnih podatkov kot so ime in priimek, naslov. Vsebuje tudi različne
        blockchain račune. Identitete vsebujejo tudi privatne in javne ključe lastnika, kar omogoča
        avtentikacijo uporabnnika brez vnosa gesla.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`Zakaj uporabim preklic identitete?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Preklic ali izključitev identitete bo onemogočila uporabo le te v aplikacijah, ki se nanjo sklicujejo.
    `,

    [KEYS.IDENTITY_NameHeader]:`Naziv identitete`,
    [KEYS.IDENTITY_NameDescription]:`
        Aplikacija lahko uporabi naziv identitete kot vaše enolično uporabniško ime na omrežju. 
    `,
    [KEYS.IDENTITY_AccountHeader]:`Račun`,
    [KEYS.IDENTITY_AccountDescription]:`
        Na računu so shranjena vaša sredstva in z njim lahko upravljate s pogodbami na Blockchain-u.
    `,
    [KEYS.IDENTITY_PersonalHeader]:`Osebni podatki`,
    [KEYS.IDENTITY_PersonalDescription]:`
        Osebne podatke lahko spremenite kadarkoli. V primeru, da neka aplikacija zahteva popolne podatke (kot so naprimer
        spletne trgovine), lahko osebne podatke spremenite in nato povrnete v prvotno stanje.
    `,
    [KEYS.IDENTITY_LocationHeader]:`Podatki o naslovu`,
    [KEYS.IDENTITY_LocationDescription]:`
        Podatki o naslovu uporabnika.
    `,

    [KEYS.PERMISSIONS_Header]:`Trenutno nimate nobene pravice.`,
    [KEYS.PERMISSIONS_Description]:`
        Dovoljenja so nastavljena, ko bodisi zagotovite identiteto za aplikacijo, ki jo želite uporabiti.
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`Reaktiviraj identiteto`,
    [KEYS.PERMISSION_RevokeContract]:`Reaktiviraj pogodbo/kontrakt`,
    [KEYS.PERMISSION_RevokeAction]:`Reaktiviraj akcijo`,

    [KEYS.HISTORIES_Header]:`Nimate dogodkov za prikaz.`,
    [KEYS.HISTORIES_Description]:`
        Ko jih boste imeli, boste lahko videli seznam vseh dogodkov, ki potekajo skozi vaš Scatter.
        Kar ne boste videli so dogodki, ki so se zgodili na vaših računih zunaj Scatter-ja.
     `,
    [KEYS.HISTORIES_Note]:`
        Opomba: Če izvažate podatke iz Scatterja v nastavitvah, potem se tej dogodki ne bodo shranili.
        Ko ponovno uvažate instanco Scatter-ja, bo vaša zgodovina zapisov prazna. Če v prihdonje želite 
        izvoziti svojo zgodovino lahko to storite z uporabo akcijskih gumbov v navigacijskem meniju.
    `,

    [KEYS.SETTINGSMENU_Networks]:'Omrežja',
    [KEYS.SETTINGSMENU_Keypairs]:'Ključ (zasebni/javni)',
    [KEYS.SETTINGSMENU_Language]:'Jezik',
    [KEYS.SETTINGSMENU_AutoLock]:'Samodejno zaklepanje',
    [KEYS.SETTINGSMENU_Password]:'Geslo',
    [KEYS.SETTINGSMENU_Backup]:'Varnostna kopija',
    [KEYS.SETTINGSMENU_Destroy]:'Uniči',

    [KEYS.BACKUP_Header]:`Izvozi kriptirano varnostno kopijo`,
    [KEYS.BACKUP_Description]:`
        Izvoz vašega Scatterja vam omogoča, da ga uvozite v druge naprave. Datoteka, ki jo izvozite bo še vedno šifrirana,
        zato poskrbite, da boste imeli mnemonik ali geslo, sicer bo neuporabna. Zasebni ključi iz vaših računov bo tudi 
        pred izvozom odstranjen, edini zasebni ključi, ki bodo ostali v izvozu bo vaš osebni ključ.
    `,

    [KEYS.PASS_Header]:`Vnesi novo geslo`,
    [KEYS.PASS_Description]:`
        S spreminjanjem gesla boste dešifrirali vse shranjene podatke, ki so ponavadi vedno
        šifriran in jih nato ponovno šifrirali s (semenom) iz novega gesla.
    `,

    [KEYS.NETWORK_Header]:`Dodaj novo omrežje`,
    [KEYS.NETWORK_Description]:`
        Aplikacije se običajno izvajajo v določenem omrežju, vendar se morda ne izvajajo vse na
        istem. Na primer: Aplikacija ima lahko na testnem omrežju nove funkcionalnosti, ki
        še niso v produkcijskem okolju. V tem primeru  ima aplikacija lahko omrežje za testiranje
         ki ima nove funkcije, ki še niso sproščene. Da bi sodelovali
         to omrežje boste morali imeti tudi račun tam.
    `,

    [KEYS.DESTROY_Header]:`Uniči Scatter`,
    [KEYS.DESTROY_Description]:`
        Ste pred uničenjem Scatter-ja. V kolikor bi želeli v bodoče pridobiti stare podatke,
        morate le te izvoziti v JSON obliki. Izvoz je dostopen v varnostni kopiji (meni).
    `,

    [KEYS.LANGUAGE_Header]:`Izberite jezik`,
    [KEYS.LANGUAGE_Description]:`
        Izbira jezika vmesnika.
    `,

    [KEYS.KEYPAIR_Header]:`Generaj javni in privatni ključ`,
    [KEYS.KEYPAIR_Description]:`
        Tukaj lahko generirate zasebni in javni EOS ključ. Ključi so generirani lokalno na vašem računalniku in
        se nikoli nikamor ne pošiljajo.
    `,
    [KEYS.KEYPAIR_Validation_Header]:`Generiraj javni in privatni ključ`,
    [KEYS.KEYPAIR_Validation_Valid]:`Zasebni ključ je ustrezen in javni ključ ustreza podanemu.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`Generirani javni ključ ne ustreza podanemu javnemu ključu!`,


    [KEYS.LOCK_Header]:`Časovnik za samodejno zaklepanje`,
    [KEYS.LOCK_Description]:`
        Samodejno zaklepanje Scatter aplikacije.
    `,
    [KEYS.LOCK_Minute]:`Minut`,
    [KEYS.LOCK_Minutes]:`Minut`,
    [KEYS.LOCK_Hour]:`Ura`,
    [KEYS.LOCK_Hours]:`Ur`,
    [KEYS.LOCK_NeverLock]:`Nikoli ne zakleni`,


    [KEYS.MNEMONIC_Header]:`Mnemoniki`,
    [KEYS.MNEMONIC_Description]:`Mnemomniki so skupek besed, ki jih program uporabi za kriptiranje podatkov.`,
    [KEYS.MNEMONIC_Note]:`
        Bodite pozorni, da si besede shranite na varno mesto (npr. list papirja). Besede boste potrebovali v primeru, če pozabite geslo za dekriptiranje 
        zasebnih podatkov.
    `,

    [KEYS.ERROR_MustSelectItem]:`Izberite opcijo.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'Napaka';
            case AlertTypes.Prompt:             return 'Vnos';
            case AlertTypes.SelectAccount:      return 'Izberite račun';
        }
    },

    [KEYS.ALERT_BadIdentityName]:[
        'Nepravilen vnos Identitete',

        `Identiteta mora biti dolžine med 3 in 20 znaki.
         Zahtevan je alfanumerični vnos. Niz lahko vsebuje tudi presledke in vezaj.`
    ],
    [KEYS.ALERT_IdentityNameExists]:[
        'Identiteta s tem nazivom že obstaja',

        'Identiteta s tem nazivom je že registrirana.'
    ],
    [KEYS.ALERT_InvalidPrivateKey]:[
        'Napačen zasebni ključ',

        `Vnesli ste nepravilni zasebni ključ. Poizkusite ponovno.`
    ],
    [KEYS.ALERT_NoAccountsFound]:[
        'Račun ne obstaja',

        `Za vnešeni zasebni ključ ne obstaja noben račun.
         Če želite uvoziti ključ, ki ni bil generiran s pomočjo Scatter-ja
         potem morate najprej ustvariti račun in šele nato uvoziti zasebni ključ.`
    ],
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'Geslo se ne ujema',

        `Geslo, ki ste ga vnesli se ne ujema s potrdtitvenim geslom.`
    ],
    [KEYS.ALERT_BadPassword]:[
        'Nepravilno geslo',

        'Geslo mora biti vsaj 8 znakov dolgo'
    ],
    [KEYS.ALERT_WrongPassword]:[
        'Napačno geslo',

        'Vnešeno geslo je napačno.'
    ],
    [KEYS.ALERT_NetworkHostInvalid]:[
        'Nerpavilen naslov strežnika',

        `Naslov strežnika mora vsebovati (ime strežnika) ali IP številko.
         ( primer: testnet.eos.io ) ali IP (primer: 192.168.0.1 ).`
    ],
    [KEYS.ALERT_NetworkExists]:[
        'Omrežje že obstaja',

        'V sistemu že obstaja omrežje z enakim imenom ali IP številko.'
    ],
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'Povezanega omrežja ne morete odstraniti',

        `Omrežje je v uporabi za shrambo pogodb.`
    ],
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'Identiteta ne obstaja',

        `Ta aplikacija zahteva identifikacijo z lastnostmi, ki jih nimate. Lastnosti, ki jih želijo, so '${fields.join(', ')}'`
    ],
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'Izbrati morate identiteto',

        `Če ne želite izpostaviti identitete, lahko pritisnete gumb prepovej, sicer mora biti podana identiteta
         da bi sprejeli to zahtevo.`
    ],

    [KEYS.PROMPT_DestroyingScatter]:[
        'Uničenje Scatter-ja',

        'To je vaša zadnja možnost zato še enkrat preverite varnostno kopijo.'
    ],
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'Zavrnitev identitete',

        `Ste pred zavrnitvijo identitete ${domain}. To bo onemogočilo vse pravice 
         za identiteto in vse pogodbe, ki so nanjo vezane.`
    ],
    [KEYS.PROMPT_RevokingContract]:domain => [
        'Zavrnitev pogodbe',

        `Ste pred zavrnitvijo pogodbe ${domain}. Odstranjene bodo vse pravice in akcije, ki so povezane z pogodbo.`
    ],
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'Zavrnitev akcije za pogodbo',

        `Ste pred zavrnitvijo akcije za pogodbo ${domain}`
    ],
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'Odstranitev identitete',

        `Ste pred odstranitvijo identitete '${name}'. Odstranjeno identite in pravic ni mogoče povrniti. 
         Če identiteto uporabljate že v povezavi z drugo aplikacijo lahko to enostavneje onemogočite.`
    ],
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'Odstranjevanje rauna',

        `Stre pred odstranitvijo računa  ${formattedAccountName}, ki pripada trenutni identiteti.`
    ],
    [KEYS.PROMPT_RemovingNetwork]:[
        'Odstranitev omrežja',

        `Ste pred brisanjem - odstranitvijo omrežja.`
    ],
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'You Are About To Whitelist A Currency Contract',

        `Whitelisting currency based contracts is dangerous, and should never be done. There are specific cases where this is okay,
         but unless you are absolutely sure this is one of them, you should not be whitelisting this contract action.
         Are you sure you still want to whitelist this?`
    ],
    [KEYS.PROMPT_SelectAccount]:[
        'Izberite račun',

        'Izberite račun in organ, ki ga boste uporabljali s to identiteto. Izberete lahko le enega na enkrat.'
    ],


    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'želi dodati omrežje v vaš Scatter.',

        'Nekatere aplikacije uporabljajo svoja omrežja.',

        `Akcija ne bo omogočila nikakršnega dostopa do vašega Scatter računa. 
         Dodajanje omrežja preko te akcije samo olajša vnos omrežja, da ga ni
         potrebno ročno dodajati preko nastavitvenega panela.`
    ],
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ ' potrebuje dodatne podatke ali informacije.',

        `Včasih vas nekatere aplikacije povprašajo po dodatnih kot so 
        elektronska pošta, ime, datum rojstca.`,

        `Če tudi posredujete dodatne podatke katere aplikacija ne zahteva,
        tej ne bodo posredovane iz sistema Scatter.`,

        `Edina lastnost, ki se vedno posreduje je vaša identiteta (javni ključ in njegovo ime).`,

        ``
    ],
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `Nimate nobene identitete (podatka) katerega zahteva aplikacija.`,

        `Če želite uporabiti identiteto na tej domeni, potem morate ažurirati lastnosti,
         ki so zahtevane na levi strani.`
    ],
    [KEYS.REQUEST_SignatureWhitelist]:[
        `Do you want to whitelist this contract action?`,

        `You can whitelist this action so that next time you wont have to manually authorize this.
         Every property that has a check next to it will become mutable, meaning that you can allow
         certain properties of this transaction to change and only if the other properties are changed will
         it fail to be whitelisted.`,
        `This includes required personal information, and changes to your Identity do not remove permissions.`,
        `If you have multiple locations and a transaction requires a location you will always be prompted.`
    ],
    [KEYS.REQUEST_ScatterIsLocked]:[
        `Scatter je zaklenjen!`,
        `Preden pričnete uporabljati Scatter, ga morare najprej odkleniti`,
        `Nikoli vas ne bomo povprašali ali prikazovali vnosne maske za prijavo.`,
        `V kolikor opazite okno, ki od vas zahteva vnos gesla, gre lahko za prevaro! Scatter vedno odklenite na strani vtičnika.`
    ],
    [KEYS.REQUEST_UpdateVersion]:[
        `Scatter je potečen!`,
        /*{DOMAIN}*/ `potrebuje za delovanje novejšo verzijo aplikacije kot jo imate nameščeno na vašem sistemu.`,
        `To pomeni, da je verjetno zahtevana novejša funkcionalnost, ki jo vaša nameščena verzija programa Scatter še ne podpira.`,
        `Opozorilo! Preverjanje posodobitev je prepuščena matični aplikaciji, ki vas lahko pripelje tudi na napačno stran,
        zato se vedno prepričajte, da aplikacijo prenašate iz Scatter spletne strani.`
    ],

}










