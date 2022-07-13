import IValidateSequenceStrategy from './IValidateSequenceStrategy';

export default class ValidateSequenceContext {

    private readonly validateSecuenceStrategy: IValidateSequenceStrategy;

    constructor(validateSecuenceStrategy: IValidateSequenceStrategy) {
        this.validateSecuenceStrategy = validateSecuenceStrategy;
    }

    public async getProviderService(dna: string[][]) {
        return this.validateSecuenceStrategy.validateSequence(dna);
    }
}
