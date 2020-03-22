
export declare class ExtendableError extends Error {
    constructor(message);
}

export declare class MidiError extends ExtendableError {}

/**
* Error that indicates that an abstract or unimplemented method has been invoked.
*/
export declare class NotImplementedError extends ExtendableError {}
