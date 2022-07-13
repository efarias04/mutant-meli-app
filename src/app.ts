import cookieParser from 'cookie-parser';
import dateformat from 'dateformat';
import debugLib from 'debug';
import express, { NextFunction, Request, Response } from 'express';
import actuator from 'express-actuator';
import { constants } from 'http2';
import logger from 'morgan';
import path from 'path';
import config from './config';
import mutantController from './controllers/MutantValidatorController';
import { ResponseDefaultDto } from './models/ResponseDefaultDto';
import { Status } from './models/ResponseErrorStatusDto';
import DateUtilities from './utilities/DateUtilities';

const debug = debugLib('app:App');
const app = express();
const apiPath = config.apiPath;
const fullApiPath = `${apiPath}/`;
const TIME_ZONE = 'yyyy-mm-dd\'T\'HH:MM:ss';
const DEBUG_TEXT = 'Ha ocurrido el siguiente error: %o';
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../static')));

app.get('/health',(req: Request, res: Response) => {
    res.status(constants.HTTP_STATUS_OK).json('OK');
});

app.use((_, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
    res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setTimeout(Number(config.requestTimeOut), () => {
        const statusCode = constants.HTTP_STATUS_REQUEST_TIMEOUT;
        const status: Status = {
            ServerStatusCode: statusCode.toString(),
            Severity: 'Info',
            StatusCode: statusCode,
            StatusDesc: 'Se ha agotado el tiempo de espera.'
        };
        const endDt = dateformat(DateUtilities.currentDateWithTimezone(-5), TIME_ZONE);
        const reason = new ResponseDefaultDto(status, endDt);
        debug(DEBUG_TEXT, reason);
        res.status(statusCode).send(reason);
    });
    next();
});

// add the controllers you need here
app.use(fullApiPath, mutantController);

// Error manager
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode;
    debug('El error es: %j', err);
    const status: Status = {
        ServerStatusCode: statusCode.toString(),
        Severity: 'Error',
        StatusCode: statusCode,
        StatusDesc: `${err.message}.`
    };
    const endDt = dateformat(DateUtilities.currentDateWithTimezone(-5), TIME_ZONE);
    const reason = new ResponseDefaultDto(status, endDt);
    debug(DEBUG_TEXT, reason);
    return res.status(statusCode).send(reason);
});

// Route manager
app.use((req: Request, res: Response) => {
    const statusCode = constants.HTTP_STATUS_NOT_FOUND;
    const status: Status = {
        ServerStatusCode: statusCode.toString(),
        Severity: 'Error',
        StatusCode: statusCode,
        StatusDesc: `Route '${req.url}' Not found.`
    };
    const endDt = dateformat(DateUtilities.currentDateWithTimezone(-5), TIME_ZONE);
    const reason = new ResponseDefaultDto(status, endDt);
    debug(DEBUG_TEXT, reason);
    return res.status(statusCode).send(reason);
});

app.use(actuator({
    basePath: '/management',
    infoGitMode: 'full'
}));

export default app;
