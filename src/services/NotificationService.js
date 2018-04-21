import Error from '../models/errors/Error'
import {apis} from '../util/BrowserApis';

let openWindow = null;

export default class NotificationService {

    /***
     * Opens a prompt window outside of the extension
     * @param notification
     */
    static async open(notification){
        if(openWindow){
            // For now we're just going to close the window to get rid of the error
            // that is caused by already open windows swallowing all further requests
            openWindow.close();

            // Alternatively we could focus the old window, but this would cause
            // urgent 1-time messages to be lost, such as after dying in a game and
            // uploading a high-score. That message will be lost.
            // openWindow.focus();
            // return false;

            // A third option would be to add a queue, but this could cause
            // virus-like behavior as apps overflow the queue causing the user
            // to have to quit the browser to regain control.
        }

        const height = 600;
        const width = 700;
        let middleX = window.screen.availWidth/2 - (width/2);
        let middleY = window.screen.availHeight/2 - (height/2);

        const getPopup = async () => {
            const url = apis.runtime.getURL('/prompt.html');
            return window.open(url, 'ScatterPrompt', `width=${width},height=${height},resizable=0,top=${middleY},left=${middleX},titlebar=0`);
            // if(typeof browser !== 'undefined') {
            //     const created = await browser.windows.create({
            //         url,
            //         height,
            //         width,
            //         type:'panel'
            //     });
            //
            //     console.log(await browser.windows.getCurrent());
            //     return created;
            //     // return await browser.windows.get(created.id);
            //
            // }
            // else return window.open(url, 'ScatterPrompt', `width=${width},height=${height},resizable=0,top=${middleY},left=${middleX},titlebar=0`);
        }

        let popup = await getPopup();

        // Binding the notification to the popup
        popup.data = notification;

        // console.log('popup', popup, window)

        // let popup = window.open(url, 'ScatterPrompt', `width=${width},height=${height},resizable=0,top=${middleY},left=${middleX},titlebar=0`);

        openWindow = popup;

        // Handles the user closing the popup without taking any action
        popup.onbeforeunload = () => {
            notification.responder(Error.promptClosedWithoutAction());

            // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
            // Must return undefined to bypass form protection
            return undefined;
        };

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