import { getModelForClass, prop } from '@typegoose/typegoose';

class Stat {

    @prop()
    public total: number;

    @prop()
    public totalMutant: number;

    @prop()
    public totalHuman: number;
}

const StatModel = getModelForClass(Stat);
export default StatModel;
