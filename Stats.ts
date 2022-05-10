import { LetterCount } from "./LetterCount";
import { SubsequentLetterCount } from "./SubsequentLetterCount";


export type Stats = {
    firstLetters: LetterCount;
    secondLetters: SubsequentLetterCount;
    letters: SubsequentLetterCount;
    penultimateLetters: SubsequentLetterCount;
    lastLetters: SubsequentLetterCount;
};
