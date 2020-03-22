
import { MidiDeviceBase } from './device.common';

import MidiOutputPort from '../outputport/outputport.android';
import MidiInputPort from '../inputport/inputport.ios';

/**
* A MIDI device with input ports and output ports through which communication occurs.
*/
export declare class MidiDevice  extends MidiDeviceBase{

    /**
    * @type {string}
    */
    get name():string;

    /**
    * @type {Array.<MidiInputPort>}
    */
    get inputPorts() : Array<MidiInputPort>;

    /**
    * @type {Array.<MidiOutputPort>}
    */
    get outputPorts() : Array<MidiOutputPort>;

}
