import { validate } from 'parameter-validator';
import MidiMessageDelegate from './MidiMessageDelegate';

import IosMidiPortMixin from './IosMidiPortMixin';
import MidiOutputPortBase from './outputport.common';

class MidiOutputPort extends MidiOutputPortBase {

    /**
    * @param {Object}              options
    * @param {PGMidi/PGMidiSource} options.source
    * @param {Object}              options.logger
    */
    constructor(options) {

        super();
        let { source, logger } = validate(options, [ 'source', 'logger' ]);
        this.init({ connection: source, logger });
        this._source = source;
        this._midiMessageDelegates = []; // Keeps references to delegates so they're not garbage collected.
    }


    /**
    * Adds a listener that handles MIDI message received from the port.
    *
    * @param {midiMessageListener} messageListener - Callback that handles an incoming MIDI message from the port.
    * @override
    */
    addMessageListener(messageListener) {

        if (typeof messageListener !== 'function') {
            throw new Error('messageListener must be a function');
        }

        this._log(`Adding MIDI message delegate...`);

        // Have the delegate call invoke the messageListener, but also pass this output port instance
        // as the second parameter.
        let midiDelegateHandler = messages => messageListener(messages, this);

        // Save a reference to the delegate so that it doesn't get garbage collected.
        let delegate = MidiMessageDelegate.alloc().initWithOptions(this.logger, midiDelegateHandler);
        this._midiMessageDelegates.push(delegate);

        this._source.addDelegate(delegate);
        this._log('MIDI message delegate added successfully.');
    }
}

MidiPortMixin(MidiOutputPort.prototype);
export default MidiOutputPort;
