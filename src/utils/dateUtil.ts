import dayjs from "dayjs";

export function convertStringToDateWithFormat(date: string, format: string) {
    return dayjs(date).format(format);
}