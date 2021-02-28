import { describe, it } from 'mocha';
import assert from 'assert';
import { Document as USFMDocument } from './ast';
import Parser from './parser';

describe('USFM Parser', function() {
    const parser = new Parser();

    describe('#parse()', function() {
        it("should return a USFMDocument object with 'root' as type, an empty array as children when input is empty string", function() {
            const actual  = parser.parse('');

            const expected: USFMDocument = {
                type: 'root',
                children: [],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 1,
                        column: 1,
                        offset: 0
                    }
                }
            };

            assert.deepStrictEqual(actual, expected);
        });

        it("should return a USFMDocument object with 'root' as type, an array of Chapter objects as children when input is \\c_#\\n\\v_#_text", function() {
            const result  = parser.parse('\c 1\n\v 1 This is verse 1 of chapter 1.');

            const expected: USFMDocument = {
                type: 'root',
                children: [
                    {
                        id: 1,
                        type: 'chapter',
                        children: [
                            {
                                id: 1,
                                type: 'verse',
                                text: 'This is verse 1 of chapter 1.',
                                position: {
                                    start: {
                                        line: 2,
                                        column: 1,
                                        offset: 4
                                    },
                                    end: {
                                        line: 2,
                                        column: 34,
                                        offset: 37
                                    }
                                }
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 2,
                                column: 34,
                                offset: 37
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 2,
                        column: 34,
                        offset: 37
                    }
                }
            };

            assert.deepStrictEqual(result, expected);
        });

        it("should return USFMDocument with a Chapter object, that has 2 Verse objects, as its only child when input is \\c_#\\n\\v_#_text\\n\\v_#_text", function() {
            const result  = parser.parse('\c 1\n\v 1 This is verse 1 of chapter 1.\n\v 2 This is verse 2 of chapter 1.');

            const expected: USFMDocument = {
                type: 'root',
                children: [
                    {
                        id: 1,
                        type: 'chapter',
                        children: [
                            {
                                id: 1,
                                type: 'verse',
                                text: 'This is verse 1 of chapter 1.',
                                position: {
                                    start: {
                                        line: 2,
                                        column: 1,
                                        offset: 4
                                    },
                                    end: {
                                        line: 2,
                                        column: 34,
                                        offset: 37
                                    }
                                }
                            },
                            {
                                id: 2,
                                type: 'verse',
                                text: 'This is verse 2 of chapter 1.',
                                position: {
                                    start: {
                                        line: 3,
                                        column: 1,
                                        offset: 38
                                    },
                                    end: {
                                        line: 3,
                                        column: 34,
                                        offset: 71
                                    }
                                }
                            }
                        ],
                        position: {
                            start: {
                                line: 1,
                                column: 1,
                                offset: 0
                            },
                            end: {
                                line: 3,
                                column: 34,
                                offset: 71
                            }
                        }
                    }
                ],
                position: {
                    start: {
                        line: 1,
                        column: 1,
                        offset: 0
                    },
                    end: {
                        line: 3,
                        column: 34,
                        offset: 71
                    }
                }
            };

            assert.deepStrictEqual(result, expected);
        });
    });

});
