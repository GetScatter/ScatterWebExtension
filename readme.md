# Scatter

Scatter is a browser extension that allows you to sign transactions on the EOS blockchain using your private keys
from web applications without ever exposing your keys and provide personal information easily and only when you want to.

## Table of Contents

- [Installing Scatter](https://github.com/EOSEssentials/Scatter#installation)
- [Interacting With Scatter](https://github.com/EOSEssentials/Scatter#interacting-with-scatter)
- [Translations and Localization](https://github.com/EOSEssentials/Scatter#translations-and-localization)
- [Understanding Scatter's Security](https://github.com/EOSEssentials/Scatter#security)
- [Contributing to Scatter](https://github.com/EOSEssentials/Scatter#contributing)




## Installation


#### Getting the Chrome Extension files

**From Chrome Store**
- [Go to Chrome Store](https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle)

**From The Repository** 
* Clone repository
* `npm install` to get dependencies
* copy the `.env.example` file to `.env`
* `npm start` to compile a `build` folder.


#### Installing a dev build into Chrome
* Open up **Chrome** and type `chrome://extensions/` into the url bar
* Click the `Load unpacked extension...` button and point it at the folder you just created/built 
(_the folder should have a manifest.json inside of it_).
![1](https://github.com/nsjames/Scatter/raw/master/chrome_ext.jpg)
![2](https://github.com/nsjames/Scatter/raw/master/chrome_ext2.jpg)



## Interacting with Scatter

 
#### Catching browsers with Scatter installed

```js
document.addEventListener('scatterLoaded', scatterExtension => {
    // Scatter will now be available from the window scope.
    // At this stage the connection to Scatter from the application is 
    // already encrypted. 
    const scatter = window.scatter;
    
    // It is good practice to take this off the window once you have 
    // a reference to it.
    window.scatter = null;
     
    // If you want to require a specific version of Scatter
    scatter.requireVersion(3.0);
    
    //...
})
```

#### Using Scatter with [eosjs](https://github.com/EOSIO/eosjs)

All user signature requests will flow through Scatter.

```js
// Set up the network and options you want to use eosjs and Scatter with. 
const network = { host:"192.168.56.101", port:8888 };
const eosOptions = {};
 
// Get a reference to an 'Eos.Localnet' with a Scatter signature provider.
const eos = scatter.eos( Eos.Localnet, network, eosOptions );
```


#### Requesting an Identity

In order to do anything with a user's Scatter you will need to request an Identity.
Once an Identity is provided it will not need to be re-approved every time unless the user removes the permission.

```js
// You can require certain fields
scatter.getIdentity(['account']).then(identity => {
    //...
}).catch(error => {
    //...
});
```

The identity can also be accessed on `scatter.identity` so that you don't have to keep a reference to it.

**Note:** Every time an identity is returned you should check it against your cache of their identity. Properties are subject 
to change without notification to applications. Users have complete control over their own data. Do not rely on stale data for 
sensitive things like shipping physical items.


##### Requireable fields
- **account** ( needs to be required for signature requests )
- firstname
- lastname
- email
- birthdate
- phone
- address
- city
- state
- country
- zipcode

##### Fields that always return
- name
- publicKey


#### Authenticating an Identity

Identities can be authenticated using asymmetric encryption.
If the `authenticate` method does not throw an error then the identity has been authenticated.
```js

// Authenticate takes no parameters. 
// It will fail if there is no identity bound to Scatter.
scatter.authenticate()
    .then(sig => {
        // This will return your `location.host` 
        // signed with their Identity's private key.
        // It has already been validated, but you can validate it yourself as well using eosjs-ecc.
        
        ecc.verify(sig, location.host, scatter.identity.publicKey);
    })
    .catch(err => console.log('auth err', err))
```


#### Forgetting an Identity ( Sign out )

To sign out a user you will be removing the permission in place for your domain to use an identity.
All sub-permissions such as contract and action whitelistings will be left in place and be available the next time the user 
authenticates with your website.

```js
scatter.forgetIdentity().then(() => {
    //...
});
```

Users can also do this without you providing a way for them to do so from their own permissions panel.


#### Requesting a Signature using eosjs

Using Scatter is no different than using `eosjs`.
```js
eos.transfer(scatter.identity.account.name, 'youraccount', '100.0000 EOS', '').then(transaction => {
    //...
});
```

However, you can optionally pass in required fields to the eosjs options if you want it to give you back 
certain user-selected Identity properties such as an address. 

**Do not rely on previously acquired Identity 
properties, since users might have multiple locations such as Work and Home, and they might have changed other properties 
since the last time you cached them.**

```js
const requiredFields = ['address', 'country', 'phone'];
eos.transfer(scatter.identity.account.name, 'youraccount', '100.0000 EOS', '', {requiredFields}).then(transaction => {
    //...
}).catch(error => { 
    //.. 
});
```

The resulting json will include the required fields along with the normal eosjs json if the signing was successful. 

```js
// transaction result
{
    ...
    returnedFields: {
        address: '420 Paper St. Wilmington DE 19886',
        country: { code:'US', name:'United States' },
        phone: 5555555
    }
}
```
This allows you to request all information needed for a physical sale with one click.

_For instance in this case we could be a shopping website that needs shipping details along with 
the transfer of digital currency._

When using the `contract()` method from eosjs you need to put the requirements into the `contract` method and not the 
action as requirements should fulfill any and all actions within; including multiple atomic transactions and not just per action.
```js
eos.contract('eosio.token', {requiredFields}).then(contract => contract.action...)
```


#### Multi-part signatures involving the application AND the identity

You may also double-sign signatures using a private key from the application as well as one supplied by 
the user.

```js
const signProvider = (buf, sign) => {
    // You should validate the `buf` before signing it.
    // If you do not you could be signing anything from a malicious Scatter mimic
    
    // Use the provided eosjs signer ( less secure, could be a mimic ) 
    return sign(buf, 'SOME_PRIVATE_KEY');
    
    // or use eosjs-ecc instead ( more secure as you own the reference )
    return ecc.sign(buf, 'SOME_PRIVATE_KEY')
};
 
eos.contract('yourcontract', { signProvider }).then(contract => {
    contract.someAction('hello', 'world');
});
```

**Note:** An error will be thrown if you try to pass a `keyProvider` instead of a `signProvider`. The reason for this is that since 
you are using a proxied version of `eosjs` a malicious actor could mimic Scatter and get your keys. `signProvider` **only** returns signatures, 
never keys. Signing with your own keys happens on your side, not Scatter's.


#### Transactions at the Identity

All transactions **at** an identity/account are using solely eosjs. They should not be passed through to Scatter using the 
`Eos.Localnet` reference you got before.

```js
// Create your own instance of eosjs with your keyProvider and network
const eosjs = Eos.Localnet(...);
eosjs.transfer('youraccount', scatter.identity.account.name, '100.0000 EOS', '').then(transaction => {
    //...
});
```


## Translations and localization
Please refer to the [Localization README.md](https://github.com/EOSEssentials/Scatter/tree/master/src/localization) 
for more information about how to get involved with translations.

### Translators
- **Your Name Here** - for being the first to translate a new language!
- [gnumarcelo](https://github.com/gnumarcelo) - [Portuguese](https://github.com/EOSEssentials/Scatter/pull/27)



## Security

There are various measures put into place that contribute to the overall safety of the Scatter extension.
Let's take a moment to go over each of them separately in order to paint the whole picture.

#### A bit about Extensions

Before we get into it though there's a bit of information that you need to know about extensions themselves.
There are three entry points ( javascript files ) which extensions use. 

- **Popup script** - The javascript file that runs inside of the popup that appears when you click on the extension's icon. 
    Think of this as the extension's internal `app.js` file, similar to the one that would run on a website.
- **Content script** - A javascript file that gets run in the context/scope of the website you're browsing but that has no 
    access to any javascript variables/methods on the website and vice versa.
- **Background script** - A javascript file that runs only once per browser session. It is accessible only from the *popup script* 
    and the *content script*.
    

- **Injected script** - This is not actually a part of the extension's hierarchy itself. It is a javascript file that can be 
    injected into the website using the *content script* and then made available to the website's javascript, meaning that it 
    can expose manually specified methods to be called from the website.
    
   

#### Extension Communications
    
In Scatter we use a [proprietary message wrapper](https://github.com/nsjames/Extension-Streams) that facilitates all communication 
between the website and the extension and also between the different parts of the extension ( content / background / popup scripts ).
 
The wrapper has two different types of message streams:

- **Encrypted Stream** - Used for the communication between the website and the Content script.
- **Local Stream** - Used for the communication between the three parts of the extension ( Content, Background, and Popup scripts )
    [Internal messaging can not happen between anything but the extension and itself](https://github.com/nsjames/Extension-Streams/blob/master/src/LocalStream.ts#L25).
    
    
#### First Contact

When Scatter makes contact with a website the first thing it does is [inject a script into the website](https://github.com/EOSEssentials/Scatter/blob/master/src/inject.js).
The injected script does only two things. 

- First it sets up an **Encrypted Stream**. Until that stream is synced and encrypted the 
website can make no contact with Scatter what-so-ever. 
[The encryption algorithm used is Stanford Javascript Crypto Library AES-128-GCM](https://github.com/bitwiseshiftleft/sjcl/blob/master/core/gcm.js)
which is created using a randomly generated key upon every reload. This helps defend against *Man in the middle ( MITM )* attacks.
The stream is not accessible from the website, and any attempt to send unencrypted or badly encrypted data to the content script with 
malicious intent is immediately rejected.

- The last thing the injected script does before it becomes irrelevant is create a new [Scatterdapp](https://github.com/EOSEssentials/Scatter/blob/master/src/scatterdapp.js)
script within the context/scope of the website. This is the script that the website itself can use to request things from Scatter.
The content script then sends a `scatterLoaded` event to the website notifying it of it's *ready* state. 
  
  
#### The Scatterdapp script and eosjs

`eosjs` is EOS's javascript RPC API wrapper. It is what javascript applications use to interact with the blockchain.

`Scatterdapp` is the website usable script that applications can use to request certain things from Scatter. This script only 
allows a handful of methods which can interact with the Scatter extension:

- **getIdentity** - Used to request an Identity from the user's Scatter.
- **forgetIdentity** - Used to forget an Identity and sign out the user.
- **authenticate** - Used to prove ownership of the identity.
- **suggestNetwork** - This is a helper method used to request the addition of the EOS network the website is using.
- **eos** - Used to fetch a dummy version of `eosjs` which uses Scatter as the `signProvider`.
- **requireVersion** - Used to require a minimum specific version of scatter.

Normally when you use `eosjs` you have to give it a private key to work with.

```js
const eos = Eos.Localnet({httpEndpoint:ENDPOINT, keyProvider:PRIVATE_KEY});
eos.transfer('users_account', 'some_other_account', 100000, '');
```

[The `eosjs` instance that is returned from `scatter.eos()`](https://github.com/EOSEssentials/Scatter/blob/master/src/scatterdapp.js#L131)
is an empty dummy object with no options on it that catches all requests sent into it. Every time it is used it re-creates a
fresh instance of `eosjs` with a pre-configured network ( the same one provided by the Identity request ) and a pre-configured 
`signProvider` which pushes all signature requests up to Scatter to be approved/denied by the user. 

Because the `eosjs` instance that is returned to the website is a proxy that recreates itself each time overwriting the 
network endpoint and signProvider it can never be used maliciously for an attacker's benefit. 

The domain requesting the signature is also bound within this proxy and can not be faked as it is being taken from 
`location.host`, and any attempt to modify this value will result in the browser changing it's actual location.
( For instance if you type in `location.host = 'google.com'` into chrome's inspector console it will physically redirect you to google )

The only way for a website to push requests into Scatter and use it's private keys to sign signatures is like this.

```js
// An identity must be requested and bound before requesting transactions
const identity = await scatter.getIdentity();
scatter.useIdentity(identity)
-------------------------
// The object returned here has no network, and no signature or key provider
const eos = scatter.eos( Eos.Localnet, {host, port} );
-------------------------
// When the transfer method is called the network and signature provider 
// are bound outside of the website's accessible application scope.
// The message is then encrypted and sent to the extension.
eos.transfer('users_account', 'some_other_account', 100000, '');
```

  
#### Permission first attitude

Absolutely nothing happens in Scatter without the owner's explicit consent.

The only thing a website that has no user provided permissions can access is the version of the user's Scatter to make sure that 
they are compatible prior to sending any requests.
 
Before a website may request signatures for transactions they **must** notify Scatter of the network they are using and request an 
Identity. Only once an Identity is provided will they have the ability to push signature requests into Scatter which will prompt the user 
to take action. 

Every field of every request is prominently displayed to the user to make sure they are fully aware of what they are signing. 
This includes:

- [Every Request] The domain the request came from
- [Every Request] The blockchain network the request pertains to
- [Every Request] Any required Identity fields such as `address, email`
- [Signature Request] The complete properties of the transaction messages in both human readable format and the original JSON.

Permissions can be revoked at any time from within the extension, and entire Identities can be temporarily disabled which also 
temporarily revokes all permissions for that Identity.

#### Extension Local Storage
 
Extensions' local storage is completely segregated from the website that is being visited. That **does not** stop Scatter from taking 
measures to protect the private data that is inside of it at all times regardless.

**Scatter's entire keychain is encrypted at all times inside of the local storage.**
The only place it is ever held decrypted is within memory at the moment of use.

The keychain includes all of the Scatter:

- Key Pairs
- Identities
- Permissions

#### Signatures and Private Keys

Key Pairs' private keys are double encrypted within the storage. Once for each private key and then once when the entire keychain is 
encrypted. This makes it so that when the entire keychain is decrypted and put into memory for use in the extension's popup for instance 
the private keys still stay encrypted. The only time they are manually decrypted is when they are being used for signing transactions.

**Private keys NEVER leave Scatter.** Only the transaction signatures themselves make their way back out of Scatter. The private keys 
are decrypted for milliseconds, used to sign the transaction, and then erased from internal memory.


#### Passwords and Mnemonics

Normally, an application creates a hash of a cleartext password using something like SHA-256 and then saves that hash within a database.
This is an attack vector within itself because it gives an attacker a piece of information to work with as well as a fairly easy to brute force piece of 
information. [SHA/HMAC vs KDF or SHA-256 vs Bcrypt/Scrypt](https://security.stackexchange.com/a/16817)

Scatter does not do this, or use SHA-256. When a user first sets their Scatter password it is turned into a `scrypt` hash. 
That hash is used to generate a Mnemonic which is displayed to the user once and never stored within Scatter. The mnemonic is then used to derive a seed. 
The seed is then used to encrypt the user's keychain. 

When a user logs into Scatter either they can decrypt the AES-128-GCM encrypted keychain stored in the local storage, or they can not. 
That is their password verification, nullifying the need for the hash to be stored in local storage and removing the ability to use the hash to find the password.

**It is important to state that the password itself is always the easiest attack vector. Short, guessable passwords should never be used.**



## Contributing

Contributions are always welcome. 

For feature requests, user experience suggestions, or anything else take a look at the
[existing issues](https://github.com/EOSEssentials/Scatter/issues) and if not already tracked feel free to
[create a new one](https://github.com/EOSEssentials/Scatter/issues/new) (requires Github account, free to sign up).

If you are a developer there's a few stipulations to contributing.

* **Never** use the `npm run build` command if you plan on submitting changes. 
  This will cause a compilation of the zip file and will make it so your branch/pull-request cannot
  be merged due to binary conflicts that cannot be resolved on GitHub. When a new build is ready for the public an official Scatter maintainer will pull the latest 
  master and rebuild the zip file.
  
* _Keep things verbose._ This repo is not only read by developers but also non-developers that simply want
  to verify that their keys are safe and not being abused. Document your code and don't use abbreviations such 
  as `i`, instead use `index`. For instance `[1,2,3].map(index => ...)`
  
* If you're working on a card from Trello, move it to the "I got this" list. This will hopefully help avoid
  multiple people working on the same issues.
  
* There are TODOs littered through out the code as placeholders for further development while we are in these 
early stages. If you see something you can instantly fix feel free to do so. If you are working on a piece of code that will need something in the future 
you may also add a //TODO: but be aware that it might cause your pull request to not be merged because of 
the lack of complete functionality in the future.
  
__If you have any questions or would like to chat with the Scatter team or others who are involved in
the project you can join us on [Telegram](https://t.me/Scatter)__




