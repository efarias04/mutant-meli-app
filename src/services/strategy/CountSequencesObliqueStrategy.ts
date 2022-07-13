// tslint:disable: no-unused-expression
import debugLib from 'debug';
import config from '../../config';
import IValidateSequenceStrategy from './IValidateSequenceStrategy';

const debug = debugLib('app:CountSequencesObliqueStrategy');

export default class CountSequencesObliqueStrategy implements IValidateSequenceStrategy {

    public getNameStrategy(): string {
        return 'Count Oblique Strategy';
    }

    public async validateSequence(dna: string[][]): Promise<number> {
        debug('%s initialized!', this.getNameStrategy());
        let countSequencesFound = 0;
        let countConsecutiveLetters = 0;

        // 1. validation: Diagonal and upper diagonal validation
        for (let variantX = 0; variantX < dna.length; variantX++) {

            countConsecutiveLetters = 0;

            // If the number of characters is less than the number of consecutive characters,
            // said validation is ignored.
            debug('*** Available letters %d ***', (dna.length - variantX));
            if ((dna.length - variantX) >= +config.consecutiveMinimumSequence) {
                for (let i = variantX; i < dna.length - 1; i++) {
                    const j = i - variantX;
                    debug('Validation top: %s - %s, is: %j', dna[j][i], dna[j+1][i+1], dna[j][i] === dna[j+1][i+1]);
                    dna[j][i] === dna[j + 1][i + 1] ? countConsecutiveLetters++ : countConsecutiveLetters = 0;
                    (countConsecutiveLetters === +config.consecutiveMinimumSequence - 1) && countSequencesFound++;
                }
            }
        }

        // 2. validation: Bottom Diagonal.
        for (let variantY = 1; variantY < dna.length; variantY++) {

            countConsecutiveLetters = 0;

            // If the number of characters is less than the number of consecutive characters,
            // said validation is ignored.
            debug('*** Available letters %d ***', (dna.length - variantY));
            if ((dna.length - variantY) >= +config.consecutiveMinimumSequence) {
                for (let j = variantY; j < dna.length - 1; j++) {
                    const i = j - variantY;
                    debug('Validation bottom: %s - %s, is: %j', dna[j][i], dna[j+1][i+1], dna[j][i] === dna[j+1][i+1]);
                    dna[j][i] === dna[j + 1][i + 1] ? countConsecutiveLetters++ : countConsecutiveLetters = 0;
                    (countConsecutiveLetters === +config.consecutiveMinimumSequence - 1) && countSequencesFound++;
                }
            }
        }

        debug('===========> oblique sequences found: [%d]', countSequencesFound);
        return Promise.resolve(countSequencesFound);
    }
}
