# Scatter

Scatter is a browser extension that allows you to sign transactions on the EOS blockchain using your private keys
from web applications without ever exposing your keys and provide personal information easily and only when you want to.

## Table of Contents

- [Installing Scatter](https://github.com/EOSEssentials/Scatter#installation)
- [Interacting With Scatter](https://github.com/EOSEssentials/Scatter#interacting-with-scatter)
- [Understanding Scatter's Security](https://github.com/EOSEssentials/Scatter#security)
- [Contributing to Scatter](https://github.com/EOSEssentials/Scatter#contributing)




## Installation


#### Getting the Chrome Extension files


**From The Repository** 
* Clone repository
* `npm install` to get dependencies
* copy the `.env.example` file to `.env`
* `npm start` to compile a `build` folder.


**From Zip File** 
* [Download the zip file](https://github.com/EOSEssentials/Scatter/raw/master/scatter.zip)
* Create a folder somewhere and extract the zip file there.


#### Installing it into Chrome
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
     
    // If you want to require a specific version of Scatter
    scatter.requireVersion(2.1);
    
    //...
})
```

#### Initializing the Scatter interface

```js
const scatter = window.scatter;
 
// It is good practice to take this off the window now.
window.scatter = null;
 
// Set up the network and options you want to use eosjs and Scatter with. 
const network = { host:"192.168.56.101", port:8888 };
const eosOptions = {};
 
// Tell Scatter to prepare and instance of eosjs with a 
// Scatter Signature Provider pre-configured. There is no way for
// you to use a custom built eosjs with a Scatter provider. This is also a
// proxy, and does not return the actual pre-configured eosjs instance but rather 
// a catchable reference. For all intents and purposes it functions the exact same
// as a normal eosjs instance on the application's side.
const eos = scatter.eos( Eos.Localnet, network, eosOptions );
```


#### Requesting an Identity

Once an Identity is provided it will not need to be re-approved every time. 

```js
// You can require certain fields
const requirements = ['account'];
 
scatter.getIdentity(requirements).then(identity => {
 
    // Identities must be bound to scatter to be 
    // able to request transaction signatures
    scatter.useIdentity(identity);
    or
    scatter.useIdentity(identity.hash);
    
}).catch(error => {
    //...
});
```

##### Fields that can be required
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


#### Requesting a Signature

You can optionally pass in required fields to the eosjs options if you want it to give you back 
certain user-selected Identity properties such as address. _Do not rely on previously acquired Identity 
properties, since users might have multiple locations such as Work and Home._

```js
const requiredFields = ['address', 'country', 'phone'];
eos.transfer(identity.account.name, 'inita', 10, '', {requiredFields}).then(transaction => {
    //...
}).catch(error => { 
    //.. 
});
```

The resulting json will include the required fields along with the normal eosjs json if the signing was successful. 

```js
{
    transaction: {...},
    transaction_id: '...',
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


#### Multi-part signatures involving the application AND the identity

You may now also double-sign signatures using a private key from the application as well as one supplied by 
the user.

```js
eos.contract('yourcontract', { keyProvider:'SOME_PRIVATE_KEY' }).then(contract => {
    contract.someAction('hello', 'world');
});
```

For a real example of this check out our [Space Invaders' demo code](https://github.com/EOSEssentials/Scatter-Demos/blob/master/src/views/SpaceInvaders.vue#L162)



#### Transactions at the Identity

All transactions **at** an identity are using solely eosjs. They should not be passed through to Scatter.

```js
// Standard inita key from EOS docs
const keyProvider = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
 
// Create your own instance of eosjs with your keyProvider and network
const eosjs = Eos.Localnet({httpEndpoint:`http://${network.host}:${network.port}`, keyProvider});
 
// The same process as before but now you own the keys.
eosjs.transfer('inita', identity.account.name, 100000, '').then(transaction => {
    //...
}).catch(error => { 
    //... 
});
```

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

`Scatterdapp` is the website usable script that they can use to request certain things from Scatter. This script only 
allows a handful of methods which can interact with the Scatter extension:

- **getIdentity** - Used to request an Identity from the user's Scatter.
- **suggestNetwork** - This is a helper method used to request the addition of the EOS network the website is usiing.
- **useIdentity** - Used to bind the Identity the user supplied back into `Scatterdapp` which allows them to send
    transaction signature requests for that Identity's EOS account.
- **eos** - Used to fetch a dummy version of `eosjs` which uses Scatter as the `signProvider`.

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

If you are not a developer and would simply like to contribute feature requests, user experience suggestions,
or anything else you can visit our [community Trello board.](https://trello.com/invite/b/9XJfndSc/5ed0679da31231717971cc97edd559c1/scatter-community-board)

If you **are** a developer there's a few stipulations to contributing.

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




