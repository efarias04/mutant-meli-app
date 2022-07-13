// tslint:disable: object-literal-sort-keys
export default {
    apiPath: process.env.API_PATH || '',
    port: process.env.PORT || '9000',
    requestTimeOut: process.env.REQUEST_TIME_OUT || '28000',
    consecutiveMinimumSequence: process.env.CONSECUTIVE_MINIMUM_SEQUENCE || 4,
    mutantMinimunSequence: process.env.MUTANT_MINIMUM_SEQUENCE || 1,
    databaseConnection: process.env.DATABASE_CONNECTION || '',
};
