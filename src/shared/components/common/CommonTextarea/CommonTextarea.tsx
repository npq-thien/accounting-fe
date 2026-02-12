import { Textarea, type TextareaProps } from "@mantine/core";

export function CommonTextarea(props: TextareaProps) {
    const { minRows = 3, ...rest } = props;

    return <Textarea size="sm" radius="sm" minRows={minRows} autosize {...rest} />;
}
