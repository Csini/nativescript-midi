import MidiDevice from "../device/device.ios";

/* globals PGMidi */
export declare class MidiDeviceManager {

    /**
    * @param {Object} [options]
    * @param {Object} [options.logger] - optional logger that implements the Winston logging
    *                                    interface.
    * @override
    */
    constructor(options);

    /**
    * Gets the available MIDI devices.
    *
    * @returns {Promise.<Array.<MidiDevice>>}
    * @override
    */
    getDevices() : Promise<Array<MidiDevice>>

}