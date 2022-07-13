// tslint:disable: no-unused-expression
import debugLib from 'debug';
import config from '../../config';
import IValidateSequenceStrategy from './IValidateSequenceStrategy';

const debug = debugLib('app:CountSequencesVerticalStrategy');

export default class CountSequencesVerticalStrategy implements IValidateSequenceStrategy {

    public getNameStrategy(): string {
        return 'Count Vertical Strategy';
    }

    public async validateSequence(dna: string[][]): Promise<number> {
        debug('%s initialized!', this.getNameStrategy());
        let countSequencesFound = 0;

        for (let j = 0; j < dna.length; j++) {

            let countConsecutiveLetters = 0;
            debug('Column: %d', j + 1);

            for (let i = 0; i < dna.length - 1; i++) {

                debug('Validacion: %s - %s, es: %j', dna[i][j], dna[i + 1][j], dna[i][j] === dna[i + 1][j]);
                dna[i][j] === dna[i + 1][j] ? countConsecutiveLetters++ : countConsecutiveLetters = 0;
                (countConsecutiveLetters === +config.consecutiveMinimumSequence - 1) && countSequencesFound++;
            }
        }

        debug('===========> vertical sequences found: [%d]', countSequencesFound);
        return Promise.resolve(countSequencesFound);
    }
}
