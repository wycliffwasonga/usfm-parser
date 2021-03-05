import assert from 'assert';
import peg from 'pegjs';
import grammar from './usfm.grammar';

describe('Grammar', function() {
    describe('Identification Markers', function() {
        describe('id_marker rule', function() {
            it("should return an object with id='GEN' when input is '\\id GEN'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'id_marker' ]
                });

                const input = '\id GEN';
                const actual = parser.parse(input);
                const expected = {
                    id: 'GEN'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('usfm_marker rule', function() {
            it("should return an object with version='3.0' when input is '\\usfm 3.0'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'usfm_marker' ]
                });

                const input = '\x75sfm 3.0';
                const actual = parser.parse(input);
                const expected = {
                    version: '3.0'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ide_marker rule', function() {
            it("should return an object with encoding='UTF-8' when input is '\\ide UTF-8'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'ide_marker' ]
                });

                const input = '\ide UTF-8';
                const actual = parser.parse(input);
                const expected = {
                    encoding: 'UTF-8'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('sts_marker rule', function() {
            it("should return an object with status_code=2 when input is '\\sts 2'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'sts_marker' ]
                });

                const input = '\sts 2';
                const actual = parser.parse(input);
                const expected = {
                    status_code: 2
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('rem_marker rule', function() {
            it("should return an object with text='First draft complete, waiting for checks.' when input is '\\rem First draft complete, waiting for checks.'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'rem_marker' ]
                });

                const input = '\rem First draft complete, waiting for checks.';
                const actual = parser.parse(input);
                const expected = {
                    text: 'First draft complete, waiting for checks.'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('h_marker rule', function() {
            it("should return an object with text='Matthew' when input is '\\h Matthew'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'h_marker' ]
                });

                const input = '\h Matthew';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Matthew'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('toc#_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'toc_marker' ]
            });

            it("should return an object with text='Matthew' when input is '\\toc2 Matthew'", function() {
                const input = '\toc3 Matthew';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Matthew'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='Matthew' when input is '\\toca2 Matthew'", function() {
                const input = '\toca3 Matthew';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Matthew'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe('Introductions Markers', function() {
        describe('imt#_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'imt_marker' ]
            });

            it("should return an object with text='INTRODUCCIÓN' when input is '\\imt INTRODUCCIÓN'", function() {
                const input = '\imt INTRODUCCIÓN';
                const actual = parser.parse(input);
                const expected = {
                    text: 'INTRODUCCIÓN'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='INTRODUCCIÓN' when input is '\\imt1 INTRODUCCIÓN'", function() {
                const input = '\imt1 INTRODUCCIÓN';
                const actual = parser.parse(input);
                const expected = {
                    text: 'INTRODUCCIÓN'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('is_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'is_marker' ]
            });

            it("should return an object with text='Importancia del evangelio de Marcos' when input is '\\is Importancia del evangelio de Marcos'", function() {
                const input = '\is Importancia del evangelio de Marcos';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Importancia del evangelio de Marcos'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='Importancia del evangelio de Marcos' when input is '\\is1 Importancia del evangelio de Marcos'", function() {
                const input = '\is1 Importancia del evangelio de Marcos';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Importancia del evangelio de Marcos'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ip(i)_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'ip_marker' ]
            });

            it("should return an object with text='Introductory text', indented=false when input is '\\ip Introductory text'", function() {
                const input = '\ip Introductory text';
                const actual = parser.parse(input);
                const expected = {
                    indented: false,
                    text: 'Introductory text'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='Many Protestants consider...', indented=true when input is '\\ipi Many Protestants consider...'", function() {
                const input = '\ipi Many Protestants consider...';
                const actual = parser.parse(input);
                const expected = {
                    indented: true,
                    text: 'Many Protestants consider...'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('imi?_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'im_marker' ]
            });

            it("should return an object with text='Introductory text', indented=false when input is '\\im Introductory text'", function() {
                const input = '\im Introductory text';
                const actual = parser.parse(input);
                const expected = {
                    indented: false,
                    text: 'Introductory text'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='Many Protestants consider...', indented=true when input is '\\imi Many Protestants consider...'", function() {
                const input = '\imi Many Protestants consider...';
                const actual = parser.parse(input);
                const expected = {
                    indented: true,
                    text: 'Many Protestants consider...'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ipq_marker rule', function() {
            it("should return an object with text='Text' when input is '\\ipq Text'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'ipq_marker' ]
                });

                const input = '\ipq Text';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('imq_marker rule', function() {
            it("should return an object with text='Text' when input is '\\imq Text'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'imq_marker' ]
                });

                const input = '\imq Text';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ipr_marker rule', function() {
            it("should return an object with text='(50.24)' when input is '\\ipr (50.24)'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'ipr_marker' ]
                });

                const input = '\ipr (50.24)';
                const actual = parser.parse(input);
                const expected = {
                    text: '(50.24)'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('iq#_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'iq_marker' ]
            });

            it("should return an object with text='God our Savior showed us' when input is '\\iq God our Savior showed us'", function() {
                const input = '\iq God our Savior showed us';
                const actual = parser.parse(input);
                const expected = {
                    text: 'God our Savior showed us'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='God our Savior showed us' when input is '\\iq1 God our Savior showed us'", function() {
                const input = '\iq1 God our Savior showed us';
                const actual = parser.parse(input);
                const expected = {
                    text: 'God our Savior showed us'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ib_marker rule', function() {
            it("should return an object when input is '\\ib'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'ib_marker' ]
                });

                const input = '\ib';
                const actual = parser.parse(input);
                const expected = {};

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ili#_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'ili_marker' ]
            });

            it("should return an object with text='Text' when input is '\\ili Text'", function() {
                const input = '\ili Text';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='Text' when input is '\\ili1 Text'", function() {
                const input = '\ili1 Text';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('iot_marker rule', function() {
            it("should return an object with text='Text' when input is '\\iot Text'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'iot_marker' ]
                });

                const input = '\iot Text';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('io#_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'io_marker' ]
            });

            it("should return an object with text='Text' when input is '\\io Text (1.1-13)'", function() {
                const input = '\io Text(1.1-13)';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text',
                    reference_range: {
                        start: {
                            chapter: 1,
                            verse: 1
                        },
                        end: {
                            chapter: 1,
                            verse: 13
                        }
                    }
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='Text' when input is '\\io1 Text (1.1-2.13)'", function() {
                const input = '\io1 Text(1.1-2.13)';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text',
                    reference_range: {
                        start: {
                            chapter: 1,
                            verse: 1
                        },
                        end: {
                            chapter: 2,
                            verse: 13
                        }
                    }
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ior_marker rule', function() {
            it("should return an object with text='1.1-13' when input is '\\ior (1.1-13)\\ior*'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'ior_marker' ]
                });

                const input = '\ior (1.1-13)\ior*';
                const actual = parser.parse(input);
                const expected = {
                    reference_range: {
                        start: {
                            chapter: 1,
                            verse: 1
                        },
                        end: {
                            chapter: 1,
                            verse: 13
                        }
                    }
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('iqt_marker rule', function() {
            it("should return an object with text='Text' when input is '\\iqt Text\\iqt*'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'iqt_marker' ]
                });

                const input = '\iqt Text\iqt*';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('iex_marker rule', function() {
            it("should return an object with text='Text' when input is '\\iex Text'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'iex_marker' ]
                });

                const input = '\iex Text';
                const actual = parser.parse(input);
                const expected = {
                    text: 'Text'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('imte#_marker rule', function() {
            const parser = peg.generate(grammar, {
                allowedStartRules: [ 'imte_marker' ]
            });

            it("should return an object with text='End of the Introduction to the Gospel of Mark' when input is '\\imte End of the Introduction to the Gospel of Mark'", function() {
                const input = '\imte End of the Introduction to the Gospel of Mark';
                const actual = parser.parse(input);
                const expected = {
                    text: 'End of the Introduction to the Gospel of Mark'
                };

                assert.deepStrictEqual(actual, expected);
            });

            it("should return an object with text='End of the Introduction to the Gospel of Mark' when input is '\\imte1 End of the Introduction to the Gospel of Mark'", function() {
                const input = '\imte1 End of the Introduction to the Gospel of Mark';
                const actual = parser.parse(input);
                const expected = {
                    text: 'End of the Introduction to the Gospel of Mark'
                };

                assert.deepStrictEqual(actual, expected);
            });
        });

        describe('ie_marker rule', function() {
            it("should return an object when input is '\\ie'", function() {
                const parser = peg.generate(grammar, {
                    allowedStartRules: [ 'ie_marker' ]
                });

                const input = '\ie';
                const actual = parser.parse(input);
                const expected = {};

                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});
