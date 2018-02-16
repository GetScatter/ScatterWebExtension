# Scatter

Scatter is a browser extension that allows you to sign transactions on the EOS blockchain using your private keys
from web applications without ever exposing your keys. 

**Keys never leave the extension, only signatures**




## Installation


#### Getting the Chrome Extension files


**From Repository** - 
* Clone repository
* `npm install` to get dependencies
* copy the `.env.example` file to `.env`
* `npm start` to compile a `build` folder.


**From Zip File** - 
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
```
document.addEventListener('scatterLoaded', scatterExtension => { 
    const version = scatterExtension.version;
    
    // This will only be given in the case of previous Identity permissions.
    const hash = scatterExtension.identifier;
    
    //...
})
```

#### Initializing the Scatter interface

```
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

```
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
``` 
const requiredFields = ['address', 'country', 'phone'];
eos.transfer(identity.account.name, 'inita', 10, '', {requiredFields}).then(transaction => {
    //...
}).catch(error => { 
    //.. 
});
```
The resulting json will include the required fields along with the normal eosjs json if the signing was successful. 
```
{
    transaction:{...},
    transaction_id:'...',
    returnedFields:{
        address:'420 Paper St. Wilmington DE 19886',
        country:{ code:'US', name:'United States' },
        phone:5555555
    }
}
```
This allows you to request all information needed for a physical sale with one click.
_For instance in this case we could be a shopping website that needs shipping details along with 
the transfer of digital currency._

#### Transactions at the Identity

All transactions **at** an identity are using solely eosjs. They should not be passed through to Scatter.
```
// Standard inita key from EOS docs
const keyProvider = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
 
// Create your own instance of eosjs with your keyProvider and network
let eosjs = Eos.Localnet({httpEndpoint:`http://${network.host}:${network.port}`, keyProvider});
 
// The same process as before but now you own the keys.
eosjs.transfer('inita', identity.account.name, 100000, '').then(transaction => {
    //...
}).catch(error => { 
    //... 
});
```


### Contributing

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
