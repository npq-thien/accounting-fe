import { Select, type SelectProps } from "@mantine/core";

export function CommonSelect(props: SelectProps) {
    return <Select size="sm" radius="sm" {...props} />;
}
