const chrome = {
    storage: {
        local: {
            stored:{},
            set:function(keyobj, cb){
                Object.keys(keyobj).map(key => chrome.storage.local.stored[key] = keyobj[key])
                cb(true);
            },
            get:function(key, cb){
                cb(
                    chrome.storage.local.stored.hasOwnProperty(key) ?
                        {[key]:chrome.storage.local.stored[key]}
                        : {}
                )
            },
            remove:function(key, cb){
                delete chrome.storage.local.stored[key];
                cb(true);
            }
        }
    },
    runtime:{
        id:'TEST',
        sendMessage:function(msg, cb){
            this.onMessage.trigger(msg, cb)
        },
        onMessage:{
            messageQueue:[],
            trigger:function(data, cb) { this.messageQueue.push({data, cb}) },
            addListener:function(cb){
                setInterval(() => {
                    if(this.messageQueue.length){
                        let message = this.messageQueue.pop();
                        cb(message.data, {id:'TEST'}, message.cb)
                    }
                }, 100)
            }
        }
    }
};

export default chrome;