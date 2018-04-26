import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`Nuevo`,
    [KEYS.GENERIC_Save]:`Guardar`,
    [KEYS.GENERIC_Ignored]:`Ignorado`,
    [KEYS.GENERIC_Identity]:`Identidad`,
    [KEYS.GENERIC_Contract]:`Contrato`,
    [KEYS.GENERIC_Action]:`Acción`,
    [KEYS.GENERIC_Removed]:`Eliminado`,
    [KEYS.GENERIC_Name]:`Nombre`,
    [KEYS.GENERIC_Search]:`Buscar`,
    [KEYS.GENERIC_VerifyPassword_Header]:`Verifica Tu Contraseña`,
    [KEYS.GENERIC_VerifyPassword_Description]:`Necesitas verificar tu contraseña actual antes de poder hacer esto.`,
    [KEYS.GENERIC_Host]:'Host',
    [KEYS.GENERIC_Port]:'Puerto',
    [KEYS.GENERIC_Requires]:'Requiere',
    [KEYS.GENERIC_RequiredProperties]:'Propiedades Requeridas',

    [KEYS.PLACEHOLDER_Name]:'Nombre',
    [KEYS.PLACEHOLDER_PublicKey]:'Llave Pública',
    [KEYS.PLACEHOLDER_PrivateKey]:'Llave Privada',
    [KEYS.PLACEHOLDER_FirstName]:'Nombre',
    [KEYS.PLACEHOLDER_LastName]:'Apellido',
    [KEYS.PLACEHOLDER_Email]:'Correo Electrónico',
    [KEYS.PLACEHOLDER_BirthDate]:'Fecha de Nacimiento',
    [KEYS.PLACEHOLDER_LocationName]:'Nombre de la Ubicación',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'Casa',
    [KEYS.PLACEHOLDER_Phone]:'Teléfono',
    [KEYS.PLACEHOLDER_Address]:'Dirección',
    [KEYS.PLACEHOLDER_City]:'Ciudad',
    [KEYS.PLACEHOLDER_Postal]:'Código Postal',
    [KEYS.PLACEHOLDER_Country]:'País',
    [KEYS.PLACEHOLDER_State]:'Estado',
    [KEYS.PLACEHOLDER_Password]:'Contraseña',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'Confirmar Contraseña',
    [KEYS.PLACEHOLDER_NewPassword]:'Nueva Contraseña',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'Confirmar Nueva Contraseña',
    [KEYS.PLACEHOLDER_DomainOrIP]:'Dominio o IP',

    [KEYS.BUTTON_CreateIdentity]:'Crear Identidad',
    [KEYS.BUTTON_ImportAccount]:'Importar Cuenta',
    [KEYS.BUTTON_AddNewLocation]:'Agregar Ubicación Nueva',
    [KEYS.BUTTON_SetAsDefaultLocation]:'Establecer Como Ubicación Predeterminada',
    [KEYS.BUTTON_RemoveLocation]:'Eliminar Ubicación',
    [KEYS.BUTTON_ChangePassword]:'Cambiar Contraseña',
    [KEYS.BUTTON_DestroyScatter]:'Borrar Scatter',
    [KEYS.BUTTON_CreateNewScatter]:'Crear Nuevo Scatter',
    [KEYS.BUTTON_LoadFromBackup]:'Cargar Desde Respaldo',
    [KEYS.BUTTON_Unlock]:'Desbloquear',
    [KEYS.BUTTON_ExportScatter]:'Exportar Scatter',
    [KEYS.BUTTON_GenerateKeyPair]:'Generar Par de Llaves',
    [KEYS.BUTTON_Validate]:'Validar',
    [KEYS.BUTTON_Copy]:'Copiar',
    [KEYS.BUTTON_ChangeLanguage]:'Cambiar Idioma',
    [KEYS.BUTTON_Cancel]:'Cancelar',
    [KEYS.BUTTON_Accept]:'Aceptar',
    [KEYS.BUTTON_Deny]:'Denegar',
    [KEYS.BUTTON_Yes]:'Sí',
    [KEYS.BUTTON_No]:'No',
    [KEYS.BUTTON_UseSelectedAccount]:'Usar Cuenta Seleccionada',
    [KEYS.BUTTON_SelectIdentity]:'Seleccionar Identidad',

    [KEYS.MAINMENU_Identities]:'Identidades',
    [KEYS.MAINMENU_Permissions]:'Permisos',
    [KEYS.MAINMENU_History]:'Historial',
    [KEYS.MAINMENU_Lock]:'Bloquear',

    [KEYS.IDENTITIES_Header]:`No tienes ninguna Identidad todavía.`,
    [KEYS.IDENTITIES_Description]:`
        Las Identidades son contenedores de información personal como nombre y apellidos, direcciones 
        y varias cuentas/par de llaves de blockchain. Las Identidades también tienen pares de llaves
        y su propiedad se puede probar, lo que las convierte en una forma de autenticarse con aplicaciones 
        sin contraseñas.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`¿Qué hace la Deshabilitación?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Deshabilitar esta Identidad impedirá que sea usada en aplicaciones que tengan una referencia a ella.
        Esto puede ser usado en lugar de borrar permanentemente esta Identidad o sus Permisos en una aplicación,
        lo cual sería más difícil de recuperar.
    `,

    [KEYS.IDENTITY_NameHeader]:`Nombre de Identidad`,
    [KEYS.IDENTITY_NameDescription]:`
        Las Aplicaciones pueden elegir usar este nombre como tu nombre de usuario, ya que es único en todas las redes. 
        Si no estas registrado con RIDL recibirás un nombre aleatorio. 
    `,
    [KEYS.IDENTITY_AccountHeader]:`Cuenta`,
    [KEYS.IDENTITY_AccountDescription]:`
        Las Cuentas son las que sostienen tus fondos y te permiten interactuar con contractos en la Blockchain.
        En relación con las Identidades, piensa en ellas como las cuentas bancarias conectadas a tu pasaporte, 
        pueden ser cambiadas en cualquier momento.
    `,
    [KEYS.IDENTITY_PersonalHeader]:`Información Personal`,
    [KEYS.IDENTITY_PersonalDescription]:`
        Información Personal puede ser agregada a una cuenta para aplicaciones que lo requieran. Por ejemplo,
        una página de compras puede necesitar tu nombre completo para saber a quién enviarle los artículos 
        adquiridos.
    `,
    [KEYS.IDENTITY_LocationHeader]:`Información de Ubicación`,
    [KEYS.IDENTITY_LocationDescription]:`
        Información de Ubicación puede ser agregada a una cuenta para aplicaciones que lo requieran.
        Por ejemplo, una página de compras puede necesitar tu dirección de envío para saber a dónde enviar 
        los artículos adquiridos.
    `,

    [KEYS.PERMISSIONS_Header]:`No tienes permisos para mostrar.`,
    [KEYS.PERMISSIONS_Description]:`
        Los Permisos se establecen cuando proporcionas una Identidad para que sea usada por una aplicación 
        o cuando agregas una acción de contrato a la lista blanca para que sea firmada sin avisos
        de autorización.
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`Revocar Identidad`,
    [KEYS.PERMISSION_RevokeContract]:`Revocar Contrato`,
    [KEYS.PERMISSION_RevokeAction]:`Revocar Acción`,

    [KEYS.HISTORIES_Header]:`No tienes eventos históricos para mostrar.`,
    [KEYS.HISTORIES_Description]:`
        Una vez los tengas podrás ver una lista de todos los eventos que pasan por tu Scatter.
        Lo que no verás son eventos que hayan ocurrido en tus cuentas fuera de Scatter.
     `,
    [KEYS.HISTORIES_Note]:`
        Nota: La exportación de los datos de Scatter desde la opción de respaldo en el panel de configuración no guarda estos eventos.
        Cuando importes esa instancia de Scatter, tus historiales estarán vacíos. Si deseas exportar tus historiales
        en el futuro puedes hacerlo usando los botones de acción en la barra de navegación dentro de este panel.
    `,

    [KEYS.SETTINGSMENU_Networks]:'Redes',
    [KEYS.SETTINGSMENU_Keypairs]:'Pares de Llaves',
    [KEYS.SETTINGSMENU_Language]:'Idioma',
    [KEYS.SETTINGSMENU_AutoLock]:'Bloqueo Automático',
    [KEYS.SETTINGSMENU_Password]:'Contraseña',
    [KEYS.SETTINGSMENU_Backup]:'Respaldar',
    [KEYS.SETTINGSMENU_Destroy]:'Borrar',

    [KEYS.BACKUP_Header]:`Exportar respaldo encriptado`,
    [KEYS.BACKUP_Description]:`
        Exportar tu Scatter te permite importarlo en otros dispositivos. El archivo seguirá encriptado cuando sea
        exportado así que asegúrate de tener tus mnemotécnicos o contraseña; de lo contrario, será inútil. Las llaves privadas
        de tus cuentas también se eliminarán antes de exportar, las únicas llaves privadas que permanecerán dentro del archivo
        exportado serán tus llaves de Identidad.
    `,

    [KEYS.PASS_Header]:`Introduce una nueva contraseña`,
    [KEYS.PASS_Description]:`
        Al cambiar tu contraseña estarás desencriptando toda la información almacenada, la cual está encriptada
        normalmente, y luego encriptándola nuevamente con una semilla de la nueva contraseña.
    `,

    [KEYS.NETWORK_Header]:`Agregar nueva red`,
    [KEYS.NETWORK_Description]:`
        Las aplicaciones generalmente se ejecutan en una red específica, pero es posible 
        que no se ejecuten todas en la misma red. Por ejemplo, una aplicación puede tener una 
        red de prueba que tiene nuevas funcionalidades que aún no se han lanzado. Para 
        interactuar con esa red necesitarás tener una cuenta allí también.
    `,

    [KEYS.DESTROY_Header]:`Borrando Scatter`,
    [KEYS.DESTROY_Description]:`
        Estás a punto de borrar todo tu llavero de Scatter. La única forma de recuperar este mismo Scatter es
        importando un JSON exportado de Scatter. De lo contrario No podrás reclamar tus identidades. Asegúrate
        de haber exportado tu Scatter desde el paración de respaldo de antemano.
    `,

    [KEYS.LANGUAGE_Header]:`Selecciona tu idioma`,

    [KEYS.KEYPAIR_Header]:`Generar nuevo Par de Llaves`,
    [KEYS.KEYPAIR_Description]:`
        Puedes usar este panel para generar pares de llaves de EOS. Estos pares de llaves se generan localmente 
        en tu máquina y nunca se envían a ningún lado. También puedes pegar un par de llaves y verificar que la llave 
        privada coincida con la llave pública. Ten en cuenta que esas llaves se generan utilizando la entropía recopilada 
        de tu ordenador y no de una semilla específica.
    `,
    [KEYS.KEYPAIR_Validation_Header]:`Generar nuevo Par de Llaves`,
    [KEYS.KEYPAIR_Validation_Valid]:`La llave privada es válida y la llave pública generada a partir de ella coincide con la llave pública provista.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`La llave pública generada a partir de la llave privada no coincide con la llave pública proporcionada!`,


    [KEYS.LOCK_Header]:`Temporizador de Bloqueo Automático`,
    [KEYS.LOCK_Description]:`
        El Bloqueo Automático maneja el bloqueo de Scatter para que no tengas 
        que recordar bloquear tu Scatter cuando te alejes del ordenador.
    `,
    [KEYS.LOCK_Minute]:`Minuto`,
    [KEYS.LOCK_Minutes]:`Minutos`,
    [KEYS.LOCK_Hour]:`Hora`,
    [KEYS.LOCK_Hours]:`Horas`,
    [KEYS.LOCK_NeverLock]:`Nunca Bloquear`,


    [KEYS.MNEMONIC_Header]:`Mnemotécnico`,
    [KEYS.MNEMONIC_Description]:`Los mnemotécnicos son un conjunto de palabras que se traducen en una semilla criptográfica.`,
    [KEYS.MNEMONIC_Note]:`
        Asegúrate de guardar el tuyo en un lugar seguro. Es la única forma de recuperar 
        el acceso a tu Scatter y desencriptar tu información privada si olvidas tu contraseña.
    `,

    [KEYS.ERROR_MustSelectItem]:`Debes seleccionar un item.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'Error';
            case AlertTypes.Prompt:             return 'Aviso';
            case AlertTypes.SelectAccount:      return 'Seleccionar Cuenta';
        }
    },

    //2
    [KEYS.ALERT_BadIdentityName]:[
        'Nombre de Identidad Inválido',

        `Los nombres de Identidad deben tener entre 3 y 20 caracteres.
         También deben ser alfanuméricos, pero también pueden contener espacios, guiones y guiones bajos.`
    ],
    //2
    [KEYS.ALERT_IdentityNameExists]:[
        'Nombre de Identidad ya Existe',

        'Este nombre de Identidad está registrado por otra Identidad.'
    ],
    //2
    [KEYS.ALERT_InvalidPrivateKey]:[
        'Llave Privada Inválida',

        `La llave privada ingresada parece inválida. Por favor, verifica la llave y vuelve a intentarlo.`
    ],
    //2
    [KEYS.ALERT_NoAccountsFound]:[
        'Cuentas no Encontradas',

        `No se encontraron cuentas conectadas a esta llave privada.
         Si deseas importar una llave que no es generada por
         Scatter necesitarás crear una cuenta para la llave
         antes de importarla.`
    ],
    //2
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'Las Contraseñas no Coinciden',

        `La contraseña que has ingresado no coincide con su confirmación.`
    ],
    //2
    [KEYS.ALERT_BadPassword]:[
        'Contraseña Inválida',

        'Las constraseñas deben tener al menos 8 caracteres.'
    ],
    //2
    [KEYS.ALERT_WrongPassword]:[
        'Contraseña Incorrecta',

        'La contraseña introducida fue incorrecta.'
    ],
    //2
    [KEYS.ALERT_NetworkHostInvalid]:[
        'Host de la Red Inválido',

        `El Host de Red que has ingresado es inválido. Los Hosts deben ser un nombre de dominio
         ( ej.: testnet.eos.io ) o una IP ( ej.: 192.168.0.1 ).`
    ],
    //2
    [KEYS.ALERT_NetworkExists]:[
        'La Red ya Existe',

        'Ya existe otra Red con este host y puerto. No hay razón para tener una red guardada dos veces.'
    ],
    //2
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'Imposible Eliminar la Red Endosada',

        `No puedes eliminar la Red endosada de Scatter. Usamos esta Red para alojar nuestros contratos.`
    ],
    //2
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'No se Encontraron Identidades',

        `Esta aplicación está solicitando una Identidad con propiedades que no tienes. Las propiedades requeridas son '${fields.join(', ')}'`
    ],
    //2
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'Debes Seleccionar una Identidad',

        `Si no deseas exponer una Identidad, puedes presionar el botón Denegar; de lo contrario, debes seleccionar
         una Identidad para aceptar esta solicitud.`
    ],
    //2
    [KEYS.PROMPT_DestroyingScatter]:[
        'Borrando Scatter',

        'Esta es tu última oportunidad para verificar tus respaldos.'
    ],
    //2
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'Revocando Identidad',

        `Estás a punto de revocar toda una Identidad de ${domain}. Esto eliminará
         permisos sobre la Identidad misma y todos los contratos dentro de ella.`
    ],
    //2
    [KEYS.PROMPT_RevokingContract]:domain => [
        'Revocando Contrato',

        `Estás a punto de revocar todo un Contrato de ${domain}. Esto eliminará los permisos en todas las acciones dentro de él.`
    ],
    //2
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'Revocando Acción de Contrato',

        `Estás a punto de revocar una acción de ${domain}`
    ],
    //2
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'Eliminando Identidad',

        `Estás a punto eliminar una Identidad con el nombre '${name}'. Eliminar Identidades no es reversible y
         todos los permisos lo serán. Si la Identidad se está usando en aplicaciones, tal vez sólo deberías desactivarla.`
    ],
    //2
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'Elimnando Cuenta',

        `Estás a punto de eliminar la cuenta ${formattedAccountName} de esta Identidad.`
    ],
    //2
    [KEYS.PROMPT_RemovingNetwork]:[
        'Eliminando Red',

        `Estás a punto de eliminar una Red. No serás capaz
         de crear nuevas cuentas en esta Red una vez que la elimines,
         pero nada te impide volver a agregarla. Cualquier cuenta
         que esté usando esta red no será modificada o eliminada.`
    ],
    //2
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'Estás a Punto de Incluir un Contrato de Divisas en la Lista Blanca',

        `Incluir contratos de divisas en la Lista Blanca es peligroso y nunca debería hacerse. Hay casos específicos en los que esto
         está bien, pero a menos que estés absolutamente seguro de que este es uno de ellos, no debes incluir en la lista blanca esta 
         acción del contrato. ¿Estás seguro de que todavía quieres incluir esto en la lista blanca?`
    ],
    //2
    [KEYS.PROMPT_SelectAccount]:[
        'Selecciona Cuenta',

        'Selecciona la cuenta y autoridad que deseas utilizar para esta Identidad. Solo puedes seleccionar una a la vez.'
    ],

    //3
    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'quiere agregar su red a tu Scatter.',

        'Algunas aplicaciones usan sus propias Redes.',

        `Esto de ninguna manera le da a la aplicación acceso a tu Scatter. 
         Agregar una red a través de esta interfaz simplemente te ahorra
         el esfuerzo de agregarla manualmente desde el panel de Configuración.`
    ],
    //5
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ 'está solicitando información adicional.',

        `A veces las aplicaciones piden más información, como
         tu correo electrónico o fecha de nacimiento. Las Identidades a la derecha 
         son las que tienes en la red con esas propiedades específicas disponibles.`,

        `Incluso si proporcionas una Identidad con propiedades que la
         la aplicación no solicita permisos, nunca serán capaz de
         verlas, o incluso saber que existen para esa Identidad.`,

        `Las únicas propiedades que siempre se proporcionan son la llave pública y el nombre de la Identidad.`,

        /*{DOMAIN}*/ `no está solicitando ninguna información adicional. Lo único que requieren es el hash y nombre de la Identidad.`
    ],
    //2
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `No tienes Identidades que coincidan con los campos requeridos por esta aplicación.`,

        `Si deseas utilizar una Identidad con este dominio, deberás actualizar esa Identidad y cumplir con los requisitos.
         Puedes ver lo que este dominio requiere en el panel izquierdo.`
    ],
    //4
    [KEYS.REQUEST_SignatureWhitelist]:[
        `¿Deseas incluir esta acción de contrato en la lista blanca?`,

        `Puedes incluir esta acción en la lista blanca para que la próxima vez no tengas que autorizarla manualmente.
         Cada propiedad que tenga un check al lado se volverá mutable, lo que significa que puedes permitir
         ciertas propiedades de esta transacción que cambien y solo si las otras propiedades se cambian
         fallará en incluirse en la lista blanca.`,

        `Esto incluye información personal requerida y los cambios a tu Identidad no eliminan los permisos.`,

        `Si tienes varias ubicaciones y una transacción requiere una ubicación, siempre se te preguntará.`
    ],
    //4
    [KEYS.REQUEST_ScatterIsLocked]:[
        `Tu Scatter está bloqueado!`,

        `Antes de que puedas hacer algo con tu Scatter necesitarás desbloquearlo.`,

        `A propósito, nunca mostraremos un mensaje/ventana emergente que requiera que inicies sesión.`,

        `Si ves un mensaje/ventana emergente que solicite tu contraseña, es un sitio web malicioso que intenta obtener tu contraseña.
         Desbloquea Scatter solamente desde la ventana emergente de la extensión, haciendo clic en el ícono en la bandeja de tu navegador.`
    ],
    //4
    [KEYS.REQUEST_UpdateVersion]:[
        `Tu Scatter está desactualizado!`,

        /*{DOMAIN}*/ `requiere que tengas una versión de Scatter más nueva que la instalada.`,
    
        `Esto generalmente significa que se lanzó una nueva funcionalidad y una aplicación está tratando de usarla,
         pero no está actualmente incluida en la versión que tienes instalada.`,

        `Ten en cuenta que dejamos la verificación de la versión a las aplicaciones mismas. Podrían intentar maliciosamente
         hacer que descargues algo. Asegúrate de siempre descargar Scatter desde la ubicación correcta.`
    ],

}