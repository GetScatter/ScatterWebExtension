import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`Nova`,
    [KEYS.GENERIC_Save]:`Salvar`,
    [KEYS.GENERIC_Ignored]:`Ignorado`,
    [KEYS.GENERIC_Identity]:`Identidade`,
    [KEYS.GENERIC_Contract]:`Contrato`,
    [KEYS.GENERIC_Action]:`Ação`,
    [KEYS.GENERIC_Removed]:`Removido`,
    [KEYS.GENERIC_Name]:`Nome`,
    [KEYS.GENERIC_Search]:`Pesquisar`,
    [KEYS.GENERIC_VerifyPassword_Header]:`Verifique Sua Senha`,
    [KEYS.GENERIC_VerifyPassword_Description]:`Você precisa verificar sua senha atual antes de fazer isso.`,
    [KEYS.GENERIC_Host]:'Host',
    [KEYS.GENERIC_Port]:'Porta',
    [KEYS.GENERIC_Requires]:'Requer',
    [KEYS.GENERIC_RequiredProperties]:'Propriedades Requeridas',

    [KEYS.PLACEHOLDER_Name]:'Nome',
    [KEYS.PLACEHOLDER_PublicKey]:'Chave Pública',
    [KEYS.PLACEHOLDER_PrivateKey]:'Chave Privada',
    [KEYS.PLACEHOLDER_FirstName]:'Nome',
    [KEYS.PLACEHOLDER_LastName]:'Sobrenome',
    [KEYS.PLACEHOLDER_Email]:'Email',
    [KEYS.PLACEHOLDER_BirthDate]:'Data de Nascimento',
    [KEYS.PLACEHOLDER_LocationName]:'Nome da Localização',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'Casa',
    [KEYS.PLACEHOLDER_Phone]:'Telefone',
    [KEYS.PLACEHOLDER_Address]:'Endereço',
    [KEYS.PLACEHOLDER_City]:'Cidade',
    [KEYS.PLACEHOLDER_Postal]:'Cep',
    [KEYS.PLACEHOLDER_Country]:'País',
    [KEYS.PLACEHOLDER_State]:'Estado',
    [KEYS.PLACEHOLDER_Password]:'Senha',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'Confirme a Senha',
    [KEYS.PLACEHOLDER_NewPassword]:'Nova Senha',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'Confime Nova Senha',
    [KEYS.PLACEHOLDER_DomainOrIP]:'Domínio ou IP',
    [KEYS.GENERIC_Import]:'Importar',

    [KEYS.BUTTON_CreateIdentity]:'Criar Identidade',
    [KEYS.BUTTON_ImportAccount]:'Importar Conta',
    [KEYS.BUTTON_AddNewLocation]:'Adicionar Nova Localização',
    [KEYS.BUTTON_SetAsDefaultLocation]:'Marcar Como Localização Padrão',
    [KEYS.BUTTON_RemoveLocation]:'Remover Localização',
    [KEYS.BUTTON_ChangePassword]:'Alterar Senha',
    [KEYS.BUTTON_DestroyScatter]:'Remover Scatter',
    [KEYS.BUTTON_CreateNewScatter]:'Criar Novo Scatter',
    [KEYS.BUTTON_LoadFromBackup]:'Carregar Do Backup',
    [KEYS.BUTTON_Unlock]:'Desbloquear',
    [KEYS.BUTTON_ExportScatter]:'Exportar Scatter',
    [KEYS.BUTTON_GenerateKeyPair]:'Gerar Novo Par de Chaves',
    [KEYS.BUTTON_Validate]:'Validar',
    [KEYS.BUTTON_Copy]:'Copiar',
    [KEYS.BUTTON_ChangeLanguage]:'Alterar Língua',
    [KEYS.BUTTON_Cancel]:'Cancelar',
    [KEYS.BUTTON_Accept]:'Aceitar',
    [KEYS.BUTTON_Deny]:'Negar',
    [KEYS.BUTTON_Yes]:'Sim',
    [KEYS.BUTTON_No]:'Não',
    [KEYS.BUTTON_UseSelectedAccount]:'Usar Conta Selecionada',
    [KEYS.BUTTON_SelectIdentity]:'Selecionar Identidade',

    [KEYS.MAINMENU_Identities]:'Identidades',
    [KEYS.MAINMENU_Permissions]:'Permissões',
    [KEYS.MAINMENU_History]:'Histórico',
    [KEYS.MAINMENU_Lock]:'Bloquear',

    [KEYS.IDENTITIES_Header]:`Você ainda não tem nenhuma Identidade.`,
    [KEYS.IDENTITIES_Description]:`
        As Identidades são onde armazenamos informações pessoais, como nome, sobrenome, endereços e
        várias contas blockchain/pares de chaves. Identidades também têm pares de chaves e sua propriedade
        pode ser comprovada, o que os torna uma maneira de autenticar em aplicativos sem precisar digitar senhas.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`O que a Desativação faz?`,
    [KEYS.IDENTITY_DisablingDescription]:`
        Desabilitar essa Identidade impedirá que ela seja usada em aplicativos que tenham uma referência a ela.
        Isso pode ser usado em vez de excluir permanentemente essa identidade ou suas permissões em um aplicativo,
        o que seria mais difícil de recuperar.
    `,

    [KEYS.IDENTITY_NameHeader]:`Nome da Identidade`,
    [KEYS.IDENTITY_NameDescription]:`
        Aplicações podem optar por usar esse nome como seu nome de usuário, pois ele é único em todas as redes.
        Se você não está registrado no RIDL, receberá um nome aleatório.
    `,
    [KEYS.IDENTITY_AccountHeader]:`Conta`,
    [KEYS.IDENTITY_AccountDescription]:`
        Contas são o que mantêm seus fundos e permitem que você interaja com contratos no Blockchain.
        Em relação às Identidades, pense nelas como as contas bancárias conectadas ao seu passaporte, elas podem
        ser alteradas a qualquer momento.
    `,
    [KEYS.IDENTITY_PersonalHeader]:`Informações Pessoais`,
    [KEYS.IDENTITY_PersonalDescription]:`
        Informações pessoais podem ser adicionadas a uma conta para aplicativos que exigem isso. Por exemplo, o site
        de uma loja pode precisar do seu nome completo para saber para quem enviar os itens adquiridos.
    `,
    [KEYS.IDENTITY_LocationHeader]:`Informações de Localização`,
    [KEYS.IDENTITY_LocationDescription]:`
        As informações de localização podem ser adicionadas a uma conta para aplicativos que exigem isso.
        Por exemplo, um site de compras pode precisar do endereço de envio para saber para onde enviar
        seus bens adquiridos.
    `,

    [KEYS.PERMISSIONS_Header]:`Você não tem permissões para exibir.`,
    [KEYS.PERMISSIONS_Description]:`
        As permissões são definidas quando você fornece uma Identidade para utilizar um aplicativo ou quando você
        adiciona uma ação de um contrato na whitelist para ser assinada sem prompts de autorização.
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`Revogar Identidade`,
    [KEYS.PERMISSION_RevokeContract]:`Revogar Contrato`,
    [KEYS.PERMISSION_RevokeAction]:`Revogar Ação`,

    [KEYS.HISTORIES_Header]:`Você não tem nenhum evento no histórico para exibir.`,
    [KEYS.HISTORIES_Description]:`
        Depois de tê-los, você poderá ver uma lista de todos os eventos que passam pelo seu Scatter.
        O que você não verá é eventos que ocorreram em suas contas fora do Scatter.
     `,
    [KEYS.HISTORIES_Note]:`
        Nota: Exportar seus dados do Scatter através da opção de backup no painel de configurações não salva esses eventos.
        Quando você importar seus dados do Scatter novamente, seus históricos ficarão vazios. Se você gostaria de exportar seus históricos
        no futuro, você pode fazer isso usando os botões de ação na barra de navegação desse painel.
    `,

    [KEYS.SETTINGSMENU_Networks]:'Redes',
    [KEYS.SETTINGSMENU_Keypairs]:'Pares de Chave',
    [KEYS.SETTINGSMENU_Language]:'Língua',
    [KEYS.SETTINGSMENU_AutoLock]:'Bloqueio Automático',
    [KEYS.SETTINGSMENU_Password]:'Senha',
    [KEYS.SETTINGSMENU_Backup]:'Backup',
    [KEYS.SETTINGSMENU_Destroy]:'Remover',

    [KEYS.BACKUP_Header]:`Exportar backup criptografado`,
    [KEYS.BACKUP_Description]:`
        Exportar seu Scatter permite que você o importe em outros dispositivos. O arquivo ainda será criptografado quando for
        exportado, certifique-se de ter seu mnemônico ou sua senha, caso contrário, será inútil. As chaves privadas
        de suas contas também serão removidas antes da exportação, as únicas chaves privadas que permanecerão dentro do arquivo
        exportado será suas chaves de Identidade.
    `,

    [KEYS.PASS_Header]:`Insira uma nova senha`,
    [KEYS.PASS_Description]:`
        Ao alterar sua senha, você estará descriptografando todas as informações salvas, o que geralmente é sempre
        criptografado e, em seguida, criptografando-as novamente com uma seed da nova senha.
    `,

    [KEYS.NETWORK_Header]:`Adicionar nova rede`,
    [KEYS.NETWORK_Description]:`
        Os aplicativos geralmente são executados em uma rede específica, mas nem todos podem ser executados
        na mesma rede. Por exemplo, um aplicativo pode ter uma rede de teste
        que tem novos recursos que ainda não foram liberados. Para interagir com
        essa rede você precisará ter uma conta lá também.
    `,

    [KEYS.DESTROY_Header]:`Destruindo o Scatter`,
    [KEYS.DESTROY_Description]:`
        Você está prestes a destruir todo o seu chaveiro Scatter. A única maneira de recuperar exatamente esse Scatter será
        importando um JSON exportado pelo Scatter anteriormente. Você não poderá reivindicar suas identidades de outra forma.
        Assegure-se de que você tenha exportado seu Scatter do painel de configurações de backup antes de continuar
    `,

    [KEYS.LANGUAGE_Header]:`Selecione sua língua`,

    [KEYS.KEYPAIR_Header]:`Gerar novo Par de Chaves`,
    [KEYS.KEYPAIR_Description]:`
        Você pode usar este painel para gerar pares de chaves EOS. Estes pares de chaves são gerados localmente na sua máquina
        e nunca são enviados em qualquer lugar. Você também pode colar um par de chaves e verificar se a chave privada corresponde à chave
        pública. Observe que essas chaves são geradas usando a entropia coletada do seu computador e não a partir de qualquer outra seed específica.
    `,
    [KEYS.KEYPAIR_Validation_Header]:`Gerar novo Par de Chaves`,
    [KEYS.KEYPAIR_Validation_Valid]:`A chave privada é válida e a chave pública gerada a partir dela corresponde à chave pública fornecida.`,
    [KEYS.KEYPAIR_Validation_Invalid]:`A chave pública gerada a partir da chave privada não corresponde à chave pública fornecida!`,


    [KEYS.LOCK_Header]:`Temporizador de bloqueio automático`,
    [KEYS.LOCK_Description]:`
        O Bloqueio Automático lida com o bloqueio do Scatter para que você não precise
        se lembrar de bloquear seu Scatter quando você se afastar do computador.
    `,
    [KEYS.LOCK_Minute]:`Minuto`,
    [KEYS.LOCK_Minutes]:`Minutos`,
    [KEYS.LOCK_Hour]:`Hora`,
    [KEYS.LOCK_Hours]:`Horas`,
    [KEYS.LOCK_NeverLock]:`Nunca Bloquear`,


    [KEYS.MNEMONIC_Header]:`Mnemonic`,
    [KEYS.MNEMONIC_Description]:`Mnemônicos são um conjunto de palavras que se traduzem em uma seed criptográfica.`,
    [KEYS.MNEMONIC_Note]:`
        Certifique-se de salvar o seu em algum lugar seguro. É a única maneira de recuperar o acesso ao seu
        Scatter e descriptografar suas informações privadas se você esquecer sua senha.
    `,

    [KEYS.ERROR_MustSelectItem]:`Você deve selecionar um item.`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'Erro';
            case AlertTypes.Prompt:             return 'Prompt';
            case AlertTypes.SelectAccount:      return 'Selecione uma Conta';
        }
    },

    [KEYS.ALERT_BadIdentityName]:[
        'Nome de Identidade inválido',

        `Os nomes de Identidade devem ter entre 3 e 20 caracteres.
         Eles também devem ser alfanuméricos, podem conter espaços, traços e sublinhados.`
    ],
    [KEYS.ALERT_IdentityNameExists]:[
        'Nome de Identidade Já Existe',

        'Este nome de Identidade ja foi registrado para outra Identidade.'
    ],
    [KEYS.ALERT_InvalidPrivateKey]:[
        'Chave Privada Inválida',

        `A chave privada digitada parece ser inválida. Por favor, verifique a chave e tente novamente.`
    ],
    [KEYS.ALERT_NoAccountsFound]:[
        'Conta Não Encontrada',

        `Nenhuma conta foi encontrada conectada a essa chave privada.
         Se você quiser importar uma chave que não seja gerada pelo
         Scatter, você precisará criar uma conta para a chave
         antes de importá-la.`
    ],
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'Senhas Não Conferem',

        `A senha que você digitou não corresponde à sua confirmação.`
    ],
    [KEYS.ALERT_BadPassword]:[
        'Senha Inválida',

        'As senhas devem ter no mínimo 8 caracteres'
    ],
    [KEYS.ALERT_WrongPassword]:[
        'Senha Incorreta',

        'A senha digitada estava incorreta.'
    ],
    [KEYS.ALERT_NetworkHostInvalid]:[
        'Host De Rede Inválido',

        `O host da rede que você inseriu era inválido. Os hosts devem ser um nome de domínio
         ( ex: testnet.eos.io ) ou um IP ( ex: 192.168.0.1 ).`
    ],
    [KEYS.ALERT_NetworkExists]:[
        'Rede Já Existe',

        'Outra rede com este host e porta já existe. Não há razão para ter uma rede salva duas vezes.'
    ],
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        'Impossível Remover Rede Endossada',

        `Você não pode remover a rede endossada do Scatter. Usamos essa rede para hospedar nossos contratos.`
    ],
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'Identidade Não Encontrada',

        `Este aplicativo está solicitando uma Identidade com propriedades que você não possui. As propriedades solicitades são '${fields.join(', ')}'`
    ],
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'Você Deve Selecionar Uma Identidade',

        `Se você não deseja expor uma Identidade, pressione o botão Negar, caso contrário, uma Identidade deve ser
         selecionada para aceitar este pedido.`
    ],

    [KEYS.PROMPT_DestroyingScatter]:[
        'Destruindo Scatter',

        'Esta é sua última chance de verificar novamente seus backups.'
    ],
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'Revogando Identidade',

        `Você está prestes a revogar uma Identidade inteira de ${domain}. Isso removerá
         permissões na Identidade e em todos os contratos dentro dela.`
    ],
    [KEYS.PROMPT_RevokingContract]:domain => [
        'Revogando Contrato',

        `Você está prestes a revogar um contrato inteiro de ${domain}. Isso removerá as permissões de todas as ações dentro dele.`
    ],
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'Revogando Ação De Contrato',

        `Você está prestes a revogar uma ação de ${domain}`
    ],
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'Removendo Identidade',

        `Você está prestes a remover uma Identidade com o nome '${name}'. Remover Identidades não é reversível e
         todas as permissões serão removidadas. Se a Identidade estiver sendo usada em aplicativos, talvez você deva desativá-la.`
    ],
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'Removendo Conta',

        `Você está prestes a remover a conta ${formattedAccountName} desta Identidade.`
    ],
    [KEYS.PROMPT_RemovingNetwork]:[
        'Removendo Rede',

        `Você está prestes a excluir uma Rede. Você não será capaz
         de criar novas contas nesta Rede após excluí-la, mas nada
         impede de você adicioná-la de volta. Quaisquer contas já
         usando esta Rede não serão modificadas ou removidas.`
    ],
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'Você Está Prestes A Adicionar Um Contrato Currency Na Whitelist',

        `Adiciona um contrado currency na sua whitelist é perigoso e nunca deve ser feito. Existem casos específicos em que fazer isso é ok
         mas, a menos que você tenha certeza absoluta de que este é um deles, você não deve adicionar a ação deste contrato na sua whitelist.
         Tem certeza que você ainda deseja adicionar isso na sua whitelist?`
    ],
    [KEYS.PROMPT_SelectAccount]:[
        'Selecione Uma Conta',

        'Selecione a conta e autoridade que você deseja usar para essa Identidade. Você só pode selecionar um de cada vez.'
    ],


    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ 'quer adicionar sua rede ao seu Scatter.',

        'Alguns aplicativos usam suas próprias redes.',

        `Isso não dá ao aplicativo qualquer acesso ao seu Scatter.
         Adicionar uma rede através desta interface simplesmente poupa
         o esforço de adicioná-la manualmente a partir do painel Configurações.`

    ],
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ 'está solicitando informações adicionais.',

        `Às vezes, os aplicativos pedem mais informações, como
         seu email ou data de nascimento. As Identidades à direita são aquelas que você possui
         na rede com essas propriedades específicas disponíveis.`,

        `Mesmo se você fornecer uma Identidade com propriedades que o
         aplicativo não está solicitando permissões, ele nunca
         será capaz de vê-las, ou até mesmo saber que elas existem nessa Identidade.`,

        `As únicas propriedades que são sempre fornecidas são a chave pública da identidade e seu nome.`,

        `não está solicitando nenhuma informação adicional. A única coisa que eles estão exigindo é um hash da Identidade e nome.`
    ],
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `Você não tem nenhuma Identidade que corresponda aos campos que esse aplicativo exige.`,

        `Se você gostaria de usar uma Identidade com este domínio, você precisará atualizar essa identidade e cumprir os requisitos.
         Você pode ver o que este domínio está exigindo no painel esquerdo.`
    ],
    [KEYS.REQUEST_SignatureWhitelist]:[
        `Deseja adicionar esta ação deste contrato na sua whitelist?`,

        `Você pode colocar essa ação na sua whitelist para que, da próxima vez, não precise autorizá-la manualmente.
        Toda propriedade que tenha um check próximo a ela se tornará mutável, o que significa que você pode permitir
        que certas propriedades desta transação sejam alteraradas e se as outras propriedades forem alteradas
        isso não será colocado na sua whitelist.`,

        `Isso inclui informações pessoais obrigatórias. Alterações em sua Identidade não removem permissões.`,

        `Se você tiver várias localizações e uma transação exigir uma localização, você sempre será solicitado.`
    ],
    [KEYS.REQUEST_ScatterIsLocked]:[
        `Seu Scatter está bloqueado!`,

        `Antes de fazer qualquer coisa com o seu Scatter, você deve desbloqueá-lo.`,

        `Nós propositadamente nunca mostramos um prompt/popup que requer que você faça login.`,

        `Se você ver um prompt/popup que solicitando sua senha, é um site malicioso tentando obter sua senha.
         Somente desbloqueie o Scatter a partir do popup da extensão, clicando no ícone na bandeja do seu navegador.`
    ],
    [KEYS.REQUEST_UpdateVersion]:[
        `Seu Scatter está desatualizado!`,

        /*{DOMAIN}*/ `está exigindo que você tenha uma versão do Scatter mais recente que a instalada.`,

        `Isso geralmente significa que uma nova funcionalidade foi lançada e um aplicativo está tentando usá-la,
         mas ela não está incluída na versão que você tem instalada.`,

        `Por favor, note que deixamos a verificação de versão a cargo das próprias aplicações. Eles podem, maliciosamente
         tentar fazer você baixar algo. Certifique-se de sempre baixar o Scatter do local apropriado.`
    ],

}
