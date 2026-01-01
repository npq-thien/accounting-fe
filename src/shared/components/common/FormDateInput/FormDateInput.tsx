import { type DateInputProps } from "@mantine/dates";
import { Controller } from "react-hook-form";
import { CommonDateInput } from "../CommonDateInput/CommonDateInput";

type Props = DateInputProps & {
    name: string;
};

export function FormDateInput({ name, ...rest }: Props) {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <CommonDateInput
                    {...field}
                    {...rest}
                    error={fieldState.error?.message}
                    value={field.value ?? null}
                    onChange={(value) => field.onChange(value)}
                />
            )}
        />
    );
}
