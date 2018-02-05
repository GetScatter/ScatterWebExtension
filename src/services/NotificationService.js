export default class NotificationService {

    /***
     * Opens a prompt window outside of the extension
     * @param notification
     */
    static open(notification){
        const height = 600;
        const width = 700;
        let middleX = window.screen.availWidth/2 - (width/2);
        let middleY = window.screen.availHeight/2 - (height/2);
        let popup = window.open(chrome.runtime.getURL('prompt.html'), 'ScatterPrompt', `width=${width},height=${height},resizable=0,dependent=true,top=${middleY},left=${middleX},titlebar=0`);

        // If the user closes the popup we automatically send back null
        popup.onbeforeunload = () => {
            notification.responder(null);

            // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
            // Must return undefined to bypass form protection
            return undefined;
        };

        // Binding the notification to the popup
        popup.data = notification;
    }

    /***
     * Always use this method for closing notification popups.
     * Otherwise you will double send responses and one will always be null.
     */
    static close(){
        window.onbeforeunload = () => {};
        window.close();
    }

}