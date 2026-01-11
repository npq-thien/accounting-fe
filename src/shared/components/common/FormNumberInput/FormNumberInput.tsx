import { type ElementProps, type NumberInputProps } from "@mantine/core";
import { Controller } from "react-hook-form";
import { CommonNumberInput } from "../CommonNumberInput/CommonNumberInput";

type Props = NumberInputProps &
    Omit<ElementProps<"input", keyof NumberInputProps>, "value" | "onChange"> & {
        name: string;
    };

export function FormNumberInput({ name, ...rest }: Props) {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <CommonNumberInput
                    {...field}
                    {...rest}
                    error={fieldState.error?.message}
                    value={field.value ?? ""}
                    onChange={(value) => field.onChange(value)}
                />
            )}
        />
    );
}
