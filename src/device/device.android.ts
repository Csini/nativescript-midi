

import { NotImplementedError } from '../errors/errors.common';
import { MidiDeviceBase } from './device.common';

/**
* A MIDI device with input ports and output ports through which communication occurs.
*/
export class MidiDevice extends MidiDeviceBase {

    /**
    * @type {string}
    */
    get name() {
        throw new NotImplementedError('android nnot supported yet');
    }

    /**
    * @type {Array.<MidiInputPort>}
    */
    get inputPorts() {
        throw new NotImplementedError('android nnot supported yet');
    }

    /**
    * @type {Array.<MidiOutputPort>}
    */
    get outputPorts() {
        throw new NotImplementedError('android nnot supported yet');
    }

}
