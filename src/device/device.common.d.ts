
import { MidiInputPortBase } from "../inputport/inputport.common";
import MidiOutputPortBase from "../outputport/outputport.common";


/**
* A MIDI device with input ports and output ports through which communication occurs.
*/
export declare class MidiDeviceBase {


 /**
    * @type {string}
    */
   get name():string;

   /**
   * @type {Array.<MidiInputPort>}
   */
   get inputPorts() : Array<MidiInputPortBase>;

   /**
   * @type {Array.<MidiOutputPort>}
   */
   get outputPorts() : Array<MidiOutputPortBase>;

    /**
    * Adds a listener that is invoked when any of the device's output ports sends a message.
    *
    * @param {midiMessageListener} messageListener
    */
    addMessageListener(messageListener);

    /**
    * Sends the given MIDI bytes to all of the device's input ports given a Uint8Array or NativeScript buffer containing
    * MIDI message bytes.
    *
    * @param   {Object}            options
    * @param   {Uin8Array}         [options.bytes]           - MIDI message bytes to send.
    *                                                          Required if `bytesReference` is not provided.
    * @param   {interop.Reference} [options.bytesReference]  - NativeScript reference to the buffer containing the MIDI message bytes to send.
    *                                                          Required if `bytes` is not provided
    * @param   {number}            [options.length]          - Number of bytes. Required if `bytesReference` is provided.
    * @returns {Promise}
    */
    send(options): Promise<MidiInputPortBase>;


}
