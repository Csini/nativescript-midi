import { MidiDevice } from "../device/device.android";


/**
* Responsible for fetching available MIDI devices and notifying the application of device changes.
*/
export declare class MidiDeviceManager {

    /**
    * @param {Object} [options]
    * @param {Object} [options.logger] - optional logger that implements the Winston logging
    *                                    interface.
    */
    constructor(options);

    /**
    * Gets the available MIDI devices.
    *
    * @returns {Promise.<Array.<MidiDevice>>}
    * @abstract
    */
    getDevices() : Promise<Array<MidiDevice>>;
   
}
