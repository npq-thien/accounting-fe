import { type ElementProps, type TextInputProps } from "@mantine/core";
import { Controller } from "react-hook-form";

import { CommonTextInput } from "../CommonTextInput/CommonTextInput";

type Props = TextInputProps &
    Omit<ElementProps<"input", keyof TextInputProps>, "value" | "onChange">;

export function FormTextInput({ name, ...rest }: Props) {
    return (
        <Controller
            name={name ?? ""}
            render={({ field, fieldState }) => (
                <CommonTextInput
                    {...field}
                    {...rest}
                    error={fieldState.error?.message}
                    value={field.value ?? ""}
                />
            )}
        />
    );
}
