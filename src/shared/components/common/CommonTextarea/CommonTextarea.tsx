import { Textarea, type TextareaProps } from "@mantine/core";

export function CommonTextarea(props: TextareaProps) {
    return <Textarea size="sm" radius="sm" {...props} />;
}
