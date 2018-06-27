import * as KEYS from '../keys';
import * as AlertTypes from '../../models/alerts/AlertTypes';

export default {
    [KEYS.GENERIC_New]:`新しい`,
    [KEYS.GENERIC_Save]:`セーブ`,
    [KEYS.GENERIC_Ignored]:`キャンセルされた`,
    [KEYS.GENERIC_Identity]:`アイデンティティ`,
    [KEYS.GENERIC_Contract]:`コントラクト`,
    [KEYS.GENERIC_Action]:`アクション`,
    [KEYS.GENERIC_Removed]:`削除済み`,
    [KEYS.GENERIC_Name]:`名前`,
    [KEYS.GENERIC_Search]:`検索`,
    [KEYS.GENERIC_VerifyPassword_Header]:`パスワードを確認する`,
    [KEYS.GENERIC_VerifyPassword_Description]:`現在のパスワードを確認する必要があります`,
    [KEYS.GENERIC_Host]:'ホスト',
    [KEYS.GENERIC_Port]:'ポート',
    [KEYS.GENERIC_Requires]:'必要',
    [KEYS.GENERIC_RequiredProperties]:'情報を提供する必要がある',
    [KEYS.GENERIC_Import]:'インポート',
    [KEYS.GENERIC_ChainID]:'Chain ID',
    [KEYS.GENERIC_Blockchain]:'ブロックチェーン',
    [KEYS.GENERIC_Account]:'アカウント',

    [KEYS.PLACEHOLDER_Name]:'名称',
    [KEYS.PLACEHOLDER_PublicKey]:'公開鍵',
    [KEYS.PLACEHOLDER_PrivateKey]:'秘密鍵',
    [KEYS.PLACEHOLDER_FirstName]:'名',
    [KEYS.PLACEHOLDER_LastName]:'名字',
    [KEYS.PLACEHOLDER_Email]:'Eメール',
    [KEYS.PLACEHOLDER_BirthDate]:'お誕生日',
    [KEYS.PLACEHOLDER_LocationName]:'場所の名前',
    [KEYS.PLACEHOLDER_DefaultLocationName]:'自宅住所',
    [KEYS.PLACEHOLDER_Phone]:'携帯電話',
    [KEYS.PLACEHOLDER_Address]:'住所',
    [KEYS.PLACEHOLDER_City]:'市',
    [KEYS.PLACEHOLDER_Postal]:'郵便番号',
    [KEYS.PLACEHOLDER_Country]:'国',
    [KEYS.PLACEHOLDER_State]:'州',
    [KEYS.PLACEHOLDER_Password]:'パスワードを入力してください',
    [KEYS.PLACEHOLDER_ConfirmPassword]:'パスワードの確認',
    [KEYS.PLACEHOLDER_NewPassword]:'新しいパスワード',
    [KEYS.PLACEHOLDER_ConfirmNewPassword]:'新しいパスワードをもう一度入力してください',
    [KEYS.PLACEHOLDER_DomainOrIP]:'ドメイン名またはIPアドレス',

    [KEYS.BUTTON_CreateIdentity]:'アイデンティティの作成',
    [KEYS.BUTTON_ImportAccount]:'アカウントをインポートする',
    [KEYS.BUTTON_ImportKeychain]:'キーチェーンをインポートする',
    [KEYS.BUTTON_SelectFile]:'ファイルを選ぶ',
    [KEYS.BUTTON_AddNewLocation]:'新しい場所を追加',
    [KEYS.BUTTON_SetAsDefaultLocation]:'デフォルトの場所として設定',
    [KEYS.BUTTON_RemoveLocation]:'場所を削除',
    [KEYS.BUTTON_ChangePassword]:'パスワードを変更する',
    [KEYS.BUTTON_DestroyScatter]:'Scatterを削除する',
    [KEYS.BUTTON_CreateNewScatter]:'新しいScatterを作成する',
    [KEYS.BUTTON_LoadFromBackup]:'バックアップから復元する',
    [KEYS.BUTTON_Unlock]:'アンロック',
    [KEYS.BUTTON_ExportScatter]:'Scatterのエクスポート',
    [KEYS.BUTTON_GenerateKeyPair]:'生成密钥对',
    [KEYS.BUTTON_Validate]:'検証',
    [KEYS.BUTTON_Copy]:'コピー',
    [KEYS.BUTTON_ChangeLanguage]:'言語を変更する',
    [KEYS.BUTTON_Cancel]:'キャンセル',
    [KEYS.BUTTON_Accept]:'同意する',
    [KEYS.BUTTON_Deny]:'拒否する',
    [KEYS.BUTTON_Yes]:'Yes',
    [KEYS.BUTTON_No]:'No',
    [KEYS.BUTTON_UseSelectedAccount]:'選択したアカウントを使用する',
    [KEYS.BUTTON_SelectIdentity]:'アイデンティティの選択',
    [KEYS.BUTTON_ChangeName]:'名前を変更する',
    [KEYS.BUTTON_ClaimIdentity]:'アイデンティティを請求する',
    [KEYS.BUTTON_RegisterIdentity]:'アイデンティティ登録',


    [KEYS.MAINMENU_Identities]:'アイデンティティ',
    [KEYS.MAINMENU_Keys]:'キーペア',
    [KEYS.MAINMENU_Permissions]:'アクセス許可',
    [KEYS.MAINMENU_History]:'イベント',
    [KEYS.MAINMENU_Lock]:'ロック',

    [KEYS.IDENTITIES_Header]:`あなたはまだアイデンティティを確立していません。`,
    [KEYS.IDENTITIES_Description]:`
        アイデンティティは、名前、アドレス、および複数のブロックチェーンアカウント/キーのペアが含まれます。
        アイデンティティには、所有権を証明できる鍵ペアが含まれている、アプリケーションは秘密情報なしで検証できます.
    `,

    [KEYS.IDENTITY_DisablingHeader]:`無効にするもの`,
    [KEYS.IDENTITY_DisablingDescription]:`
        このアイデンティティを無効にすると、このアイデンティティを参照するアプリケーションで使用されなくなります。
        これは、このアイデンティティを永久に削除するのではなく、
        アプリケーションの権限を回復するのに使用することができます。
    `,

    [KEYS.IDENTITY_NameHeader]:`アイデンティティ名`,
    [KEYS.IDENTITY_NameDescription]:`
        アプリケーションは、すべてのネットワークで一意であるため、この名前をユーザー名として使用することを選択できます。
        RIDLに登録されていない場合は、ランダムな名前が割り当てられます。
    `,
    [KEYS.IDENTITY_NoKeyPairsHeader]:`キーペアはありません！`,
    [KEYS.IDENTITY_NoKeyPairsDescription]:`
        このアイデンティティにブロックチェーンアカウントを追加する前に、いくつかのキーペアを追加する必要があります。 メインメニューから次の項目を選択します：
    `,
    [KEYS.IDENTITY_AccountHeader]:`アカウント`,
    [KEYS.IDENTITY_AccountDescription]:`
        口座は資金を保持するものであり、ブロックチェーン上の契約とやりとりすることができます。
        アイデンティティとの関係では、あなたのパスポートに接続されている銀行口座のように思えますが、いつでも変更することができます。
    `,
    [KEYS.IDENTITY_PersonalHeader]:`個人情報`,
    [KEYS.IDENTITY_PersonalDescription]:`
        個人情報は、必要なアプリケーションのアカウントに追加することができます。 
        たとえば、購入した商品を誰に送るかを知るためには、ショッピングウェブサイトにあなたのフルネームが必要な場合があります。
    `,
    [KEYS.IDENTITY_LocationHeader]:`位置情報`,
    [KEYS.IDENTITY_LocationDescription]:`
        場所情報は、必要なアプリケーションのアカウントに追加することができます。
        たとえば、購入した商品をどこに送付するかを知るために、ショッピングウェブサイトで配送先住所が必要な場合があります。
     `,

    [KEYS.PERMISSIONS_Header]:`表示する権限がありません。`,
    [KEYS.PERMISSIONS_Description]:`
        アクセス許可は、使用するアプリケーションのアイデンティティを指定するか、承認アクションなしに契約アクションをホワイトリストに登録するときに設定されます。
    `,
    [KEYS.PERMISSION_RevokeIdentity]:`アイデンティティを失効させる`,
    [KEYS.PERMISSION_RevokeContract]:`コントラクトを取り消す`,
    [KEYS.PERMISSION_RevokeAction]:`アクションを取り消す`,

    [KEYS.HISTORIES_Header]:`履歴イベントはありません。`,
    [KEYS.HISTORIES_Description]:`
        いったんそれらを持っていれば、あなたはScatterを通過するすべてのイベントのリストを見ることができます。
        あなたが見ていないものは、散らばっていないあなたのアカウントで発生した出来事です。
     `,
    [KEYS.HISTORIES_Note]:`
        注意：設定パネルのバックアップオプションからスキャッタデータをエクスポートしても、これらのイベントは保存されません。
        そのScatterインスタンスを再度インポートすると、履歴が空になります。 
        将来履歴をエクスポートする場合は、このパネル内のナビゲーションバーのアクションボタンを使用して履歴をエクスポートすることができます。
    `,

    [KEYS.SETTINGSMENU_Networks]:'ネットワーク',
    [KEYS.SETTINGSMENU_Keypairs]:'キーペア',
    [KEYS.SETTINGSMENU_Language]:'言語',
    [KEYS.SETTINGSMENU_AutoLock]:'オートロック',
    [KEYS.SETTINGSMENU_Password]:'パスワード',
    [KEYS.SETTINGSMENU_Backup]:'バックアップ',
    [KEYS.SETTINGSMENU_Destroy]:'破壊する',

    [KEYS.BACKUP_Header]:`暗号化バックアップをエクスポート`,
    [KEYS.BACKUP_Description]:`
        スキャッタをエクスポートすると、他のデバイスにインポートすることができます。 
        ファイルはエクスポートされたときでも暗号化されますので、ニーモニックまたはパスワードのいずれかを持っていることを確認してください。
        そうしないと無駄になります。 
        アカウントからの秘密鍵もエクスポート前に削除されますが、エクスポートされたファイル内に残る唯一の秘密鍵はアイデンティティキーです。
    `,

    [KEYS.IMPORT_Header]:`暗号化バックアップをインポート`,
    [KEYS.IMPORT_Description]:`
        暗号化されたキーチェーンファイルをインポートすると、Scatterキーチェーンが再構築されますが、古いネットワークやアカウントはインポートされません。
    `,

    [KEYS.PASS_Header]:`新しいパスワードを入力`,
    [KEYS.PASS_Description]:`
        パスワードを変更すると、保存されたすべての情報が復号化され、通常は常に暗号化され、新しいパスワードのシードで再暗号化されます。
    `,

    [KEYS.NETWORK_Header]:`新しいネットワークを追加する`,
    [KEYS.NETWORK_Description]:`
        アプリケーションは通常特定のネットワーク上で動作しますが、すべてが同じネットワーク上で動作するわけではありません。 
        例えば、アプリケーションはまだリリースされていない新しい機能を持つテストネットワークを持つことができます。 
        そのネットワークと対話するためには、そこにアカウントを持っている必要があります。
    `,

    [KEYS.DESTROY_Header]:`Scatterを破壊する`,
    [KEYS.DESTROY_Description]:`
        あなたはScatterキーチェーン全体を破壊しようとしています。 
        このScatterを元に戻す唯一の方法は、エクスポートされたScatter JSONをインポートすることです。 
        そうでなければあなたのアイデンティティを主張することはできません。 
        事前にバックアップ設定パネルからスキャッタをエクスポートしたことを確認してください。
    `,

    [KEYS.LANGUAGE_Header]:`使う言語を選んでください`,

    [KEYS.KEYPAIRS_NoKeyPairsHeader]:`キーペアがありません。`,
    [KEYS.KEYPAIRS_NoKeyPairsDescription]:`
        キーペアを作成/インポートするには、右上のボタンをクリックします。
    `,

    [KEYS.KEYPAIR_Header]:`新しいキーペアを生成する`,
    [KEYS.KEYPAIR_Description]:`
        このパネルを使用してキーペアを生成することができます。 
        これらの鍵ペアは、マシン上でローカルに生成され、どこにも送信されません。 
        秘密鍵を貼り付けることもできます。公開鍵は自動的に生成されます。
    `,

    [KEYS.KEYPAIR_Important]:`秘密鍵は他の場所に保存してください！ Scatterから秘密鍵を戻すことはできません。`,
    [KEYS.KEYPAIR_Validation_Header]:`新しいキーペアを生成する`,
    [KEYS.KEYPAIR_Validation_Valid]:`秘密鍵は有効であり、そこから生成された公開鍵は提供された公開鍵と一致します。`,
    [KEYS.KEYPAIR_Validation_Invalid]:`秘密鍵から生成された公開鍵は、提供された公開鍵と一致しませんでした!`,


    [KEYS.LOCK_Header]:`自動ロックタイマー`,
    [KEYS.LOCK_Description]:`
        自動ロックはあなたのためにスキャターのロックを処理するので、
        離れたときにスキャッターをロックするのを忘れる必要はありません。
    `,
    [KEYS.LOCK_Minute]:`分`,
    [KEYS.LOCK_Minutes]:`分`,
    [KEYS.LOCK_Hour]:`時間`,
    [KEYS.LOCK_Hours]:`時間`,
    [KEYS.LOCK_NeverLock]:`決してロックしない`,


    [KEYS.MNEMONIC_Header]:`ニモニック`,
    [KEYS.MNEMONIC_Description]:`Scatterのニーモニックは、パスワードの回復にのみ使用されます。`,
    [KEYS.MNEMONIC_Note]:`
        安全な場所に保管してください。 
        これは、パスワードを忘れた場合には、Scatterへのアクセスを回復し、個人情報を復号化する唯一の方法です。
    `,

    [KEYS.ERROR_MustSelectItem]:`アイテムを選択する必要があります。`,

    [KEYS.ALERT_Type]:(type) => {
        switch(type){
            case AlertTypes.Error:              return 'エラー';
            case AlertTypes.Prompt:             return 'プロンプト';
            case AlertTypes.SelectAccount:      return 'アカウントを選択';
        }
    },

    //2
    [KEYS.ALERT_BadIdentityName]:[
        'エラーのアイデンティティ名',

        `アイデンティティ名の長さは3〜20文字でなければなりません。
        また、英数字である必要がありますが、スペース、ダッシュ、およびアンダースコアを含むこともあります。`
    ],
    //2
    [KEYS.ALERT_IdentityNameExists]:[
        'アイデンティティ名が存在する',

        'このアイデンティティ名は別のアイデンティティに登録されます。'
    ],
    //2
    [KEYS.ALERT_NoSuchIdentityName]:[
        'そのアイデンティティがありません',

        'このアイデンティティはRIDLに予約されていません。'
    ],
    //2
    [KEYS.ALERT_KeyPairExists]:[
        'キーペアが存在する',

        'このキーペアは既にキーチェーンに登録されています。'
    ],
    //2
    [KEYS.ALERT_BadKeyPairName]:[
        'エーラのキーペア名',

        'キーペアの名前は一意にする必要があります。'
    ],
    //2
    [KEYS.ALERT_InvalidPrivateKey]:[
        '秘密鍵が無効です',

        `入力した秘密鍵は無効と思われます。 キーを確認してもう一度お試しください。`
    ],
    //2
    [KEYS.ALERT_NoAccountsFound]:[
        'アカウントが見つかりません',

        `この秘密/公開鍵に接続されているアカウントは見つかりませんでした。 ENUネットワークにこの公開鍵にリンクされているENUアカウントがあることを確認してください。`
    ],
    //2
    [KEYS.ALERT_PasswordsDoNotMatch]:[
        'パスワードが一致していません',

        `入力したパスワードと確認のパスワードが一致しません。`
    ],
    //2
    [KEYS.ALERT_BadPassword]:[
        '無効なパスワード',

        'パスワードは8文字以上でなければなりません'
    ],
    //2
    [KEYS.ALERT_WrongPassword]:[
        '間違ったパスワード',

        '入力したパスワードが正しくありません。'
    ],
    //2
    [KEYS.ALERT_NetworkHostInvalid]:[
        'ネットワークホストが無効です',

        `入力したネットワークホストが無効です。 ホストはドメイン名
        （例：testnet.enu）またはIP（例：192.168.0.1）を入力します。`
    ],
    //2
    [KEYS.ALERT_NetworkExists]:[
        '既にネットワークが存在する',

        'このホストとポートを持つ別のネットワークがすでに存在しています。 ネットワークを2回保存する必要はありません。'
    ],
    //2
    [KEYS.ALERT_RemovingEndorsedNetwork]:[
        '承認されたネットワークを削除できません',

        `Scatterの承認済みネットワークは削除できません。`
    ],
    //2
    [KEYS.ALERT_NoIdentityWithProperties]:fields => [
        'アイデンティティは見つかりませんでした',

        `このアプリケーションは、持っていないプロパティを持つアイデンティティを要求しています。 彼らが望むプロパティは： '${fields.join(', ')}'です。`
    ],
    //2
    [KEYS.ALERT_YouMustSelectAnIdentity]:[
        'アイデンティティを選択する必要があります',

        `アイデンティティを公開しない場合は、拒否ボタンを押すことができます。
        それ以外の場合は、この要求を受け入れるためにアイデンティティを選択する必要があります。`
    ],
    //2
    [KEYS.PROMPT_DestroyingScatter]:[
        'Scatterを破壊する',

        'あなたのバックアップを再確認する最後のチャンスです。'
    ],
    //2
    [KEYS.PROMPT_RevokingIdentity]:domain => [
        'アイデンティティを削除する',

        `${domain} からアイデンティティ全体を取り消そうとしています。 
        これにより、アイデンティティ自体とその中のすべてのコントラクトに対する権限が削除されます。`
    ],
    //2
    [KEYS.PROMPT_RevokingContract]:domain => [
        'コントラクトを解除する',

        `${domain} からすべてのコントラクトを取り消そうとしています。 
        これにより、その中のすべてのアクションに対する権限が削除されます。`
    ],
    //2
    [KEYS.PROMPT_RevokingContractAction]:domain => [
        'コントラクトのアクションを取り消し',

        `${domain} からアクションを取り消そうとしています。`
    ],
    //2
    [KEYS.PROMPT_RemovingIdentity]:name => [
        'アイデンティティの削除',

        `'${name}' という名前のアイデンティティを削除しようとしています。 アイデンティティの削除は元に戻せず、すべての権限が削除されます。 
        アイデンティティがアプリケーションで使用されている場合は、代わりにそれを無効にするだけです。`
    ],
    //2
    [KEYS.PROMPT_DeletingKeyPair]:identities => [
        'キーペアの削除',

        identities.length ? `このキーペアは '${identities.join('、 ')}'` : `このキーペアで使用されます。`
    ],
    //2
    [KEYS.PROMPT_RemovingAccount]:formattedAccountName => [
        'アカウントの削除',

        `このアイデンティティから ${formattedAccountName} アカウントを削除しようとしています。`
    ],
    //2
    [KEYS.PROMPT_RemovingNetwork]:[
        'ネットワークの削除',

        `あなたはネットワークを削除しようとしています。 
        一度削除すると、このネットワーク上に新しいアカウントを作成することはできませんが、再追加ができなくなります。 
        既にこのネットワークを使用しているアカウントは、変更または削除されません。`
    ],
    //2
    [KEYS.PROMPT_WhitelistingContractAction]:[
        'あなたは通貨コントラクトをホワイトリストに入れようとしている',

        `ホワイトリストに登録された通貨ベースの契約は危険であり、決して行われるべきではありません。 
        これが問題ではない特定のケースがありますが、これが絶対的なものであると確信している場合を除き、この契約アクションをホワイトリストに載せるべきではありません。 
        あなたはまだこれをホワイトリストに載せたいですか？`
    ],
    //2
    [KEYS.PROMPT_SelectAccount]:[
        'アカウントを選択',

        'このアイデンティティに使用するアカウントと権限を選択します。 一度に1つしか選択できません。 ほとんどの場合、@active アカウントを選択する必要があります'
    ],
    //2
    [KEYS.PROMPT_ClaimIdentity]:[
        'アイデンティティを要求する',

        'あなたのアイデンティティ名のファイルにある公開鍵と一致する秘密鍵を入れます。'
    ],

    //3
    [KEYS.REQUEST_AddNetwork]:[
        /*{DOMAIN}*/ '自分のネットワークをScatterに追加したいと考えています。',

        '一部のアプリケーションでは、独自のネットワークを使用します。',

        `これは決してアプリケーションにあなたのScatterへのアクセスを与えません。
        このインターフェイスでネットワークを追加するだけで、[設定]パネルから手動で追加する手間が省けます。`
    ],
    //5
    [KEYS.REQUEST_Identity]:[
        /*{DOMAIN}*/ '追加情報を要求しています。',

        `アプリケーションによっては、メールや生年月日などの情報が必要になることがあります。 
        右側のアイデンティティは、利用可能な特定のプロパティを使用してネットワーク上で所有しているものです。`,

        `たとえアプリケーションがアクセス権を要求していないプロパティをアイデンティティに提供しても、
        アプリケーションはそのアイデンティティを見ることはできず、
        そのアイデンティティの存在を知ることさえできません。...`,

        `常に提供される唯一のプロパティは、アイデンティティの公開鍵とその名前です。`,

        /*{DOMAIN}*/ `追加情報を要求していません。 彼らが必要としているのはアイデンティティのハッシュと名前だけです。`
    ],
    //2
    [KEYS.REQUEST_IdentityNoIdentities]:[
        `このアプリケーションに必要なプロパティと一致するアイデンティティはありません。`,

        `このドメインでアイデンティティを使用する場合は、そのアイデンティティを更新して要件を満たす必要があります。
        左側のパネルには、このドメインに必要なものが表示されます。`
    ],
    //4
    [KEYS.REQUEST_SignatureWhitelist]:[
        `このコントラクトのアクションをホワイトリストに登録しますか？`,

        `この操作をホワイトリストに登録して、次回に手動で承認する必要がなくなります。
        その横にチェックがあるすべてのプロパティは変更可能になります。
        つまり、このトランザクションの特定のプロパティを変更できるようにし、他のプロパティが変更された場合にのみホワイトリストに登録できません。`,

        `これには必要な個人情報が含まれ、アイデンティティの変更によって権限が削除されません。`,

        `複数の場所があり、トランザクションに場所が必要な場合は、常にプロンプトが表示されます。`
    ],
    //4
    [KEYS.REQUEST_ScatterIsLocked]:[
        `あなたのScatterはロックされています！`,

        `Scatterで何かをするには、ロックを解除する必要があります。`,

        `私たちは故意にログインする必要があるプロンプト/ポップアップを表示しません。`,

        `パスワードを要求しているプロンプト/ポップアップが表示された場合は、パスワードを取得しようとしている悪意のあるWebサイトです。
        拡張機能のポップアップからScatterをアンロックするには、ブラウザトレイのアイコンをクリックします。`
    ],
    //4
    [KEYS.REQUEST_UpdateVersion]:[
        `あなたのScatterは時代遅れです！`,

        /*{DOMAIN}*/ `インストールされているバージョンよりも新しいバージョンのScatterが必要です。`,

        `これは、通常、新しい機能がリリースされ、アプリケーションがその機能を使用しようとしているが、現在インストールしているビルドには含まれていないことを意味します。`,

        `バージョンのチェックはアプリケーション自体に任せています。 彼らは悪意を持って何かをダウンロードさせようとしている可能性があります。 適切な場所からScatterをダウンロードするようにしてください。`
    ],

}
