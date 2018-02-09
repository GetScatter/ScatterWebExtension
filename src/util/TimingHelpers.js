/**
 * A set of helpers for Timing operations
 */
export default class TimingHelpers {

    /***
     * Returns the milliseconds that has passed since the given time (unix epoch)
     * @param time - past time in unix epoch format
     * @returns {number} - difference from now (unix epoch)
     */
    static since(time) {
        return Date.now() - time;
    }

    /***
     * Returns the milliseconds of the given minutes
     * @param min - minutes, integer format
     * @returns {number} - minutes in milliseconds
     */
    static minutes(min) {
        return min * 60000;
    }

    /***
     * Returns the minutes based on the given milliseconds
     * @param millis - milliseconds
     * @returns {number} - minutes, integer
     */
    static minutesFromMillis(millis) {
        return millis / 60000;
    }

}