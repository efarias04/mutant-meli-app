import { getModelForClass, prop } from '@typegoose/typegoose';

class Validation {

    @prop()
    public dna: string[][];

    @prop()
    public typeDna: string;
}

const ValidationModel = getModelForClass(Validation);
export default ValidationModel;
