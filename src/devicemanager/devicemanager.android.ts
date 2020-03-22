

import { Common } from './devicemanager.common';
import { NotImplementedError } from '../errors/errors.common';
import MockLogger from '../mocklogger/mocklogger.common';

/**
* Responsible for fetching available MIDI devices and notifying the application of device changes.
*/
export class MidiDeviceManager extends Common{

    logger:any;
    
    /**
    * @param {Object} [options]
    * @param {Object} [options.logger] - optional logger that implements the Winston logging
    *                                    interface.
    */
    constructor(options = {}) {
        super(options);

        this.logger = options.logger || new MockLogger();
    }

    /**
    * Gets the available MIDI devices.
    *
    * @returns {Promise.<Array.<MidiDevice>>}
    * @abstract
    */
    getDevices() {

        return Promise.reject(new NotImplementedError('android not supported yet'));
    }

}
