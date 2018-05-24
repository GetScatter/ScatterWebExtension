import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`Nouveau`,
    [KEYS.GENERIC_Save]:`Enregistrer`,
    [KEYS.GENERIC_Ignored]:`Ignoré`,
    [KEYS.GENERIC_Identity]:`Identité`,
    [KEYS.GENERIC_Contract]:`Contrat`,
    [KEYS.GENERIC_Action]:`Action`,
    [KEYS.GENERIC_Removed]:`Supprimé`,
    [KEYS.GENERIC_Name]:`Nom`,
    [KEYS.GENERIC_Search]:`Recherche`,
    [KEYS.GENERIC_VerifyPassword_Header]:`Vérifiez Votre Mot de Passe`,
    [KEYS.GENERIC_VerifyPassword_Description]:`Vous devez vérifier votre mot de passe actuel avant de pouvoir procéder.`,
    [KEYS.GENERIC_Host]:'Hôte',
    [KEYS.GENERIC_Port]:'Port',
    [KEYS.GENERIC_Requires]:'Requiert',
    [KEYS.GENERIC_RequiredProperties]:'Propriétés requises',
    [KEYS.GENERIC_Import]:'Importer',
    [KEYS.GENERIC_ChainID]:'Chain ID',
    [KEYS.GENERIC_Blockchain]:'Blockchain',
    [KEYS.GENERIC_Account]:'Compte',

    [KEYS.PLACEHOLDER_Name]:'Nom',
    [KEYS.PLACEHOLDER_PublicKey]:'Clé publique',
    [KEYS.PLACEHOLDER_PrivateKey]:'Clé privée',
    [KEYS.PLACEHOLDER_FirstName]:'Prénom',
    [KEYS.PLACEHOLDER_LastName]:'Nom',
    [KEYS.PLACEHOLDER_Email]:'E-mail',
    [KEYS.PLACEHOLDER_BirthDate]:'Date de naissance',
    [KEYS.PLACEHOLDER_LocationName]:'Nom de l\'emplacement',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'Maison',
    [KEYS.PLACEHOLDER_Phone]:'Numéro de téléphone',
    [KEYS.PLACEHOLDER_Address]:'Adresse',
    [KEYS.PLACEHOLDER_City]:'Ville',
    [KEYS.PLACEHOLDER_Postal]:'Code Postal',
    [KEYS.PLACEHOLDER_Country]:'Pays',
    [KEYS.PLACEHOLDER_State]:'État',
    [KEYS.PLACEHOLDER_Password]:'Mot de passe',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'Confirmez votre Mot de Passe',
    [KEYS.PLACEHOLDER_NewPassword]:'Nouveau Mot de Passe',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'Confirmez votre Nouveau Mot de Passe',
    [KEYS.PLACEHOLDER_DomainOrIP]:'Domaine ou IP',

    [KEYS.BUTTON_CreateIdentity]:'Créer identité',
    [KEYS.BUTTON_ImportAccount]:'Importer Compte',
    [KEYS.BUTTON_ImportKeychain]:'Importer Porte-clés',
    [KEYS.BUTTON_SelectFile]:'Choisir Fichier',
    [KEYS.BUTTON_AddNewLocation]:'Ajouter un nouvel emplacement',
    [KEYS.BUTTON_SetAsDefaultLocation]:'Définir comme emplacement par défaut',
    [KEYS.BUTTON_RemoveLocation]:'Supprimer l\'emplacement',
    [KEYS.BUTTON_ChangePassword]:'Changer le mot de passe',
    [KEYS.BUTTON_DestroyScatter]:'Détruire Scatter',
    [KEYS.BUTTON_CreateNewScatter]:'Créer Nouveau Scatter',
    [KEYS.BUTTON_LoadFromBackup]:'Charger Depuis une Sauvegarde',
    [KEYS.BUTTON_Unlock]:'Déverrouiller',
    [KEYS.BUTTON_ExportScatter]:'Exporter Scatter',
    [KEYS.BUTTON_GenerateKeyPair]:'Générer une Paire de Clés',
    [KEYS.BUTTON_Validate]:'Valider',
    [KEYS.BUTTON_Copy]:'Copier',
    [KEYS.BUTTON_ChangeLanguage]:'Changer la Langue',
    [KEYS.BUTTON_Cancel]:'Annuler',
    [KEYS.BUTTON_Accept]:'Accepter',
    [KEYS.BUTTON_Deny]:'Refuser',
    [KEYS.BUTTON_Yes]:'Oui',
    [KEYS.BUTTON_No]:'Non',
    [KEYS.BUTTON_UseSelectedAccount]:'Utiliser le Compte sélectionné',
    [KEYS.BUTTON_SelectIdentity]:'Choisir l\'Identité',
    [KEYS.BUTTON_ChangeName]:'Changer le Nom',
    [KEYS.BUTTON_ClaimIdentity]:'Revendiquer l\'Identité',
    [KEYS.BUTTON_RegisterIdentity]:'Enregistrer l\'Identité',

    [KEYS.MAINMENU_Identities]:'Identités',
    [KEYS.MAINMENU_Keys]:'Paire de clés',
    [KEYS.MAINMENU_Permissions]:'Permissions',
    [KEYS.MAINMENU_History]:'Historique',
    [KEYS.MAINMENU_Lock]:'Verrouiller',

    [KEYS.IDENTITIES_Header]:`Vous n'avez pas encore d'Identités`,
    [KEYS.IDENTITIES_Description]:`
        Les Identités sont des contenants pour vos informations personnelles telles que votre prénom,
        votre nom, vos emplacements et plusieurs comptes/paires de clés blockchain. Les Identités 
        ont une paire de clés et il est possible de prouver que l'on en est propriétaire, ce qui 
        en fait un bon moyen de s'identifier auprès d'applications sans utiliser de mot de passe.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`A quoi sert Désactiver ?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Désactiver cette Identité provoque que les applications qui en ont une référence ne peuvent s'en servir.
        Cette fonction peut être utilisée plutôt que de supprimer de manière permanente cette Identité ou les 
        Permissions accordées par elle à une application et qui pourraient être difficilement récupérables.
    `,

    [KEYS.IDENTITY_NameHeader]:`Nom de l'Identité`,
    [KEYS.IDENTITY_NameDescription]:`
        Les applications peuvent choisir de vous attribuer ce nom en tant que nom d'utilisateur étant donné
        que celui-ci est unique sur tous les réseaux.
        Si vous n'êtes pas inscrit sur RIDL, un nom aléatoire vous sera attribué.
    `,

    [KEYS.IDENTITY_NoKeyPairsHeader]:`Pas de Paire de Clés!`,
    [KEYS.IDENTITY_NoKeyPairsDescription]:`
        Avant que vous ne puissiez ajouter des comptes blockchain à cette Identité, vous devez ajouter au moins une 
        Paire de Clés.
        Rendez-vous sur le menu principal et choisissez:
    `,

    [KEYS.IDENTITY_AccountHeader]:`Compte`,
    [KEYS.IDENTITY_AccountDescription]:`
        Les comptes détiennent vos fonds et vous permettent d'interagir avec les contrats sur la Blockchain.
        Leur relation aux Identités peut être vue comme les comptes bancaires attachés à votre passeport: 
        ceux-ci peuvent être changés à tout moment.
    `,

    [KEYS.IDENTITY_PersonalHeader]:`Informations Personnelles`,
    [KEYS.IDENTITY_PersonalDescription]:`
        Vos informations personnelles peuvent être ajoutées à un compte pour les applications qui les demandent.
        Par exemple, un site marchant pourrait exiger votre nom complet afin de savoir à qui envoyer les articles.
    `,

    [KEYS.IDENTITY_LocationHeader]:`Emplacements`,
    [KEYS.IDENTITY_LocationDescription]:`
        Les informations relatives à vos emplacements peuvent être ajoutées à un compte pour les applications qui
        les demandent. Par exemple, un site marchant pourrait exiger votre adresse de livraison afin de savoir où 
        envoyer les articles.
    `,

    [KEYS.PERMISSIONS_Header]:`Vous n'avez aucune Permission à afficher.`,
    [KEYS.PERMISSIONS_Description]:`
        Les Permissions sont définies quand vous fournissez une Identité à une application ou quand vous approuvez
        que la signature d'une action de contrat s'effectue sans message d'autorisation.
    `,

    [KEYS.PERMISSION_RevokeIdentity]:`Révoquer l'Identité`,
    [KEYS.PERMISSION_RevokeContract]:`Révoquer le Contrat`,
    [KEYS.PERMISSION_RevokeAction]:`Révoquer l'Action`,

    [KEYS.HISTORIES_Header]:`Vous n'avez aucun évènement passé à afficher.`,
    [KEYS.HISTORIES_Description]:`
        Quand vous en aurez, vous pourrez voir une liste de tous les évènements qui se seront déroulés sur votre 
        Scatter. Par contre, vous ne verrez pas les évènements qui se sont déroulés sur votre compte en dehors de 
        Scatter.
     `,

    [KEYS.HISTORIES_Note]:`
        Note: Exporter les données de votre Scatter depuis l'option Sauvegarder dans le panneau de configuration ne
        sauvegarde pas ces évènements. Lorsque vous importerez cette instance de Scatter, vos historiques seront vides.
        Si vous voulez exporter vos historiques, utilisez les boutons d'action situés dans la barre de navigation de ce panneau.  
    `,

    [KEYS.SETTINGSMENU_Networks]:'Réseaux',
    [KEYS.SETTINGSMENU_Keypairs]:'Paires de Clés',
    [KEYS.SETTINGSMENU_Language]:'Langues',
    [KEYS.SETTINGSMENU_AutoLock]:'Verrouillage automatique',
    [KEYS.SETTINGSMENU_Password]:'Mot de Passe',
    [KEYS.SETTINGSMENU_Backup]:'Sauvegarde',
    [KEYS.SETTINGSMENU_Destroy]:'Détruire',

    [KEYS.BACKUP_Header]:`Exporter une sauvegarde encryptée`,
    [KEYS.BACKUP_Description]:`
        Exporter votre Scatter vous permet de l'importer sur d'autres appareils. Le fichier exporté sera encrypté donc 
        assurez-vous bien d'avoir accès à votre code mnémonique ou à votre mot de passe, faute de quoi le fichier sera inutilisable. 
        Les clés privées de vos comptes seront supprimées pendant l'export, les seules clés privées restantes dans le fichier exporté
        seront les clés relatives à vos Identités.
    `,

    [KEYS.IMPORT_Header]:`Importer sauvegarde encryptée`,
    [KEYS.IMPORT_Description]:`
        L'importation du fichier encrypté contenant votre porte-clés restaurera votre porte-clés Scatter mais vos anciens réseaux ou
        comptes ne seront pas importés.
    `,

    [KEYS.PASS_Header]:`Entrez un nouveau mot de passe`,
    [KEYS.PASS_Description]:`
        Le changement de votre mot de passe provoquera le décryptage de toute votre information, qui reste en temps normal encryptée en 
        permanence, puis son ré-encodage en utilisant la graine aléatoire du nouveau mot de passe.
    `,

    [KEYS.NETWORK_Header]:`Ajouter un nouveau réseau`,
    [KEYS.NETWORK_Description]:`
        Les applications utilisent généralement un réseau spécifique mais il se peut 
        qu'elles n'utilisent pas toutes le même réseau. Par exemple, une application
        pourrait utiliser un réseau d'essai pour tester certaines fonctions non encore ajoutées.
        Afin d'interagir avec un tel réseau, vous devez vous devriez y avoir un compte.
    `,

    [KEYS.DESTROY_Header]:`Destruction de Scatter`,
    [KEYS.DESTROY_Description]:`
        Vous êtes sur le point de détruire votre porte-clés Scatter en totalité. La seule façon de retrouver votre Scatter
        en l'état actuel serait d'importer un Scatter JSON exporté. Vous ne serez pas en mesure de revendiquer vos
        identités autrement. Assurez-vous de bien avoir exporté votre Scatter depuis le panneau de configuration avant
        de procéder à sa destruction.
    `,

    [KEYS.LANGUAGE_Header]:`Sélectionnez la langue`,

    [KEYS.KEYPAIRS_NoKeyPairsHeader]:`Vous n'avez pas de paire de clés.`,
    [KEYS.KEYPAIRS_NoKeyPairsDescription]:`
        Cliquez sur le bouton situé dans la partie supérieure droite afin de créer ou importer une pare de clés.
    `,

    [KEYS.KEYPAIR_Header]:`Générer une nouvelle Paire de Clés`,
    [KEYS.KEYPAIR_Description]:`
        Vous pouvez utiliser ce panneau pour générer de nouvelles paires de clés. Ces paires de clés sont générées
        localement sur votre appareil et ne sont jamais envoyées ailleurs. Vous pouvez également renseigner une clé
        privée et la clé publique associée sera générée automatiquement.
    `,

    [KEYS.KEYPAIR_Important]:`Sauvegardez votre clé privée ailleurs! Vous ne pourrez pas extraire vos clés privées de Scatter.`,
    [KEYS.KEYPAIR_Validation_Header]:`Générer une nouvelle Paire de Clés`,
    [KEYS.KEYPAIR_Validation_Valid]:`La clé privée est valide et la clé publique associée correspond à la clé publique renseignée.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`La clé publique associée à la clé privée ne correspond pas à la clé publique renseignée !`,

    [KEYS.LOCK_Header]:`Minuterie de Verrouillage Automatique`,
    [KEYS.LOCK_Description]:`
        Le Verrouillage Automatique gère le verrouillage de Scatter pour vous
        afin que vous ne vous souciez pas de verrouiller votre Scatter lorsque
        vous vous éloignez de votre appareil.
    `,

    [KEYS.LOCK_Minute]:`Minute`,
    [KEYS.LOCK_Minutes]:`Minutes`,
    [KEYS.LOCK_Hour]:`Heure`,
    [KEYS.LOCK_Hours]:`Heures`,
    [KEYS.LOCK_NeverLock]:`Ne jamais verrouiller`,


    [KEYS.MNEMONIC_Header]:`Mnémonique`,
    [KEYS.MNEMONIC_Description]:`Le code mnémonique est un ensemble de mots qui font office de graine aléatoire cryptographique.`,
    [KEYS.MNEMONIC_Note]:`
        Assurez-vous de bien sauvegarder le votre en un endroit sûr. C'est la seule façon de restaurer l'accès
        à votre Scatter et déchiffrer vos informations privées si vous oubliez votre mot de passe.
    `,

    [KEYS.ERROR_MustSelectItem]:`Vous devez sélectionner un élément.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'Erreur';
            case AlertTypes.Prompt:             return 'Message';
            case AlertTypes.SelectAccount:      return 'Sélectionnez le compte';
        }
    },

    //2
    [KEYS.ALERT_BadIdentityName]:[
        'Nom d\'Identité incorrect',

        `Votre nom d'Identité doit comporter de 3 à 20 caractères.
         Il doit contenir uniquement des caractères alphanumériques, des espaces, 
         des tirets (-) et des traits de soulignement (_).`
    ],
    //2
    [KEYS.ALERT_IdentityNameExists]:[
        'Ce Nom d\'Identité existe déjà.',

        'Ce Nom d\'Identité a été enregistré par une autre Identité.'
    ],
    //2
    [KEYS.ALERT_NoSuchIdentityName]:[
        'Ce Nom d\'Identité n\'existe pas.',

        'Ce Nom d\'Identité n\'a pas été enregistré dans RIDL.'
    ],
    //2
    [KEYS.ALERT_KeyPairExists]:[
        'La Paire de Clés existe déjà',

        'Cette Paire de Clés est déjà enregistrée dans votre Porte-clés.'
    ],
    //2
    [KEYS.ALERT_BadKeyPairName]:[
        'Nom de Paire de Clés incorrect',

        'Les Paires de Clés doivent être nommées de manière unique.'
    ],
    //2
    [KEYS.ALERT_InvalidPrivateKey]:[
        'Clé Privée invalide',

        `La clé privée que vous avez renseigné est invalide. Veuillez vérifier la clé et réessayer.`
    ],
    //2
    [KEYS.ALERT_NoAccountsFound]:[
        'Aucun compte trouvé',

        `Aucun compte associé à cette clé privée n'a été trouvé.
         Si vous désirez importer une clé qui n'a pas été générée
         par Scatter, vous devez créer un compte pour la clé avant
         de l'importer.`
    ],
    //2
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'Les mots de passe ne correspondent pas',

        `Le mot de passe saisi ne correspond pas à la confirmation.`
    ],
    //2
    [KEYS.ALERT_BadPassword]:[
        'Mot de passe incorrect',

        'Votre mot de passe doit contenir au moins 8 caractères.'
    ],
    //2
    [KEYS.ALERT_WrongPassword]:[
        'Mot de passe incorrect',

        'Le mot de passe saisi est incorrect.'
    ],
    //2
    [KEYS.ALERT_NetworkHostInvalid]:[
        'Hôte Réseau invalide',

        `L'Hôte réseau que vous avez saisi est invalide. L'Hôte doit être un
         nom de domaine ( ex: testnet.eos.io ) ou une adresse IP ( ex: 192.168.0.1 ).`
    ],
    //2
    [KEYS.ALERT_NetworkExists]:[
        'Ce réseau existe déjà',

        'Un autre Réseau avec cet hôte et ce port existe déjà. Un réseau ne peut être sauvegardé en double.'
    ],
    //2
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'Impossible de Supprimer le Réseau Approuvé',

        `Vous ne pouvez pas supprimer les Réseaux Approuvés par Scatter.`
    ],
    //2
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'Aucune Identité trouvée',

        `Cette application demande une Identité possédant des propriétés que vous n'avez pas rempli. Les propriétés demandées sont: '${fields.join(', ')}'`
    ],
    //2
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'Vous devez choisir une Identité',

        `Si vous ne désirez pas dévoiler d'Identité, vous pouvez appuyez sur le bouton Refuser. Dans le cas contraire, vous
         devez choisir une Identité afin d'accepter cette requête.`
    ],
    //2
    [KEYS.PROMPT_DestroyingScatter]:[
        'Destruction de Scatter',

        'C\'est votre dernière chance de vérifier vos sauvegardes.'
    ],
    //2
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'Révocation d\'Identité',

        `Vous êtes sur le point de révoquer une Identité entière de ${domain}. Cette action supprimera les permissions 
         sur l'Identité ainsi que sur tous les contrats associés.`
    ],
    //2
    [KEYS.PROMPT_RevokingContract]:domain => [
        'Révocation de Contrat',

        `Vous êtes sur le point de révoquer un contrat entier de ${domain}. Cette action supprimera les permissions sur
         toutes les actions associées.`
    ],
    //2
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'Révocation de d\'Action de Contrat',

        `Vous êtes sur le point de révoquer une action de ${domain}`
    ],
    //2
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'Suppression d\'Identité ',

        `Vous êtes sur le point de supprimer une Identité avec le nom '${name}'. La suppression est irréversible et 
         toutes les permissions seront perdues. Si l'Identité est actuellement utilisée par des applications, il serait
         peut-être préférable de plutôt la désactiver.`
    ],
    //2
    [KEYS.PROMPT_DeletingKeyPair]:identities => [
        'Suppression d\'une Paire de Clés',

        identities.length ? `Cette Paire de Clés est utilisée par: '${identities.join(', ')}'` : `Cette Paire de Clés n'est utilisée par aucune Identité.`
    ],
    //2
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'Suppression du Compte',

        `Vous êtes sur le point de supprimer le compte ${formattedAccountName} de cette Identité.`
    ],
    //2
    [KEYS.PROMPT_RemovingNetwork]:[
        'Suppression du Réseau',

        `Vous êtes sur le point de supprimer un Réseau. Vous ne
         serez plus en mesure de créer de nouveaux comptes sur ce
         Réseau si vous le supprimez mais vous pouvez le ré-ajouter
         à tout moment. Aucun compte utilisant ce Réseau ne sera
         modifié ou supprimé`
    ],
    //2
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'Vous êtes sur le point d\'inscrire un contrat de devise sur liste blanche'

        ` Inscrire un contrat de devise sur liste blanche est dangereux et ne devrait jamais avoir lieu. Il existe des cas très
         particuliers où une telle action est tolérée mais à moins que vous ne soyez absolument sûr qu'il s'agit présentement d'un
         de ces cas, vous ne devriez pas inscrire cette action de contrat sur liste blanche.
         Êtes-vous sûr de vouloir inscrire ceci sur liste blanche ?`
    ],
    //2
    [KEYS.PROMPT_SelectAccount]:[
        'Choisir Compte',

        'Choisissez le compte et l\'autorité que vous désirez utiliser pour cette identité. Vous ne pouvez choisir qu\'un compte à la fois.'
    ],
    //2
    [KEYS.PROMPT_ClaimIdentity]:[
        'Revendiquer l\'Identité',

        'Veuillez renseigner la clé privée associée à la clé publique enregistrée pour votre nom d\'Identité.'
    ],

    //3
    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'veut ajouter son réseau à votre Scatter.',

        'Certaines applications utilisent leur propre Réseau.',

        `Ceci ne donne à l'application aucun accès à votre Scatter.
         Ajouter un réseau depuis cette interface vous évite simplement
         l'effort de l'ajouter manuellement depuis votre panneau de 
         configuration.`
    ],
    //5
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ 'demande des informations supplémentaires.',

        `Parfois certaines applications demandent des informations
         supplémentaires telles que votre e-mail ou votre date de 
         naissance. Les Identités présentes à droite sont celles
         que vous possédez sur ce Réseau avec les propriétés 
         demandées.`,

        `Même si vous fournissez une Identité possédant des propriétés 
         pour lesquelles l'application de ne demande pas de permissions, 
         ces propriétés ne seront jamais dévoilées voire même l'application
         ne saura pas que de telles propriétés existent pour cette Identité.`,

        `Les seules propriétés qui sont données systématiquement sont la clé publique de 
         l'Identité et son nom.`,

        /*{DOMAIN}*/ ` ne demande aucune information supplémentaire. La seule demande est un hash et un nom d'Identité.`
    ],
    //2
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `Vous n'avez aucune Identité dont les propriétés demandées par cette application sont renseignées.`,

        `Si vous voulez utiliser cette Identité sur ce domaine, vous devez mettre à jour cette Identité et fournir les informations
         demandées. Vous pouvez voir ce que demande ce domaine sur le panneau de gauche.`
    ],
    //4
    [KEYS.REQUEST_SignatureWhitelist]:[
        `Voulez-vous inscrire cette action de contrat sur liste blanche?`,

        `Vous pouvez inscrire cette action sur liste blanche afin de ne plus devoir l'autoriser
         manuellement. Une propriété comportant une coche deviendra muable, ce qui veut dire que
         vous pouvez autoriser le changement de certaines propriétés de cette transaction et 
         seulement si les propriétés sans coche changent, l'inscription sur liste blanche échouera.`,

        `Ceci comprend les informations personnelles requises et aucun changement effectué sur votre Identité
         ne supprime vos permissions.`,

        `Si vous possédez plusieurs emplacements et qu'une transaction en requiert une, celle-ci vous sera 
         toujours demandée.`
    ],
    //4
    [KEYS.REQUEST_ScatterIsLocked]:[
        `Votre Scatter est verrouillé!`,

        `Avant que vous ne puissiez faire quoi que ce soit, vous devez le déverrouiller.`,

        `Nous faisons exprès de ne jamais afficher une fenêtre ou un popup vous demandant de vous identifier.`,

        `Si vous voyez une fenêtre ou un popup vous demandant votre mot de passe, c'est un site web malveillant essayant de
         voler votre mot de passe. Veuillez à toujours déverrouiller Scatter depuis le popup de l'extension en cliquant sur
         l'icône dans la barre de votre navigateur.`
    ],
    //4
    [KEYS.REQUEST_UpdateVersion]:[
        `Vous n'avez pas la dernière version de Scatter!`,

        /*{DOMAIN}*/ `exige une version plus récente de Scatter.`,

        `Ceci veut généralement dire que de nouvelles fonctionnalités ont été ajoutées à Scatter et une application 
         essaie de les utiliser alors qu'elles ne sont pas inclues dans la version installée sur votre appareil.`,

        `Merci de bien vouloir noter que nous laissons le soin aux applications de vérifier la version de Scatter.
        Celles-ci pourraient essayer de vous faire télécharger un logiciel malveillant. Veuillez à télécharger
        Scatter depuis une source de confiance.`
    ],

}










