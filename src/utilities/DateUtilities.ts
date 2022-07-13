export default class DateUtilities {
    public static currentDateWithTimezone(offset: number): Date {
        // @link: https://stackoverflow.com/questions/8207655/get-time-of-specific-timezone
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * offset));
    }
}
