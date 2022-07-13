import IDatabaseStrategy from './IDatabaseStrategy';

export default class DatabaseService {

    constructor(private database: IDatabaseStrategy) {}

    public async saveValidation(dna: string[][], typeDna: string): Promise<any> {
        return this.database.saveValidation(dna, typeDna);
    }
    public async getStats(): Promise<any> {
        return this.database.getStats();
    }
}
