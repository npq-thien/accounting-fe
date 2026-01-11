import { type CheckboxProps } from "@mantine/core";
import { Controller } from "react-hook-form";

import { CommonCheckbox } from "../CommonCheckbox/CommonCheckbox";

type Props = CheckboxProps & {
    name: string;
};

export function FormCheckbox({ name, ...rest }: Props) {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <CommonCheckbox
                    {...field}
                    {...rest}
                    error={fieldState.error?.message}
                    checked={field.value ?? false}
                />
            )}
        />
    );
}
