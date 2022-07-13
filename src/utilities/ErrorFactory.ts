import dateformat from 'dateformat';
import { ResponseDefaultDto } from '../models/ResponseDefaultDto';
import { Status } from '../models/ResponseErrorStatusDto';
import DateUtilities from './DateUtilities';

export default class ErrorFactory {
    public static createResponseError(statusCode: number, reason: string): ResponseDefaultDto {
        const status = new Status(statusCode, statusCode.toString(), 'Error', reason);
        const endDt = dateformat(DateUtilities.currentDateWithTimezone(-5), 'yyyy-mm-dd\'T\'HH:MM:ss');
        return new ResponseDefaultDto(status, endDt);
    }
}
