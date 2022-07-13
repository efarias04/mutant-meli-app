export default interface IValidateSequenceStrategy {
    getNameStrategy(): string;
    validateSequence(dna: string[][]): Promise<number>;
}
