import peg from 'pegjs';
import grammar from './usfm.grammar';

export default class Parser {
    private _parser: peg.Parser;

    constructor() {
        this._parser = peg.generate(grammar);
    }

    parse(input: string) {
        return this._parser.parse(input);
    }
}
