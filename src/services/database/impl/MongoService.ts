import debugLib from 'debug';
import { connect } from 'mongoose';
import config from '../../../config';
import StatModel from '../../../models/Stat';
import ValidationModel from '../../../models/Validation';
import IDatabaseStrategy from '../IDatabaseStrategy';

const debug = debugLib('app:MongoService');

export default class MongoService implements IDatabaseStrategy {

    public async saveValidation(dna: string[][], typeDna: string): Promise<any> {

        this.connectDB();

        const validation = new ValidationModel({
            dna,
            typeDna
        });

        await validation.save();
    }

    public async getStats(): Promise<any> {
        this.connectDB();
        const stats = await StatModel.find();
        debug('Los regisros son: %j', stats[0]);
        return stats[0];
    }

    private async connectDB() {
        const db = await connect(config.databaseConnection);
        debug('Database is connected to: $s', db.connection.db.databaseName);
    }

}
