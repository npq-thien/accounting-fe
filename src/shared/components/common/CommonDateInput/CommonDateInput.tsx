import { DateInput, type DateInputProps } from "@mantine/dates";

export function CommonDateInput(props: DateInputProps) {
    return <DateInput size="sm" radius="sm" {...props} />;
}
