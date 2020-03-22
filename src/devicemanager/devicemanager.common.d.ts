/**
* Responsible for fetching available MIDI devices and notifying the application of device changes.
*/
export declare class Common {

    /**
    * @param {Object} [options]
    * @param {Object} [options.logger] - optional logger that implements the Winston logging
    *                                    interface.
    */
    constructor(options);

    /**
    * Registers a callback that is invoked when a device is added.
    *
    * @param {deviceEventCallback} callback
    */
    addDeviceAddedListener(callback);

    /**
    * Registers a callback that is invoked when a device is removed.
    *
    * @param {deviceEventCallback} callback
    */
    addDeviceRemovedListener(callback);

    /**
    * Registers a callback that is invoked when a device is updated.
    *
    * An example of an update is that a device that wasn't previously a MIDI source (i.e. was only
    * a destination) becomes a MIDI source.
    *
    * @param {deviceEventCallback} callback
    */
    addDeviceUpdatedListener(callback);

}
