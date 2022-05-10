import assert from "assert";
import { generate, calculateStats as calculate } from "../index";

describe("Markov words", () => {
    describe("generate", () => {
        it("should generate aaa", () => {
            var result = generate(calculate(["aaa"]), { letters: 3 });
            assert.equal("aaa", result[0]);
            assert.equal(1, result.length);
            result = generate(calculate(["aaa"]), { letters: 3, numberOfWords: 1 });
            assert.equal("aaa", result[0]);
            assert.equal(1, result.length);
        });

        it("should generate aaa twice", () => {
            var result = generate(calculate(["aaa"]), { letters: 3, numberOfWords: 2 });
            assert.equal("aaa", result[0]);
            assert.equal("aaa", result[1]);
            assert.equal(2, result.length);
        });

        it("should generate aaa and aab", () => {
            var stats = calculate(["aaa", "aab"]);
            var aaa = false;
            var aab = false;
            for (var i = 0; i < 100000; i++) {
                var result = generate(stats, { letters: 3 });
                assert.equal(1, result.length);
                if (result[0] === "aaa") {
                    aaa = true;
                    if (aab) {
                        assert(true, "generated aaa and aab");
                        return;
                    }
                } else if (result[0] === "aab") {
                    aab = true;
                    if (aaa) {
                        assert(true, "generated aaa and aab");
                        return;
                    }
                } else {
                    fail(`${result[0]} Should be one of aaa or aab`);
                }
            }
        });
    });
});
