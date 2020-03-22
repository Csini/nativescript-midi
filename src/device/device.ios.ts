import { validate } from 'parameter-validator';

import MockLogger from '../MockLogger';

import { MidiDeviceBase } from './device.common';
import MidiInputPort from '../inputport/inputport.ios';
import MidiOutputPort from '../outputport/outputport.ios';

/**
* @property {string}                 name
* @property {Object}                 ios           - Object exposing iOS-specific properties
* @property {CoreMidi/MIDIDeviceRef} ios.deviceRef
*/
export default class MidiDevice extends MidiDeviceBase {

    /**
    * @param {Object}              options
    * @param {string}              options.name
    * @param {Array.<MidiInputPort|MidiOutputPort>} options.ports
    * @param {MIDIDeviceRef}       options.deviceRef
    * @param {Object}              [options.logger] - Optional logger that implements the Winston logging interface.
    */
    constructor(options) {

        super(options);
        let { name, ports, deviceRef } = validate(options, ['name', 'ports', 'deviceRef']);
        this._name = name;
        this.logger = options.logger || new MockLogger();
        this.ios = { deviceRef };
        this._ports = ports;
        this._globalMessageListeners = []; // Message listeners that are invoked when any port receives a message.
    }

    /**
    * @type {string}
    * @override
    */
    get name() {
        return this._name;
    }

    /**
    * @type {Array.<MidiInputPort>}
    * @override
    */
    get inputPorts() {
        return this._ports.filter(p => p instanceof MidiInputPort);
    }

    /**
    * @type {Array.<MidiOutputPort>}
    * @override
    */
    get outputPorts() {
        return this._ports.filter(p => p instanceof MidiOutputPort);
    }

    /*
    * Methods not part of the MidiDevice interface.
    */

    /**
    * @private
    * @param {MidiInputPort|MidiOutputPort} port
    */
    addPort(port) {

        if (!(port instanceof MidiInputPort || MidiOutputPort)) {
            this._warn('Not adding invalid MIDI input port.', { port });
            return;
        }
        let existingPort = this._ports.find(p => p.isSame(existingPort));

        if (existingPort) {
            this._log('Not adding MIDI port that has already been added.', { port });
            return;
        }
        this._log('Adding MIDI port.', { port });
        this._ports.push(port);

        if (port instanceof MidiOutputPort) {
            // Attach all of the devices's global message handlers that have been registered.
            this._globalMessageListeners.forEach(listener => port.addMessageListener(listener));
        }
    }

    /**
    * @private
    * @param {MidiInputPort|MidiOutputPort} port
    */
    removePort(port) {

        try {
            let index = this._ports.findIndex(p => p.isSame(port));

            if (index === -1) {
                this._warn('Not removing unrecognized MIDI port.', { port });
                return;
            }
            this._log('Removing MIDI port.', { port });
            this._ports.splice(index, 1);
        } catch (error) {
            this._warn('Not removing invalid MIDI port.', { port, error });
        }
    }

    /**
    * @private Creates MidiDevice instances from the given PGMidi iOS MIDI client.
    *
    * @param {Object}                   options
    * @param {PGMidi/PGMidi}            options.midiClient
    * @param {Object}                   options.logger
    * @returns {Array.<MidiDevice>}
    */
    static parseDevices(options) {

        let { midiClient, logger } = validate(options, ['midiClient', 'logger']);

        let allOutputPorts = Array.from(midiClient.sources).map(source => new MidiOutputPort({ source, logger })),
            allInputPorts = Array.from(midiClient.destinations).map(destination => new MidiInputPort({ destination, logger })),
            allPorts = [...allOutputPorts, ...allInputPorts];

        let deviceRefs = allPorts.map(port => port.ios.deviceRef),
            uniqueDeviceRefs = Array.from(new Set(deviceRefs));

        let devices = uniqueDeviceRefs.map(deviceRef => {

            let ports = allPorts.filter(p => p.ios.deviceRef === deviceRef);
            let name = ports[0].ios.endpointName;

            return new MidiDevice({ logger, name, ports, deviceRef });
        });
        return devices;
    }
}