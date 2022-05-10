import assert from "assert";
import { calculateStats } from "../index";

const emptyStats = {
    firstLetters: { total: 0 },
    secondLetters: {},
    letters: {},
    penultimateLetters: {},
    lastLetters: {},
};

describe("word-stats", () => {
    describe("calculate", () => {
        it("no words", () => {
            var result = calculateStats([]);
            assert.deepEqual(emptyStats, result);
            result = calculateStats([]);
            assert.deepEqual(emptyStats, result);
        });

        it("no words long enough", () => {
            var result = calculateStats(["ab"]);
            assert.deepEqual(emptyStats, result);
        });

        it("3 letter word correct stats", () => {
            assert.deepEqual(calculateStats(["aaa"]), {
                firstLetters: { total: 1, a: 1 },
                secondLetters: { a: { total: 1, a: 1 } },
                letters: { aa: { total: 1, a: 1 } },
                penultimateLetters: {},
                lastLetters: { aa: { total: 1, a: 1 } },
            });

            assert.deepEqual(calculateStats(["abc"]), {
                firstLetters: { total: 1, a: 1 },
                secondLetters: { a: { total: 1, b: 1 } },
                letters: { ab: { total: 1, c: 1 } },
                penultimateLetters: {},
                lastLetters: { ab: { total: 1, c: 1 } },
            });
        });

        it("4 letter word correct stats", () => {
            assert.deepEqual(calculateStats(["aaaa"]), {
                firstLetters: { total: 1, a: 1 },
                secondLetters: { a: { total: 1, a: 1 } },
                letters: { aa: { total: 2, a: 2 } },
                penultimateLetters: { aa: { total: 1, a: 1 } },
                lastLetters: { aa: { total: 1, a: 1 } },
            });

            assert.deepEqual(calculateStats(["abcd"]), {
                firstLetters: { total: 1, a: 1 },
                secondLetters: { a: { total: 1, b: 1 } },
                letters: { ab: { total: 1, c: 1 }, bc: { total: 1, d: 1 } },
                penultimateLetters: { ab: { total: 1, c: 1 } },
                lastLetters: { bc: { total: 1, d: 1 } },
            });
        });

        it("5 letter word correct stats", () => {
            assert.deepEqual(calculateStats(["aaaaa"]), {
                firstLetters: { total: 1, a: 1 },
                secondLetters: { a: { total: 1, a: 1 } },
                letters: { aa: { total: 3, a: 3 } },
                penultimateLetters: { aa: { total: 1, a: 1 } },
                lastLetters: { aa: { total: 1, a: 1 } },
            });

            assert.deepEqual(calculateStats(["abcde"]), {
                firstLetters: { total: 1, a: 1 },
                secondLetters: { a: { total: 1, b: 1 } },
                letters: { ab: { total: 1, c: 1 }, bc: { total: 1, d: 1 }, cd: { total: 1, e: 1 } },
                penultimateLetters: { bc: { total: 1, d: 1 } },
                lastLetters: { cd: { total: 1, e: 1 } },
            });
        });

        it("multiple words correct stats", () => {
            assert.deepEqual(calculateStats(["abcde", "abcde"]), {
                firstLetters: { total: 2, a: 2 },
                secondLetters: { a: { total: 2, b: 2 } },
                letters: { ab: { total: 2, c: 2 }, bc: { total: 2, d: 2 }, cd: { total: 2, e: 2 } },
                penultimateLetters: { bc: { total: 2, d: 2 } },
                lastLetters: { cd: { total: 2, e: 2 } },
            });
            assert.deepEqual(calculateStats(["abcde", "fghij"]), {
                firstLetters: { total: 2, a: 1, f: 1 },
                secondLetters: { a: { total: 1, b: 1 }, f: { total: 1, g: 1 } },
                letters: {
                    ab: { total: 1, c: 1 },
                    fg: { total: 1, h: 1 },
                    bc: { total: 1, d: 1 },
                    gh: { total: 1, i: 1 },
                    cd: { total: 1, e: 1 },
                    hi: { total: 1, j: 1 },
                },
                penultimateLetters: { bc: { total: 1, d: 1 }, gh: { total: 1, i: 1 } },
                lastLetters: { cd: { total: 1, e: 1 }, hi: { total: 1, j: 1 } },
            });
        });
    });
});
