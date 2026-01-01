import { type ElementProps, type TextareaProps } from "@mantine/core";
import { Controller } from "react-hook-form";
import { CommonTextarea } from "../CommonTextarea/CommonTextarea";

type Props = TextareaProps &
    Omit<ElementProps<"textarea", keyof TextareaProps>, "value" | "onChange"> & {
        name: string;
    };

export function FormTextarea({ name, ...rest }: Props) {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <CommonTextarea
                    {...field}
                    {...rest}
                    error={fieldState.error?.message}
                    value={field.value ?? ""}
                />
            )}
        />
    );
}
