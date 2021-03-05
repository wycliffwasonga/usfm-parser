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

                const input = '\\usfm 3.0';
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
});
