import { Autocomplete, type AutocompleteProps, type ElementProps } from "@mantine/core";
import { Controller } from "react-hook-form";

import { CommonAutocomplete } from "../CommonAutocomplete/CommonAutocomplete";

type Props = AutocompleteProps &
    Omit<ElementProps<typeof Autocomplete, keyof AutocompleteProps>, "value" | "onChange"> & {
        name: string;
    };

export function FormAutocomplete({ name, ...rest }: Props) {
    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <CommonAutocomplete
                    {...field}
                    {...rest}
                    error={fieldState.error?.message}
                    value={field.value ?? ""}
                />
            )}
        />
    );
}
