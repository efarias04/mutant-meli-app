import { StringNullable } from '../utilities/GenericTypes';

type SeverityType = 'Info' | 'Warning' | 'Error';

export class Status {
    public StatusCode: number;
    public ServerStatusCode: StringNullable;
    public Severity: SeverityType;
    public StatusDesc: StringNullable;

    constructor(
        statusCode: number,
        serverStatusCode: string,
        severity: SeverityType,
        statusDesc: string
    ) {
        this.StatusCode = statusCode;
        this.ServerStatusCode = serverStatusCode;
        this.Severity = severity;
        this.StatusDesc = statusDesc;
    }
}
