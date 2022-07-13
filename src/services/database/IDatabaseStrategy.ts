export default interface IDatabaseStrategy {
    saveValidation(dna: string[][], typeDna: string): Promise<any>;
    getStats(): Promise<any>;
}
