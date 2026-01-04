import { Autocomplete } from "@mantine/core";
import type { ComponentProps } from "react";
import { CommonIcon } from "../CommonIcon/CommonIcon";
import { ICON_MAP } from "@/shared/constants/icons";

type Props = ComponentProps<typeof Autocomplete>;

export function CommonAutocomplete(props: Props) {
    const { label, placeholder, data, ...rest } = props;

    return (
        <Autocomplete
            label={label}
            placeholder={placeholder}
            data={data}
            rightSection={<CommonIcon icon={ICON_MAP.chevronDown} size={16} />}
            {...rest}
        />
    );
}
