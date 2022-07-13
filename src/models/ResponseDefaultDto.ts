import { Status } from './ResponseErrorStatusDto';

type stringNullable = string | null | undefined;
export class ResponseDefaultDto {
    public Status: Status;
    public EndDt: stringNullable;

    constructor(status: Status, endDt: string) {
        this.Status = status;
        this.EndDt = endDt;
    }
}
