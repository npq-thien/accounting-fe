import { Autocomplete } from "@mantine/core";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Autocomplete>;

export function CommonAutocomplete(props: Props) {
    const { label, placeholder, data, ...rest } = props;

    return <Autocomplete label={label} placeholder={placeholder} data={data} {...rest} />;
}
