// tslint:disable: no-unused-expression
import debugLib from 'debug';
import config from '../../config';
import IValidateSequenceStrategy from './IValidateSequenceStrategy';

const debug = debugLib('app:CountSequencesHorizontalStrategy');

export default class CountSequencesHorizontalStrategy implements IValidateSequenceStrategy {

    public getNameStrategy(): string {
        return 'Count Horizontal Strategy';
    }

    public async validateSequence(dna: string[][]): Promise<number> {
        debug('%s initialized!', this.getNameStrategy());
        let countSequencesFound = 0;

        for (let i = 0; i < dna.length; i++) {

            let countConsecutiveLetters = 0;
            debug('Row: %d', i + 1);

            for (let j = 0; j < dna.length - 1; j++) {

                debug('Validacion: %s - %s, es: %j', dna[i][j], dna[i][j + 1], dna[i][j] === dna[i][j + 1]);
                dna[i][j] === dna[i][j + 1] ? countConsecutiveLetters++ : countConsecutiveLetters = 0;
                (countConsecutiveLetters === +config.consecutiveMinimumSequence - 1) && countSequencesFound++;
            }
        }

        debug('===========> horizontal sequences found: [%d]', countSequencesFound);
        return Promise.resolve(countSequencesFound);
    }
}
