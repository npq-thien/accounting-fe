
import { Controller } from "react-hook-form";

import { type ElementProps, type SelectProps } from "@mantine/core";

import { CommonSelect } from "../CommonSelect/CommonSelect";

type Props = SelectProps &
    Omit<ElementProps<"select", keyof SelectProps>, "value" | "onChange"> & {
        name: string;
    };

export function FormSelect({ name, ...rest }: Props) {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <CommonSelect
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
