
/**
* The output of a MIDI device which notifies the application of messages received from the device.
*/
export default abstract class MidiOutputPortBase {

    /**
    * @callback midiMessageListener
    * @param {Array.<Uint8Array>} messages   - Array where each item is a Uint8Array containing a MIDI message.
    * @param {MidiOutputPort}  outputPort - Output port from which the bytes were received.
    */

    /**
    * Adds a listener that handles MIDI message received from the port.
    *
    * @param {midiMessageListener} messageListener - Callback that handles an incoming MIDI message from the port.
    * @abstract
    */
    abstract addMessageListener(/* messageListener */);
}

